
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const json = await req.json()
        const project = await prisma.project.create({
            data: {
                title: json.title,
                description: json.description,
                techStack: json.techStack, // Expecting string (JSON or CSV)
                category: json.category,
                githubUrl: json.githubUrl,
                liveUrl: json.liveUrl,
                imageUrl: json.imageUrl,
            },
        })
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }
}
