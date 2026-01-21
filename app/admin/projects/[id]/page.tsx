
import { prisma } from "@/lib/prisma"
import { ProjectForm } from "@/components/admin/project-form"
import { notFound } from "next/navigation"

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    try {
        const project = await prisma.project.findUnique({
            where: { id },
        })

        if (!project) return notFound()

        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
                    <p className="text-muted-foreground">
                        Make changes to your project.
                    </p>
                </div>
                <ProjectForm
                    initialData={{
                        id: project.id,
                        title: project.title,
                        description: project.description,
                        techStack: project.techStack,
                        category: project.category as "ml" | "web" | "data",
                        githubUrl: project.githubUrl || "",
                        liveUrl: project.liveUrl || "",
                    }}
                />
            </div>
        )
    } catch (error) {
        return notFound()
    }
}
