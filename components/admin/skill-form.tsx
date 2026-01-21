"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface SkillFormData {
    id?: string
    name: string
    level: "Expert" | "Advanced" | "Intermediate"
    category: "language" | "framework" | "tool"
}

export function SkillForm({ initialData }: { initialData?: SkillFormData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<SkillFormData>(
        initialData || {
            name: "",
            level: "Intermediate",
            category: "language",
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = initialData
                ? `/api/skills/${initialData.id}`
                : "/api/skills"
            const method = initialData ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed to save")

            toast.success(initialData ? "Skill updated" : "Skill created")
            router.push("/admin/skills")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl bg-card p-6 rounded-lg border">
            <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select
                        value={formData.level}
                        onValueChange={(value: any) =>
                            setFormData({ ...formData, level: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Expert">Expert</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={formData.category}
                        onValueChange={(value: any) =>
                            setFormData({ ...formData, category: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="language">Language</SelectItem>
                            <SelectItem value="framework">Framework</SelectItem>
                            <SelectItem value="tool">Tool</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : initialData ? "Update Skill" : "Create Skill"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}
