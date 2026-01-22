import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function EducationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Education</h1>
                <p className="text-muted-foreground">
                    Manage your educational background
                </p>
            </div>

            <Card>
                <CardContent className="p-12 text-center">
                    <GraduationCap className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Education Management</h3>
                    <p className="text-muted-foreground mb-4">
                        The Education section is currently displaying static content from the frontend component.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        To update your education information, edit the Education component directly at:<br />
                        <code className="text-primary">components/portfolio/education.tsx</code>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
