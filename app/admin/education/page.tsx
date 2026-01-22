import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, GraduationCap, Calendar } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function EducationPage() {
    const education = await prisma.education.findMany({
        orderBy: { startDate: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Education</h1>
                    <p className="text-muted-foreground">
                        Manage your educational background
                    </p>
                </div>
                <Link href="/admin/education/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                    </Button>
                </Link>
            </div>

            {education.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <GraduationCap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">No education entries yet</p>
                        <Link href="/admin/education/new">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Education
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {education.map((edu) => (
                        <Card key={edu.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">
                                            {edu.degree} in {edu.field}
                                        </CardTitle>
                                        <p className="text-sm text-primary font-medium">{edu.institution}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            <span>
                                                {edu.startDate} - {edu.current ? "Present" : edu.endDate || "N/A"}
                                            </span>
                                            {edu.cgpa && <span>• CGPA: {edu.cgpa}</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/education/${edu.id}`}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <DeleteButton
                                            id={edu.id}
                                            endpoint="education"
                                            itemName={`${edu.degree} at ${edu.institution}`}
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            {edu.description && (
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
