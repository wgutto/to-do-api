import { Router } from "express";
import { registerController } from "../controllers/registerController";
import { loginController } from "../controllers/loginController";
import { loginAuthMiddleware } from "../middlewares/loginAuthMiddleware";

export const authRoutes = Router()

authRoutes.post("/login", loginAuthMiddleware, loginController)

authRoutes.post("/register", registerController)