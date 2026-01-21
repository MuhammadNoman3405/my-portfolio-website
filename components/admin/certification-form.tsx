"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface CertificationFormData {
    id?: string
    title: string
    issuer: string
    date: string
    credentialUrl: string
    skills: string
}

export function CertificationForm({ initialData }: { initialData?: CertificationFormData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<CertificationFormData>(
        initialData || {
            title: "",
            issuer: "",
            date: "",
            credentialUrl: "",
            skills: "",
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = initialData
                ? `/api/certifications/${initialData.id}`
                : "/api/certifications"
            const method = initialData ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed to save")

            toast.success(initialData ? "Certification updated" : "Certification created")
            router.push("/admin/certifications")
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
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="issuer">Issuer</Label>
                <Input
                    id="issuer"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="date">Date issued</Label>
                <Input
                    id="date"
                    placeholder="e.g. 2024, May 2024"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="skills">Skills learned (comma separated)</Label>
                <Input
                    id="skills"
                    placeholder="React, Node.js, etc."
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="credentialUrl">Credential URL</Label>
                <Input
                    id="credentialUrl"
                    value={formData.credentialUrl}
                    onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                />
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : initialData ? "Update Certification" : "Create Certification"}
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
