
import { auth } from "@/auth"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Settings, User, GraduationCap, Briefcase, Award, Mail } from "lucide-react"
import { ResetVisitsButton } from "@/components/admin/reset-visits-button"

async function getStats() {
    try {
        const [
            projectsCount,
            skillsCount,
            certificationsCount,
            educationCount,
            experienceCount,
            achievementsCount,
            messagesCount,
            visitsCount
        ] = await Promise.all([
            prisma.project.count(),
            prisma.skill.count(),
            prisma.certification.count(),
            prisma.education.count(),
            prisma.experience.count(),
            prisma.achievement.count(),
            prisma.contactMessage.count({ where: { read: false } }),
            prisma.visit.count(), // Fetch visit count
        ])
        return {
            projectsCount,
            skillsCount,
            certificationsCount,
            educationCount,
            experienceCount,
            achievementsCount,
            messagesCount,
            visitsCount
        }
    } catch (error) {
        console.error("Failed to fetch stats", error)
        return {
            projectsCount: 0,
            skillsCount: 0,
            certificationsCount: 0,
            educationCount: 0,
            experienceCount: 0,
            achievementsCount: 0,
            messagesCount: 0,
            visitsCount: 0
        }
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/profile" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Profile</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">About</div>
                            <p className="text-xs text-muted-foreground">Edit Profile</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/messages" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.messagesCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/projects" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Projects</CardTitle>
                            <Layers className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.projectsCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/skills" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Skills</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.skillsCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/education" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Education</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.educationCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/experience" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Experience</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.experienceCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/achievements" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.achievementsCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/certifications" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.certificationsCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/visits" className="block transition-transform hover:scale-105">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                            <div className="flex items-center gap-2">
                                <ResetVisitsButton />
                                <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.visitsCount}</div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
