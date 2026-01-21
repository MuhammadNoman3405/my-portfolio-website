"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Need to create Textarea
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select" // Need to create Select
import { toast } from "sonner"

interface ProjectFormData {
    id?: string
    title: string
    description: string
    techStack: string
    category: "ml" | "web" | "data"
    githubUrl: string
    liveUrl?: string
}

export function ProjectForm({ initialData }: { initialData?: ProjectFormData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<ProjectFormData>(
        initialData || {
            title: "",
            description: "",
            techStack: "",
            category: "ml",
            githubUrl: "",
            liveUrl: "",
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = initialData
                ? `/api/projects/${initialData.id}`
                : "/api/projects"
            const method = initialData ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed to save")

            toast.success(initialData ? "Project updated" : "Project created")
            router.push("/admin/projects")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 rounded-lg border">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
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
                        <SelectItem value="ml">Machine Learning</SelectItem>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="data">Data Analysis</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="min-h-[100px]"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                <Input
                    id="techStack"
                    placeholder="Python, React, etc."
                    value={formData.techStack}
                    onChange={(e) =>
                        setFormData({ ...formData, techStack: e.target.value })
                    }
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                        id="githubUrl"
                        value={formData.githubUrl}
                        onChange={(e) =>
                            setFormData({ ...formData, githubUrl: e.target.value })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live Demo URL</Label>
                    <Input
                        id="liveUrl"
                        value={formData.liveUrl || ""}
                        onChange={(e) =>
                            setFormData({ ...formData, liveUrl: e.target.value })
                        }
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : initialData ? "Update Project" : "Create Project"}
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
