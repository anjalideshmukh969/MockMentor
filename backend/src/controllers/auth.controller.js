import User from "../models/user.model.js";
import genToken from "../config/token.js";
import bcrypt from "bcryptjs";

// ─────────────────────────────────────────────────────────────
// EXISTING — unchanged
// ─────────────────────────────────────────────────────────────

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({ name, email })
        }
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Google auth error ${error}` })
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Logout error ${error}` })
    }
}

// ─────────────────────────────────────────────────────────────
// NEW — email / password register
// ─────────────────────────────────────────────────────────────

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." })
        }

        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(400).json({ message: "An account with this email already exists." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })

        const token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Register error: ${error}` })
    }
}

// ─────────────────────────────────────────────────────────────
// NEW — email / password login
// ─────────────────────────────────────────────────────────────

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." })
        }
        // Users who signed up via Google won't have a password field
        if (!user.password) {
            return res.status(401).json({ message: "This account uses Google Sign-In. Please continue with Google." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." })
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Login error: ${error}` })
    }
}