import jwt from "jsonwebtoken"

export const createTokenByIdService = async (id: number) => {
    const payload = {
        id
    }

    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: "7d"})

    return token
}