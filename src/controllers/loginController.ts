import { RequestHandler } from "express"

export const loginController: RequestHandler = (req, res) => {
    res.json({
        message: "Acessou"
    })
}