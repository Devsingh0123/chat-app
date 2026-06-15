import http from "http";
import { Server } from "socket.io";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import messageRouter from "./routes/message.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 6000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id); 

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sendMessage", (data) => {
    const receiverSocket = onlineUsers.get(data.receiverId);

    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", data);
    }
  });

  //  typing start
  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocket = onlineUsers.get(receiverId);

    if (receiverSocket) {
      io.to(receiverSocket).emit("typing", {
        senderId,
      });
    }
  });


    // typing stop
  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const receiverSocket = onlineUsers.get(receiverId);

    if (receiverSocket) {
      io.to(receiverSocket).emit("stopTyping", {
        senderId,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // cookie ke liye MUST
  }),
);

app.get("/", (req, res) => {
  res.send("Chat App  Testing API Running ");
});

app.use("/auth", authRouter);
app.use("/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
