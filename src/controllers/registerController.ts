import { RequestHandler } from "express";

export const registerController: RequestHandler = (req, res) => {
    res.json({
        message: "Acessou"
    })
}