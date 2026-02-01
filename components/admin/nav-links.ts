import { Contact, Home, Layers, Settings, ShieldCheck, User, FileText, GraduationCap, Briefcase, Award, Mail } from "lucide-react"

export const adminNavLinks = [
    {
        href: "/admin",
        label: "Dashboard",
        icon: Home,
    },
    {
        href: "/admin/profile",
        label: "About & Profile",
        icon: User,
    },
    {
        href: "/admin/projects",
        label: "Projects",
        icon: Layers,
    },
    {
        href: "/admin/skills",
        label: "Skills",
        icon: User,
    },
    {
        href: "/admin/certifications",
        label: "Certifications",
        icon: Settings,
    },
    {
        href: "/admin/resume",
        label: "Resume",
        icon: FileText,
    },
    {
        href: "/admin/education",
        label: "Education",
        icon: GraduationCap,
    },
    {
        href: "/admin/experience",
        label: "Experience",
        icon: Briefcase,
    },
    {
        href: "/admin/achievements",
        label: "Achievements",
        icon: Award,
    },
    {
        href: "/admin/messages",
        label: "Messages",
        icon: Mail,
    },
]
