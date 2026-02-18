import { RequestHandler } from "express";
import passport from "passport";
import { localStrategyResponse } from "../types/localStrategyResponse";

export const loginAuthMiddleware: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate("local", 
        (error: any, response: localStrategyResponse | false, info?: { message: string }) => {
            if(error) {
                console.error("ERRO NO loginMiddleware ", error)
                return res.status(500).json({
                    error: "Internal server error"
                })
            }

            if(!response) {
                return res.status(401).json({
                    error: info?.message || "Email ou senha inválidos"
                })
            }

            req.authInfo = response.auth
            req.user = response.user

            return next()
        }
    )

    authRequest(req, res, next)
}