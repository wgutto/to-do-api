import { Strategy as LocalStrategy } from "passport-local"
import { validateAccountService } from "../../services/auth/validateAccountService"
import { createTokenByIdService } from "../../services/auth/createTokenByIdService"

export const localStrategy = new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
        try {
            const user = await validateAccountService(email, password)

            if (!user.success) {
                return done(null, false, { message: user.error })
            }

            if (user.success) {
                const token = await createTokenByIdService(user.data.id)

                done(null, {
                    auth: { token },
                    user: user.data
                })
            }
        } catch (error) {
            console.error("ERRO NO localStrategy ", error)
            return done(error as Error)
        }
    }
)

