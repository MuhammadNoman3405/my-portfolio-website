import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, ExternalLink } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string | null;
  skills: string[];
}

const staticCertifications: Certification[] = [
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM",
    date: "2024",
    credentialUrl: "https://coursera.org",
    skills: ["Data Science", "Python", "Machine Learning", "Data Analysis"],
  },
  {
    title: "Google AI Essentials",
    issuer: "Google",
    date: "2024",
    credentialUrl: "https://coursera.org",
    skills: ["AI Fundamentals", "Prompt Engineering", "AI Applications"],
  },
  {
    title: "Python for Data Science",
    issuer: "DataCamp",
    date: "2023",
    credentialUrl: "https://datacamp.com",
    skills: ["Python", "Pandas", "NumPy", "Data Manipulation"],
  },
];

export function Certifications({ initialCertifications = [] }: { initialCertifications?: Certification[] }) {
  const certificationsToDisplay = initialCertifications.length > 0 ? initialCertifications : staticCertifications;

  return (
    <section id="certifications" className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation className="space-y-12">
          <div className="space-y-2 text-center">
            <p className="text-primary font-mono text-sm tracking-wider uppercase">
              Education & Achievements
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Certifications
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificationsToDisplay.map((cert) => (
              <Card
                key={cert.title}
                className="bg-card border-border hover:border-primary/50 transition-all group"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {cert.title}
                        </h3>
                        <a
                          href={cert.credentialUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`View ${cert.title} credential`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} • {cert.date}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
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
