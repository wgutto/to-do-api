import { prisma } from "../../lib/prisma"
import { ServiceResponse } from "../../types/serviceResponse"
import { hasEmailService } from "./hasEmailService"
import bcrypt from "bcryptjs"

type User = {
    name: string
    email: string
    password: string
}

type UserSafe = {
    id: number
    name: string
    email: string
}

export const registerService = async (user: User): Promise<ServiceResponse<UserSafe>> => {
    const hasEmail = await hasEmailService(user.email)
    if(hasEmail) return {
        success: false,
        error: "Usuário já cadastrado",
        data: null
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    const userCreated = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email.toLocaleLowerCase(),
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    return {
        success: true,
        data: userCreated
    }
}