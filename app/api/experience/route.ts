import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const experience = await prisma.experience.findMany({
            orderBy: { startDate: "desc" },
        });
        return NextResponse.json(experience);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const experience = await prisma.experience.create({ data: body });
        return NextResponse.json(experience);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
    }
}
