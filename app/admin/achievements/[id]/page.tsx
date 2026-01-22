import { prisma } from "@/lib/prisma";
import { AchievementForm } from "@/components/admin/achievement-form";
import { notFound } from "next/navigation";

export default async function EditAchievementPage({ params }: { params: { id: string } }) {
    const achievement = await prisma.achievement.findUnique({
        where: { id: params.id },
    });

    if (!achievement) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Achievement</h1>
                <p className="text-muted-foreground">Update achievement information.</p>
            </div>
            <AchievementForm initialData={achievement} />
        </div>
    );
}
