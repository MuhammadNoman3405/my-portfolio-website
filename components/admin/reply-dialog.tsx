"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Reply } from "lucide-react";
import { toast } from "sonner";

interface ReplyDialogProps {
    messageId: string;
    recipientName: string;
    recipientEmail: string;
}

export function ReplyDialog({ messageId, recipientName, recipientEmail }: ReplyDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/messages/${messageId}/reply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ replyMessage }),
            });

            if (!res.ok) throw new Error("Failed to send reply");

            toast.success("Reply sent successfully!");
            setOpen(false);
            setReplyMessage("");
            router.refresh();
        } catch (error) {
            toast.error("Failed to send reply");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Reply to {recipientName}</DialogTitle>
                    <DialogDescription>
                        Send a reply to {recipientEmail}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reply">Your Reply</Label>
                        <Textarea
                            id="reply"
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Type your reply here..."
                            className="min-h-[200px]"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Reply"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
