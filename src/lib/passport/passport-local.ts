import { Strategy as LocalStrategy } from "passport-local"
import { validateAccountService } from "../../services/auth/validateAccountService"
import { createTokenByIdService } from "../../services/auth/createTokenByIdService"

export const localStrategy = new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
        try {
            const result = await validateAccountService(email, password)

            if (!result.success) {
                return done(null, false, { message: result.error })
            }

            if (result.success) {
                done(null, result.data)
            }
        } catch (error) {
            console.error("ERRO NO localStrategy ", error)
            return done(error as Error)
        }
    }
)

