import { EducationForm } from "@/components/admin/education-form";

export default function NewEducationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Education</h1>
                <p className="text-muted-foreground">Add a new education entry to your portfolio.</p>
            </div>
            <EducationForm />
        </div>
    );
}
