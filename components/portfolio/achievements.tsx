import { Award, Trophy, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { AchievementCard } from "./achievement-card";

export async function Achievements() {
    const achievements = await prisma.achievement.findMany({
        orderBy: { date: "desc" },
    });

    if (achievements.length === 0) {
        return (
            <section id="achievements" className="py-12 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollAnimation className="space-y-12">
                        <div className="space-y-2 text-center">
                            <p className="text-primary font-mono text-sm tracking-wider uppercase">
                                Recognition
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                Achievements & Awards
                            </h2>
                        </div>

                        <Card className="bg-card border-border border-dashed">
                            <CardContent className="p-12 text-center text-muted-foreground">
                                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-semibold mb-2">Achievements Section Ready</h3>
                                <p>
                                    Add your awards and certifications in the Admin Panel to display them here.
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollAnimation>
                </div>
            </section>
        );
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "award":
                return <Trophy className="w-6 h-6 text-primary" />;
            case "certification":
                return <Medal className="w-6 h-6 text-primary" />;
            default:
                return <Award className="w-6 h-6 text-primary" />;
        }
    };

    return (
        <section id="achievements" className="py-12 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimation className="space-y-12">
                    <div className="space-y-2 text-center">
                        <p className="text-primary font-mono text-sm tracking-wider uppercase">
                            Recognition
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Achievements & Awards
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {achievements.map((achievement) => (
                            <div key={achievement.id} className="relative group">
                                {achievement.linkUrl ? (
                                    <a
                                        href={achievement.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block h-full"
                                    >
                                        <AchievementCard achievement={achievement} getTypeIcon={getTypeIcon} />
                                    </a>
                                ) : (
                                    <AchievementCard achievement={achievement} getTypeIcon={getTypeIcon} />
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
