import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors()
);

const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.send("Chat App API Running ");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});