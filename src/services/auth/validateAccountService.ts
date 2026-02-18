import { prisma } from "../../lib/prisma"
import bcrypt from "bcryptjs"
import { ServiceResponse } from "../../types/serviceResponse"
import { UserSafe } from "../../types/userSafe"

export const validateAccountService = async (email: string, password: string): Promise<ServiceResponse<UserSafe>> => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user) return {
        success: false,
        error: "Email ou senha inválidos",
        data: null
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) return {
        success: false,
        error: "Email ou senha inválidos",
        data: null
    }

    return {
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}