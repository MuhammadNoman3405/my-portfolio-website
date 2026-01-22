import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function AchievementsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
                <p className="text-muted-foreground">
                    Manage your awards and achievements
                </p>
            </div>

            <Card>
                <CardContent className="p-12 text-center">
                    <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Achievements Management</h3>
                    <p className="text-muted-foreground mb-4">
                        Achievements management interface coming soon.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        The database model is ready. Full CRUD interface will be added in a future update.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
