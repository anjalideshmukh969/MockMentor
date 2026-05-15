import express from "express";
import { googleAuth, logOut, register, login } from "../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post("/google", googleAuth)
authRouter.get("/logout", logOut)

// ── New email/password routes ──
authRouter.post("/register", register)
authRouter.post("/login", login)

export default authRouter