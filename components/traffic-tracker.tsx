
"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function TrafficTracker() {
    const pathname = usePathname()
    // Use a ref to prevent double firing in strict mode dev, though simple useEffect dependency on pathname is usually fine.
    // We'll keep it simple: fire when pathname changes.

    useEffect(() => {
        if (!pathname) return

        // Simple debounce or check to avoid excessive calls could be added here
        // For now, we just fire off the request.

        const recordVisit = async () => {
            try {
                await fetch("/api/visit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ path: pathname }),
                })
            } catch (error) {
                console.error("Failed to track visit", error)
            }
        }

        recordVisit()
    }, [pathname])

    return null
}
