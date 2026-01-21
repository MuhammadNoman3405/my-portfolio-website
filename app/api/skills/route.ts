
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(skills)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const json = await req.json()
        const skill = await prisma.skill.create({
            data: {
                name: json.name,
                level: json.level,
                category: json.category,
            },
        })
        return NextResponse.json(skill)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
    }
}
