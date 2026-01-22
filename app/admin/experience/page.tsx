import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Briefcase, Calendar, MapPin } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function ExperiencePage() {
    const experience = await prisma.experience.findMany({
        orderBy: { startDate: "desc" },
    });

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "work": return "Full-time";
            case "internship": return "Internship";
            case "volunteer": return "Volunteer";
            default: return type;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                    <p className="text-muted-foreground">Manage your work experience and internships</p>
                </div>
                <Link href="/admin/experience/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                    </Button>
                </Link>
            </div>

            {experience.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">No experience entries yet</p>
                        <Link href="/admin/experience/new">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Experience
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {experience.map((exp) => (
                        <Card key={exp.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{exp.title}</CardTitle>
                                        <p className="text-sm text-primary font-medium">{exp.company}</p>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate || "N/A"}</span>
                                            </div>
                                            {exp.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{exp.location}</span>
                                                </div>
                                            )}
                                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                                                {getTypeLabel(exp.type)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/experience/${exp.id}`}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                        <DeleteButton
                                            id={exp.id}
                                            endpoint="experience"
                                            itemName={`${exp.title} at ${exp.company}`}
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{exp.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
