import { RequestHandler } from "express";
import passport from "passport";
import { localStrategyResponse } from "../types/localStrategyResponse";
import { createTokenByIdService } from "../services/auth/createTokenByIdService";

export const loginAuthMiddleware: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate("local", 
        (error: any, user: localStrategyResponse | false, info?: { message: string }) => {
            if(error) {
                console.error("ERRO NO loginMiddleware ", error)
                return res.status(500).json({
                    error: "Internal server error"
                })
            }

            if(!user) {
                return res.status(401).json({
                    error: info?.message || "Email ou senha inválidos"
                })
            }

            const token = createTokenByIdService(user.id)

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            req.user = user

            return next()
        }
    )

    authRequest(req, res, next)
}