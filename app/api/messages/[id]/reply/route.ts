import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendEmail, getReplyEmail } from "@/lib/email";

// POST - Reply to a message
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { replyMessage } = await request.json();

        if (!replyMessage) {
            return NextResponse.json(
                { error: "Reply message is required" },
                { status: 400 }
            );
        }

        // Get the original message
        const originalMessage = await prisma.contactMessage.findUnique({
            where: { id },
        });

        if (!originalMessage) {
            return NextResponse.json(
                { error: "Message not found" },
                { status: 404 }
            );
        }

        // Send reply email
        const emailHtml = getReplyEmail(originalMessage.name, replyMessage);

        const result = await sendEmail({
            to: originalMessage.email,
            subject: "Re: Your message to Muhammad Noman",
            html: emailHtml,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: "Failed to send reply" },
                { status: 500 }
            );
        }

        // Mark message as read
        await prisma.contactMessage.update({
            where: { id },
            data: { read: true },
        });

        return NextResponse.json({ message: "Reply sent successfully" });
    } catch (error) {
        console.error("Error sending reply:", error);
        return NextResponse.json(
            { error: "Failed to send reply" },
            { status: 500 }
        );
    }
}
