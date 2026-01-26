
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function AchievementCard({ achievement, getTypeIcon }: { achievement: any, getTypeIcon: (type: string) => any }) {
    return (
        <Card className="bg-card border-border hover:border-primary/50 transition-all h-full overflow-hidden">
            {achievement.imageUrl && (
                <div className="relative w-full h-48 sm:h-56">
                    <Image
                        src={achievement.imageUrl}
                        alt={achievement.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                </div>
            )}
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                        {getTypeIcon(achievement.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            {achievement.title}
                        </h3>
                        <p className="text-primary font-medium text-sm mb-2">
                            {achievement.issuer}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                            {achievement.date}
                        </p>
                        {achievement.description && (
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {achievement.description}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
