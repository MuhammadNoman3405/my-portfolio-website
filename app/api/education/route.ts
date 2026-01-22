import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - Fetch all education entries
export async function GET() {
    try {
        const education = await prisma.education.findMany({
            orderBy: { startDate: "desc" },
        });
        return NextResponse.json(education);
    } catch (error) {
        console.error("Error fetching education:", error);
        return NextResponse.json(
            { error: "Failed to fetch education" },
            { status: 500 }
        );
    }
}

// POST - Create education entry (Admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const education = await prisma.education.create({
            data: body,
        });

        return NextResponse.json(education);
    } catch (error) {
        console.error("Error creating education:", error);
        return NextResponse.json(
            { error: "Failed to create education" },
            { status: 500 }
        );
    }
}
