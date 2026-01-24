import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/admin/profile-form";

export default async function ProfilePage() {
    const profile = await prisma.profile.findFirst();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">About & Profile</h1>
                <p className="text-muted-foreground">Update your About section, introduction, and personal details.</p>
            </div>
            <ProfileForm initialData={profile || undefined} />
        </div>
    );
}
