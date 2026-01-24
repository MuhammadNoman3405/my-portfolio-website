"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/image-upload";

interface ProfileFormData {
    id?: string;
    name: string;
    headline: string;
    description: string;
    resumeUrl?: string;
    imageUrl?: string;
    available: boolean;
}

export function ProfileForm({ initialData }: { initialData?: ProfileFormData }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>(
        initialData || {
            name: "",
            headline: "",
            description: "",
            resumeUrl: "",
            imageUrl: "",
            available: true,
        }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save");

            toast.success("Profile updated successfully");
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
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Muhammad Noman"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                    id="headline"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    required
                    placeholder="BSCS Student & Aspiring Data Scientist"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">About Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="min-h-[150px]"
                    placeholder="Brief introduction about yourself..."
                />
            </div>

            <ImageUpload
                label="Profile Picture"
                value={formData.imageUrl}
                onChange={(value) => setFormData({ ...formData, imageUrl: value })}
            />

            <div className="flex items-center space-x-2">
                <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
                <Label htmlFor="available">Available for work</Label>
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    );
}
