import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const achievement = await prisma.achievement.findUnique({ where: { id: params.id } });
        if (!achievement) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(achievement);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const achievement = await prisma.achievement.update({ where: { id: params.id }, data: body });
        return NextResponse.json(achievement);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await prisma.achievement.delete({ where: { id: params.id } });
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
