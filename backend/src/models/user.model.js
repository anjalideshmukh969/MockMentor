import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Optional — only set for email/password users; Google users won't have this
    password: {
        type: String,
        default: null,
    },
    credits: {
        type: Number,
        default: 1500,
    },
}, { timestamps: true })

const UserModel = mongoose.model('user', userSchema);

export default UserModel;