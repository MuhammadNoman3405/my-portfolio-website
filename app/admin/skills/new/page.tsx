
import { SkillForm } from "@/components/admin/skill-form"

export default function NewSkillPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Skill</h1>
                <p className="text-muted-foreground">Add a new skill to your portfolio.</p>
            </div>
            <SkillForm />
        </div>
    )
}
