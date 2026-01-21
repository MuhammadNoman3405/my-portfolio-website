
import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
    const email = "m@example.com"
    const password = "password"

    console.log(`Testing login for ${email} with password: ${password}`)

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        console.error("User not found!")
        return
    }

    console.log("User found:", user.email)
    console.log("Stored hash:", user.password)

    const match = await bcrypt.compare(password, user.password)
    console.log("Bcrypt compare result:", match)

    if (match) {
        console.log("✅ Credentials are valid.")
    } else {
        console.error("❌ Password mismatch.")
    }

    await prisma.$disconnect()
}

main()
