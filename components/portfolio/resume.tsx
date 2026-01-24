
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface ResumeProps {
    resume: {
        filename: string;
        updatedAt: Date;
    } | null;
}

export function Resume({ resume }: ResumeProps) {
    if (!resume) return null;

    return (
        <section id="resume" className="py-12 sm:py-20 bg-secondary/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-4 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <p className="text-primary font-mono text-sm tracking-wider uppercase">
                            My Credentials
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Resume
                        </h2>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                        Download my resume to get a detailed overview of my skills, experience, and education.
                    </p>

                    <div className="mt-8 p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-foreground">{resume.filename}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <Button asChild size="lg" className="w-full sm:w-auto gap-2">
                            <a href="/api/resume" download>
                                <Download className="w-4 h-4" />
                                Download PDF
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
