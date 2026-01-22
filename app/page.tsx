import { Navigation } from "@/components/portfolio/navigation";
import { Hero } from "@/components/portfolio/hero";
import { Education } from "@/components/portfolio/education";
import { Skills } from "@/components/portfolio/skills";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Achievements } from "@/components/portfolio/achievements";
import { Certifications } from "@/components/portfolio/certifications";
import { GitHubActivity } from "@/components/portfolio/github-activity";
import { Contact } from "@/components/portfolio/contact";
import { prisma } from "@/lib/prisma";

// Revalidate every 60 seconds in production (change to 0 for instant updates during development)
export const revalidate = 60;

async function getData() {
  try {
    const [projects, skills, certifications] = await Promise.all([
      prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.skill.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.certification.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    return {
      projects: projects.map(p => ({
        ...p,
        techStack: p.techStack.split(',').map(s => s.trim()),
      })),
      skills,
      certifications: certifications.map(c => ({
        ...c,
        skills: c.skills.split(',').map(s => s.trim()),
      })),
    };
  } catch (e) {
    console.error("Failed to fetch data", e);
    return { projects: [], skills: [], certifications: [] };
  }
}

export default async function Portfolio() {
  const { projects, skills, certifications } = await getData();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Education />
      <Skills initialSkills={skills} />
      <Experience />
      <Projects initialProjects={projects} />
      <GitHubActivity />
      <Achievements />
      <Certifications initialCertifications={certifications} />
      <Contact />
    </main>
  );
}
