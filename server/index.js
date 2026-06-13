import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import messageRouter from "./routes/message.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // cookie ke liye MUST
  })
);

const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.send("Chat App  Testing API Running ");
});

app.use("/auth",authRouter)
app.use("/messages",messageRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});