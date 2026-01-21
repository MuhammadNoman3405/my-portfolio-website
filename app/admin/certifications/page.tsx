
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { DeleteButton } from "@/components/admin/delete-button"

export default async function CertificationsPage() {
    const certifications = await prisma.certification.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
                    <p className="text-muted-foreground">
                        Manage your licenses and certifications.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/certifications/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Certification
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {certifications.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                            <p>No certifications found. Create one to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    certifications.map((cert) => (
                        <Card key={cert.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-semibold">
                                    {cert.title}
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/certifications/${cert.id}`}>Edit</Link>
                                    </Button>
                                    <DeleteButton id={cert.id} type="certifications" name={cert.title} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm font-medium">{cert.issuer}</p>
                                <p className="text-sm text-muted-foreground">{cert.date}</p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
