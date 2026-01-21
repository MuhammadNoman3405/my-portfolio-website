
import { prisma } from "../lib/prisma"

async function main() {
    try {
        const [users, skills, projects, certifications] = await Promise.all([
            prisma.user.findMany(),
            prisma.skill.findMany(),
            prisma.project.findMany(),
            prisma.certification.findMany()
        ])

        console.log("\n=== DATABASE CONTENTS ===\n")

        console.log(`Users: ${users.length}`)
        users.forEach(u => console.log(`  - ${u.email}`))

        console.log(`\nSkills: ${skills.length}`)
        skills.forEach(s => console.log(`  - ${s.name} (${s.level}, ${s.category})`))

        console.log(`\nProjects: ${projects.length}`)
        projects.forEach(p => console.log(`  - ${p.title} (${p.category})`))

        console.log(`\nCertifications: ${certifications.length}`)
        certifications.forEach(c => console.log(`  - ${c.title} (${c.issuer})`))

        console.log("\n=========================\n")
    } catch (e) {
        console.error("Error fetching data:", e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
