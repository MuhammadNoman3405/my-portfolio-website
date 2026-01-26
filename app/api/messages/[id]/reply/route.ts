
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { replyMessage } = body;
        const { id: messageId } = await params;

        if (!replyMessage) {
            return NextResponse.json({ error: "Reply message is required" }, { status: 400 });
        }

        // 1. Create the reply in DB
        const reply = await prisma.reply.create({
            data: {
                content: replyMessage,
                contactMessageId: messageId,
            }
        });

        // 2. Here you would normally send the email via nodemailer
        // For now, we simulate success as per previous pattern or integration
        console.log(`Sending email to... (Mock): ${replyMessage}`);

        // 3. Mark message as read if not already
        await prisma.contactMessage.update({
            where: { id: messageId },
            data: { read: true },
        });

        return NextResponse.json(reply);
    } catch (error) {
        console.error("Error sending reply:", error);
        return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
    }
}
