
"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function TrafficTracker({ shouldTrack }: { shouldTrack: boolean }) {
    const pathname = usePathname()

    useEffect(() => {
        // 1. Server-side check: If admin is logged in (shouldTrack = false), stop immediately.
        if (!shouldTrack) return

        // 2. Client-side check: Ignore visits to admin pages (just in case)
        if (pathname?.startsWith("/admin")) return

        const recordVisit = async () => {
            try {
                // 3. Unique Visitor Check: Check localStorage for recent visit
                const storageKey = "portfolio_last_visit"
                const lastVisit = localStorage.getItem(storageKey)
                const now = Date.now()
                const oneDayMs = 24 * 60 * 60 * 1000

                // If visited within last 24 hours, do NOT count again.
                if (lastVisit && (now - parseInt(lastVisit)) < oneDayMs) {
                    return
                }

                // Otherwise, record the visit
                await fetch("/api/visit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ path: pathname }),
                })

                // Update timestamp to now
                localStorage.setItem(storageKey, now.toString())

            } catch (error) {
                console.error("Failed to track visit", error)
            }
        }

        recordVisit()
    }, [pathname, shouldTrack])

    return null
}
