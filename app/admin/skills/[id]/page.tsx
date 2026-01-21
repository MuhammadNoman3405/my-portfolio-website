
import { prisma } from "@/lib/prisma"
import { SkillForm } from "@/components/admin/skill-form"
import { notFound } from "next/navigation"

export default async function EditSkillPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    try {
        const skill = await prisma.skill.findUnique({
            where: { id },
        })

        if (!skill) return notFound()

        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Skill</h1>
                    <p className="text-muted-foreground">
                        Update your skill details.
                    </p>
                </div>
                <SkillForm
                    initialData={{
                        id: skill.id,
                        name: skill.name,
                        level: skill.level as "Expert" | "Advanced" | "Intermediate",
                        category: skill.category as "language" | "framework" | "tool",
                    }}
                />
            </div>
        )
    } catch (error) {
        return notFound()
    }
}
