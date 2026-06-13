import express from "express"
import { getAllusers, getMe, login, logout, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout",logout )
authRouter.get("/allusers", isAuthenticated ,getAllusers )
authRouter.get("/me", isAuthenticated, getMe);





export default authRouter;