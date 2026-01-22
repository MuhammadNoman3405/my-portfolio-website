import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function ExperiencePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                <p className="text-muted-foreground">
                    Manage your work experience and internships
                </p>
            </div>

            <Card>
                <CardContent className="p-12 text-center">
                    <Briefcase className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Experience Management</h3>
                    <p className="text-muted-foreground mb-4">
                        Experience management interface coming soon.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        The database model is ready. Full CRUD interface will be added in a future update.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
