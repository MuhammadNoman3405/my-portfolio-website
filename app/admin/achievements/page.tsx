import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Award, Calendar } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AchievementsPage() {
    const achievements = await prisma.achievement.findMany({
        orderBy: { date: "desc" },
    });

    const getTypeLabel = (type: string) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
                    <p className="text-muted-foreground">Manage your awards and achievements</p>
                </div>
                <Link href="/admin/achievements/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Achievement
                    </Button>
                </Link>
            </div>

            {achievements.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">No achievements yet</p>
                        <Link href="/admin/achievements/new">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Achievement
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {achievements.map((achievement) => (
                        <Card key={achievement.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                                        <p className="text-sm text-primary font-medium">{achievement.issuer}</p>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{achievement.date}</span>
                                            </div>
                                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                                                {getTypeLabel(achievement.type)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/achievements/${achievement.id}`}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                        <DeleteButton
                                            id={achievement.id}
                                            endpoint="achievements"
                                            itemName={achievement.title}
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            {achievement.description && (
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
