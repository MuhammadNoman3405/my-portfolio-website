
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const certifications = await prisma.certification.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(certifications)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const json = await req.json()
        const certification = await prisma.certification.create({
            data: {
                title: json.title,
                issuer: json.issuer,
                date: json.date,
                credentialUrl: json.credentialUrl,
                skills: json.skills, // Expecting string
            },
        })
        return NextResponse.json(certification)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create certification" }, { status: 500 })
    }
}
