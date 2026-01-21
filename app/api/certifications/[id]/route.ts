
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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
        const certification = await prisma.certification.update({
            where: { id },
            data: {
                title: json.title,
                issuer: json.issuer,
                date: json.date,
                credentialUrl: json.credentialUrl,
                skills: json.skills,
            },
        })
        return NextResponse.json(certification)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update certification" }, { status: 500 })
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
        await prisma.certification.delete({
            where: { id },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 })
    }
}
