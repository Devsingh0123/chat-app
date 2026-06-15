import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const messageRouter = express.Router();
// POST /api/messages/send
messageRouter.post("/send",isAuthenticated,sendMessage);
messageRouter.get("/:id", isAuthenticated, getMessages);
export default messageRouter;