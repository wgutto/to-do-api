import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { taskRoutes } from './taskRoutes';

export const mainRouter = Router();

mainRouter.use("/auth", authRoutes)
mainRouter.use("/task", taskRoutes)

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});