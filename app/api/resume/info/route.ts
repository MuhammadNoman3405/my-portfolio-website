import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch resume info (filename only, not the file itself)
export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            select: {
                filename: true,
                uploadedAt: true,
            },
            orderBy: { uploadedAt: 'desc' }
        });

        if (!resume) {
            return NextResponse.json({ error: "No resume found" }, { status: 404 });
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error("Error fetching resume info:", error);
        return NextResponse.json({ error: "Failed to fetch resume info" }, { status: 500 });
    }
}
