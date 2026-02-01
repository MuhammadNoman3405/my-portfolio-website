
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import { adminNavLinks } from "@/components/admin/nav-links"
import { MobileNav } from "@/components/admin/mobile-nav"

// Last updated: 2026-02-01 - Mobile Responsive Refactor

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
        <div className="min-h-screen bg-muted/40 grid w-full lg:grid-cols-[220px_1fr]">
            <div className="hidden border-r bg-background lg:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <ShieldCheck className="h-6 w-6" />
                            <span className="">Admin Portal</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
                            {adminNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:hidden">
                    <MobileNav />
                    <div className="w-full flex-1">
                        <span className="font-semibold">Admin Portal</span>
                    </div>
                </header>
                <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}
