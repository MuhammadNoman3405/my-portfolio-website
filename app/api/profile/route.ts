import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - Fetch profile (singleton)
export async function GET() {
    try {
        const profile = await prisma.profile.findFirst();
        return NextResponse.json(profile || {});
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}

// POST/PUT - Update or Create profile
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, headline, description, resumeUrl, available } = body;

        // Check if profile exists
        const existingProfile = await prisma.profile.findFirst();

        let profile;
        if (existingProfile) {
            profile = await prisma.profile.update({
                where: { id: existingProfile.id },
                data: { name, headline, description, resumeUrl, available },
            });
        } else {
            profile = await prisma.profile.create({
                data: { name, headline, description, resumeUrl, available },
            });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
