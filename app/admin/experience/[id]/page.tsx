import { prisma } from "@/lib/prisma";
import { ExperienceForm } from "@/components/admin/experience-form";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({
        where: { id },
    });

    if (!experience) {
        notFound();
    }

    const formData = {
        ...experience,
        type: experience.type as "work" | "internship" | "volunteer",
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
                <p className="text-muted-foreground">Update experience information.</p>
            </div>
            <ExperienceForm initialData={formData} />
        </div>
    );
}
