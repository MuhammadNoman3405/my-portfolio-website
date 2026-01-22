import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const achievements = await prisma.achievement.findMany({
            orderBy: { date: "desc" },
        });
        return NextResponse.json(achievements);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const achievement = await prisma.achievement.create({ data: body });
        return NextResponse.json(achievement);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
    }
}
