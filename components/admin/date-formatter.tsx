"use client";

import { useEffect, useState } from "react";

export function DateFormatter({ date }: { date: Date | string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Render a placeholder or server time to avoid hydration mismatch
        // Showing nothing or a loading state until client hydrates
        return <span className="text-muted-foreground text-xs">Loading...</span>;
    }

    return (
        <span>
            {new Date(date).toLocaleString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })}
        </span>
    );
}
