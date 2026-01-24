import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export async function Experience() {
    const experience = await prisma.experience.findMany({
        orderBy: { startDate: "desc" },
    });

    // Placeholder if no experience entries
    if (experience.length === 0) {
        return (
            <section id="experience" className="py-12 sm:py-20 bg-secondary/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollAnimation className="space-y-12">
                        <div className="space-y-2 text-center">
                            <p className="text-primary font-mono text-sm tracking-wider uppercase">
                                Professional Journey
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                Experience
                            </h2>
                        </div>

                        <Card className="bg-card border-border border-dashed">
                            <CardContent className="p-12 text-center text-muted-foreground">
                                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-semibold mb-2">Experience Section Ready</h3>
                                <p>
                                    Add your work experience and internships in the Admin Panel to display them here.
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollAnimation>
                </div>
            </section>
        );
    }

    const getTypeIcon = (type: string) => {
        return <Briefcase className="w-6 h-6 text-primary" />;
    };

    return (
        <section id="experience" className="py-12 sm:py-20 bg-secondary/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimation className="space-y-12">
                    <div className="space-y-2 text-center">
                        <p className="text-primary font-mono text-sm tracking-wider uppercase">
                            Professional Journey
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Experience
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <Card key={exp.id} className="bg-card border-border hover:border-primary/50 transition-all">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            {getTypeIcon(exp.type)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-foreground mb-1">
                                                {exp.title}
                                            </h3>
                                            <p className="text-primary font-medium mb-2">
                                                {exp.company}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {exp.startDate} - {exp.current ? "Present" : exp.endDate || "N/A"}
                                                    </span>
                                                </div>
                                                {exp.location && (
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                )}
                                                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                                                    {exp.type === "work" ? "Full-time" : exp.type === "internship" ? "Internship" : "Volunteer"}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground whitespace-pre-wrap">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
