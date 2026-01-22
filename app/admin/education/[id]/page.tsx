import { prisma } from "@/lib/prisma";
import { EducationForm } from "@/components/admin/education-form";
import { notFound } from "next/navigation";

export default async function EditEducationPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const education = await prisma.education.findUnique({
        where: { id },
    });

    if (!education) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Education</h1>
                <p className="text-muted-foreground">Update education information.</p>
            </div>
            <EducationForm initialData={education} />
        </div>
    );
}
