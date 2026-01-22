import { prisma } from "@/lib/prisma";
import { ExperienceForm } from "@/components/admin/experience-form";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
    const experience = await prisma.experience.findUnique({
        where: { id: params.id },
    });

    if (!experience) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
                <p className="text-muted-foreground">Update experience information.</p>
            </div>
            <ExperienceForm initialData={experience} />
        </div>
    );
}
