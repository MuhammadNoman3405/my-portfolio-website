import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - Fetch single education entry
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const education = await prisma.education.findUnique({
            where: { id },
        });

        if (!education) {
            return NextResponse.json(
                { error: "Education not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(education);
    } catch (error) {
        console.error("Error fetching education:", error);
        return NextResponse.json(
            { error: "Failed to fetch education" },
            { status: 500 }
        );
    }
}

// PUT - Update education entry (Admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const education = await prisma.education.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(education);
    } catch (error) {
        console.error("Error updating education:", error);
        return NextResponse.json(
            { error: "Failed to update education" },
            { status: 500 }
        );
    }
}

// DELETE - Delete education entry (Admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await prisma.education.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Education deleted" });
    } catch (error) {
        console.error("Error deleting education:", error);
        return NextResponse.json(
            { error: "Failed to delete education" },
            { status: 500 }
        );
    }
}
