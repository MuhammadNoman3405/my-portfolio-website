
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma" // Need to create lib/prisma.ts too
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Settings, User } from "lucide-react"

async function getStats() {
    try {
        const [projectsCount, skillsCount, certificationsCount] = await Promise.all([
            prisma.project.count(),
            prisma.skill.count(),
            prisma.certification.count(),
        ])
        return { projectsCount, skillsCount, certificationsCount }
    } catch (error) {
        console.error("Failed to fetch stats", error)
        return { projectsCount: 0, skillsCount: 0, certificationsCount: 0 }
    }
}

export default async function AdminDashboard() {
    const session = await auth()
    const stats = await getStats()

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back, {session?.user?.email}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projects</CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.projectsCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Skills</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.skillsCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.certificationsCount}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
