import express from "express"
import { sendMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const messageRouter = express.Router();
// POST /api/messages/send
messageRouter.post("/send",isAuthenticated,sendMessage)
export default messageRouter;