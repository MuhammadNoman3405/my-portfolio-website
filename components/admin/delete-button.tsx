"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DeleteButtonProps {
    id: string
    type?: "skills" | "projects" | "certifications"
    name?: string
    endpoint?: string
    itemName?: string
}

export function DeleteButton({ id, type, name, endpoint, itemName }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    // Support both old and new prop names
    const apiEndpoint = endpoint || type || "items"
    const displayName = itemName || name || "item"

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const response = await fetch(`/api/${apiEndpoint}/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete")
            }

            toast.success(`Deleted successfully`)
            router.refresh()
        } catch (error) {
            toast.error(`Failed to delete`)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isDeleting}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete <strong>{displayName}</strong>. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
