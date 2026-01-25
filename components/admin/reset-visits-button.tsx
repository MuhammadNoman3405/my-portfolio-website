"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function ResetVisitsButton() {
    const router = useRouter()

    const handleReset = async () => {
        if (!confirm("Are you sure you want to reset the visit count to 0? This cannot be undone.")) {
            return
        }

        try {
            const res = await fetch("/api/visit", {
                method: "DELETE",
            })

            if (res.ok) {
                toast.success("Visit stats reset successfully")
                router.refresh()
            } else {
                toast.error("Failed to reset stats")
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleReset}
            title="Reset Visit Count"
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
