
import { prisma } from "@/lib/prisma"
import { CertificationForm } from "@/components/admin/certification-form"
import { notFound } from "next/navigation"

export default async function EditCertificationPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    try {
        const certification = await prisma.certification.findUnique({
            where: { id },
        })

        if (!certification) return notFound()

        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Certification</h1>
                    <p className="text-muted-foreground">
                        Update your certification details.
                    </p>
                </div>
                <CertificationForm
                    initialData={{
                        id: certification.id,
                        title: certification.title,
                        issuer: certification.issuer,
                        date: certification.date,
                        credentialUrl: certification.credentialUrl || "",
                        skills: certification.skills,
                    }}
                />
            </div>
        )
    } catch (error) {
        return notFound()
    }
}
