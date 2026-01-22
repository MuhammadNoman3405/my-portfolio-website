import { prisma } from "@/lib/prisma";
import { AchievementForm } from "@/components/admin/achievement-form";
import { notFound } from "next/navigation";

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const achievement = await prisma.achievement.findUnique({
        where: { id },
    });

    if (!achievement) {
        notFound();
    }

    // Cast type to match form interface
    const formData = {
        ...achievement,
        type: achievement.type as "award" | "certification" | "achievement",
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Achievement</h1>
                <p className="text-muted-foreground">Update achievement information.</p>
            </div>
            <AchievementForm initialData={formData} />
        </div>
    );
}
