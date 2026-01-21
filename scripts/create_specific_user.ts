
import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
    const email = "23-cs-68@students.uettaxila.edu.pk"
    const password = "password"

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: {
                email,
                password: hashedPassword
            }
        })

        console.log(`User ${user.email} created/updated with password: ${password}`)
    } catch (e) {
        console.error("Error creating user:", e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
