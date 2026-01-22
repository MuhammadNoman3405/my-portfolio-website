import { ExperienceForm } from "@/components/admin/experience-form";

export default function NewExperiencePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Experience</h1>
                <p className="text-muted-foreground">Add work experience or internship.</p>
            </div>
            <ExperienceForm />
        </div>
    );
}
