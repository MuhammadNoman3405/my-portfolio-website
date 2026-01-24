
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { DeleteButton } from "@/components/admin/delete-button"

export default async function SkillsPage() {
    const skills = await prisma.skill.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
                    <p className="text-muted-foreground">
                        Manage your technical skills.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/skills/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Skill
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skills.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                            <p>No skills found. Create one to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    skills.map((skill) => (
                        <Card key={skill.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <span>{skill.emoji || "🔧"}</span>
                                    <span>{skill.name}</span>
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/skills/${skill.id}`}>Edit</Link>
                                    </Button>
                                    <DeleteButton id={skill.id} type="skills" name={skill.name} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Badge variant="secondary">{skill.category}</Badge>
                                    <Badge variant="outline">{skill.level}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
