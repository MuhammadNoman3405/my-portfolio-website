
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { path } = await req.json();
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        const userAgent = req.headers.get("user-agent") || "unknown";

        await prisma.visit.create({
            data: {
                path,
                ip,
                userAgent,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to record visit:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

import { auth } from "@/auth";

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.visit.deleteMany();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to reset visits:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
