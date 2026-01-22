import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { MessageItem } from "@/components/admin/message-item";

export default async function MessagesPage() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
                <p className="text-muted-foreground">
                    View and reply to messages submitted through your portfolio contact form
                </p>
            </div>

            {messages.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No messages yet</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {messages.map((message) => (
                        <MessageItem key={message.id} message={message} />
                    ))}
                </div>
            )}
        </div>
    );
}
