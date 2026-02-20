import { RequestHandler } from "express"

export const loginController: RequestHandler = (req, res) => {
    res.status(200).json({
        user: req.user,
        message: "Usuário logado com sucesso"
    })
}