

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Contact, Home, Layers, Settings, ShieldCheck, User, FileText, GraduationCap, Briefcase, Award, Mail } from "lucide-react"
import Link from "next/link"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user) {
        redirect("/auth/login")
    }

    return (
        <div className="min-h-screen grid grid-cols-[220px_1fr] bg-muted/40">
            <div className="border-r bg-background">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <ShieldCheck className="h-6 w-6" />
                        <span className="">Admin Portal</span>
                    </Link>
                </div>
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-6 gap-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <Home className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <Layers className="h-4 w-4" />
                        Projects
                    </Link>
                    <Link
                        href="/admin/skills"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <User className="h-4 w-4" />
                        Skills
                    </Link>
                    <Link
                        href="/admin/certifications"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <Settings className="h-4 w-4" />
                        Certifications
                    </Link>
                    <Link
                        href="/admin/resume"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <FileText className="h-4 w-4" />
                        Resume
                    </Link>
                    <Link
                        href="/admin/education"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <GraduationCap className="h-4 w-4" />
                        Education
                    </Link>
                    <Link
                        href="/admin/experience"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <Briefcase className="h-4 w-4" />
                        Experience
                    </Link>
                    <Link
                        href="/admin/achievements"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <Award className="h-4 w-4" />
                        Achievements
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <Mail className="h-4 w-4" />
                        Messages
                    </Link>
                </nav>
            </div>
            <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </div>
    )
}
