import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.routes.js";
import interviewRouter from "./src/routes/interview.routes.js";


dotenv.config();
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173",
        "https://mock-mentor-l6tu314s4-anjali-deshmukhs-projects.vercel.app",
        "https://mock-mentor-git-main-anjali-deshmukhs-projects.vercel.app",
        "https://mock-mentor-phi.vercel.app"
    ],
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();

})