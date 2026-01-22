"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AchievementFormData {
    id?: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
    type: "award" | "certification" | "achievement";
}

export function AchievementForm({ initialData }: { initialData?: AchievementFormData }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<AchievementFormData>(
        initialData || {
            title: "",
            issuer: "",
            date: "",
            description: "",
            type: "achievement",
        }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData ? `/api/achievements/${initialData.id}` : "/api/achievements";
            const method = initialData ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save");

            toast.success(initialData ? "Achievement updated" : "Achievement created");
            router.push("/admin/achievements");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 rounded-lg border">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="First Place in Hackathon"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="issuer">Issuer/Organization</Label>
                    <Input
                        id="issuer"
                        value={formData.issuer}
                        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                        required
                        placeholder="Tech University"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                        id="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        placeholder="Jan 2024"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="award">Award</SelectItem>
                        <SelectItem value="certification">Certification</SelectItem>
                        <SelectItem value="achievement">Achievement</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[100px]"
                    placeholder="Details about the achievement..."
                />
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : initialData ? "Update Achievement" : "Create Achievement"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
