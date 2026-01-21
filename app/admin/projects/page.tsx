
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { DeleteButton } from "@/components/admin/delete-button"

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">
                        Manage your portfolio projects.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {projects.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                            <p>No projects found. Create one to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    projects.map((project) => (
                        <Card key={project.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-semibold">
                                    {project.title}
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/projects/${project.id}`}>Edit</Link>
                                    </Button>
                                    <DeleteButton id={project.id} type="projects" name={project.title} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {project.description}
                                </p>
                                <div className="flex gap-2 text-xs">
                                    <span className="bg-secondary px-2 py-1 rounded">
                                        {project.category}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
