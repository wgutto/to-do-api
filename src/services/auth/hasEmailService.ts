import { prisma } from "../../lib/prisma"

export const hasEmailService = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    return user ? true : false
}