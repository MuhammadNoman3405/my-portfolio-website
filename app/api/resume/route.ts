import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - Fetch resume
export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            orderBy: { uploadedAt: 'desc' }
        });

        if (!resume) {
            return NextResponse.json({ error: "No resume found" }, { status: 404 });
        }

        // Return the PDF file
        return new NextResponse(resume.fileData, {
            headers: {
                'Content-Type': resume.mimeType,
                'Content-Disposition': `attachment; filename="${resume.filename}"`,
            },
        });
    } catch (error) {
        console.error("Error fetching resume:", error);
        return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
    }
}

// POST - Upload resume (Admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Delete old resume if exists
        await prisma.resume.deleteMany({});

        // Create new resume
        const resume = await prisma.resume.create({
            data: {
                filename: file.name,
                fileData: buffer,
                mimeType: file.type,
            },
        });

        return NextResponse.json({
            message: "Resume uploaded successfully",
            filename: resume.filename
        });
    } catch (error) {
        console.error("Error uploading resume:", error);
        return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 });
    }
}

// DELETE - Delete resume (Admin only)
export async function DELETE() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.resume.deleteMany({});

        return NextResponse.json({ message: "Resume deleted successfully" });
    } catch (error) {
        console.error("Error deleting resume:", error);
        return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
    }
}
