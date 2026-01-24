
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getSkillEmoji } from "@/lib/skill-emoji-map"

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const json = await req.json()
        const emoji = getSkillEmoji(json.name)
        const skill = await prisma.skill.update({
            where: { id },
            data: {
                name: json.name,
                level: json.level,
                category: json.category,
                emoji,
            },
        })
        return NextResponse.json(skill)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        await prisma.skill.delete({
            where: { id },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
    }
}
