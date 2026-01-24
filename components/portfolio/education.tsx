import { GraduationCap, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export async function Education() {
    const education = await prisma.education.findMany({
        orderBy: { startDate: "desc" },
    });

    // Fallback if no education entries
    if (education.length === 0) {
        return (
            <section id="education" className="py-12 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-2 mb-12 text-center">
                        <p className="text-primary font-mono text-sm tracking-wider uppercase">
                            Academic Background
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Education
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-card border-border hover:border-primary/50 transition-all">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10">
                                        <GraduationCap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-foreground mb-1">
                                            Bachelor of Science in Computer Science
                                        </h3>
                                        <p className="text-primary font-medium mb-2">
                                            University of Engineering and Technology, Taxila
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>2021 - 2025 (Expected)</span>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground">
                                            Specializing in Data Science, Machine Learning, and Software Development.
                                            Relevant coursework includes Data Structures, Algorithms, Database Systems,
                                            Machine Learning, and Artificial Intelligence.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className="py-12 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-2 mb-12">
                    <p className="text-primary font-mono text-sm tracking-wider uppercase">
                        Academic Background
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Education
                    </h2>
                </div>

                <ScrollAnimation delay={200}>
                    <div className="space-y-6">
                        {education.map((edu) => (
                            <Card key={edu.id} className="bg-card border-border hover:border-primary/50 transition-all">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            <GraduationCap className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-foreground mb-1">
                                                {edu.degree} in {edu.field}
                                            </h3>
                                            <p className="text-primary font-medium mb-2">
                                                {edu.institution}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {edu.startDate} - {edu.current ? "Present" : edu.endDate || "N/A"}
                                                    </span>
                                                </div>
                                                {edu.cgpa && (
                                                    <span>• CGPA: {edu.cgpa}</span>
                                                )}
                                            </div>
                                            {edu.description && (
                                                <p className="text-muted-foreground">
                                                    {edu.description}
                                                </p>
                                            )}
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
