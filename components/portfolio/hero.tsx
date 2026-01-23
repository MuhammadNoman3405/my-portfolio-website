import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

import { prisma } from "@/lib/prisma";

export async function Hero() {
  const profile = await prisma.profile.findFirst();

  return (
    <section
      id="about"
      className="min-h-[60vh] sm:min-h-screen flex items-center justify-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-primary font-mono text-sm tracking-wider uppercase">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                {profile?.name || "Muhammad Noman"}
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground">
                {profile?.headline || "BSCS Student & Aspiring Data Scientist"}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-lg whitespace-pre-wrap">
              {profile?.description ||
                "I'm passionate about leveraging data to uncover insights and build intelligent systems. Specializing in Machine Learning, Data Analysis, and building scalable data solutions."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#projects" className="gap-2">
                  View My Work
                  <ArrowDown className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/MuhammadNoman3405"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-noman-a219712b0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:23-cs-68@students.uettaxila.edu.pk"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right side - Decorative element */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-primary/30 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary font-mono">
                      {"</>"}
                    </span>
                  </div>
                </div>
              </div>
              {/* Floating tech badges */}
              <div className="absolute top-0 right-8 bg-card border border-border rounded-lg px-3 py-2 text-sm font-mono text-primary">
                Python
              </div>
              <div className="absolute bottom-8 -left-4 bg-card border border-border rounded-lg px-3 py-2 text-sm font-mono text-primary">
                ML
              </div>
              <div className="absolute bottom-8 right-0 bg-card border border-border rounded-lg px-3 py-2 text-sm font-mono text-primary">
                SQL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
