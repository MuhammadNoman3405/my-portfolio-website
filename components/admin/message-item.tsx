"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, CheckCircle2, Circle, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReplyDialog } from "@/components/admin/reply-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MessageItemProps {
    message: {
        id: string;
        name: string;
        email: string;
        message: string;
        read: boolean;
        createdAt: Date;
    };
}

export function MessageItem({ message }: MessageItemProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const toggleRead = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${message.id}/read`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ read: !message.read }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            router.refresh();
            toast.success(message.read ? "Marked as unread" : "Marked as read");
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${message.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete message");

            router.refresh();
            toast.success("Message deleted successfully");
        } catch (error) {
            toast.error("Failed to delete message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className={cn("transition-all", message.read ? "opacity-75 bg-secondary/10" : "bg-card border-l-4 border-l-primary")}>
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{message.name}</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-2"
                                onClick={toggleRead}
                                disabled={loading}
                                title={message.read ? "Mark as unread" : "Mark as read"}
                            >
                                {message.read ? (
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                ) : (
                                    <Circle className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                                )}
                            </Button>
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
                    <div className="flex gap-2">
                        <ReplyDialog
                            messageId={message.id}
                            recipientName={message.name}
                            recipientEmail={message.email}
                        />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" disabled={loading}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the message from {message.name}.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
            </CardContent>
        </Card>
    );
}
