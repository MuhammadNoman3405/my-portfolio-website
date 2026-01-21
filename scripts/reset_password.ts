
import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
    const email = "m@example.com"
    const password = "password"

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        // Check if user exists first to decide update or create if upsert is tricky with validation
        const user = await prisma.user.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: {
                email,
                password: hashedPassword
            }
        })

        console.log(`User ${user.email} updated/created with password: ${password}`)
    } catch (e) {
        console.error("Error resetting password:", e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
