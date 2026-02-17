import { Router } from "express";
import { registerController } from "../controllers/registerController";
import { loginController } from "../controllers/loginController";

export const authRoutes = Router()

authRoutes.post("/login", loginController)

authRoutes.post("/register", registerController)