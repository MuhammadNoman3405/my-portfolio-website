
import { prisma } from "../lib/prisma"

async function main() {
    try {
        const users = await prisma.user.findMany()
        console.log("Users found:", users.length)
        users.forEach(u => {
            console.log(`Email: ${u.email}, Password ID: ${u.id}`)
        })
    } catch (e) {
        console.error("Error fetching users:", e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
