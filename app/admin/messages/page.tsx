import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, CheckCircle2, Circle } from "lucide-react";
import { ReplyDialog } from "@/components/admin/reply-dialog";

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
                        <Card key={message.id} className={message.read ? "opacity-75" : ""}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-lg">{message.name}</CardTitle>
                                            {message.read ? (
                                                <span title="Read">
                                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                                </span>
                                            ) : (
                                                <span title="Unread">
                                                    <Circle className="w-4 h-4 text-muted-foreground" />
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                <a href={`mailto:${message.email}`} className="hover:text-primary">
                                                    {message.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>
                                                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <ReplyDialog
                                        messageId={message.id}
                                        recipientName={message.name}
                                        recipientEmail={message.email}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
