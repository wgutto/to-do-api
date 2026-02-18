import { RequestHandler } from "express";
import z from "zod";
import { registerService } from "../services/auth/registerService";

const registerSchema = z.object({
    name: z.string().min(2, { error: "Nome muito curto" }).max(50, { error: "Nome muito longo" }),
    email: z.email({ error: "Email inválido" }).max(254, { error: "Email muito longo" }),
    password: z.string().min(6, { error: "Senha muito curta" }).max(60, { error: "Senha muito longa" }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, { error: "Senhas não coincidem", path: ["confirmPassword"] })

export const registerController: RequestHandler = async (req, res) => {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({
        error: "Dados inválidos"
    })

    try {
        const result = await registerService(parsed.data)

        if (!result.success)
            return res.status(400).json({
                error: result.error
            })

        return res.status(201).json({
            user: result.data
        })
    } catch (error) {
        console.error("ERRO NO registerController ", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}