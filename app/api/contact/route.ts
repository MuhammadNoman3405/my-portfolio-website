import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, getContactNotificationEmail } from "@/lib/email";

// POST - Submit contact form
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                message,
            },
        });

        // Send email notification to admin
        const adminEmail = "23-cs-68@students.uettaxila.edu.pk";
        const emailHtml = getContactNotificationEmail(name, email, message);

        const result = await sendEmail({
            to: adminEmail,
            subject: `New Contact Form Message from ${name}`,
            html: emailHtml,
        });

        if (!result.success) {
            console.error("Email send failed:", result.error);
            // We return 200 because the message WAS saved to the database.
            // But we include a warning so the frontend can notify the user/admin.
            return NextResponse.json({
                message: "Message sent successfully!",
                id: contactMessage.id,
                warning: "Message saved, but email notification failed (likely missing GMAIL_USER or GMAIL_APP_PASSWORD)."
            });
        }

        return NextResponse.json({
            message: "Message sent successfully!",
            id: contactMessage.id,
        });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
