import { AchievementForm } from "@/components/admin/achievement-form";

export default function NewAchievementPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Achievement</h1>
                <p className="text-muted-foreground">Add a new achievement or award.</p>
            </div>
            <AchievementForm />
        </div>
    );
}
