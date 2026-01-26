
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { path } = await req.json();
        const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || "unknown";
        const userAgent = req.headers.get("user-agent") || "unknown";

        // 1. Try Vercel Headers first (closest to edge)
        let country = req.headers.get("x-vercel-ip-country");
        let city = req.headers.get("x-vercel-ip-city");
        let device = "Desktop"; // Default

        if (userAgent.includes("Mobile")) device = "Mobile";
        if (userAgent.includes("Tablet")) device = "Tablet";

        // 2. Fallback to external API if running locally or Vercel headers missing
        if ((!country || !city) && ip !== "unknown" && !ip.startsWith("127.0.0.1") && !ip.startsWith("::1")) {
            try {
                const res = await fetch(`http://ip-api.com/json/${ip}`);
                const data = await res.json();
                if (data.status === "success") {
                    country = data.country;
                    city = data.city;
                }
            } catch (e) {
                console.warn("Geo lookup failed", e);
            }
        }

        await prisma.visit.create({
            data: {
                path,
                ip,
                userAgent,
                country: country || "Unknown",
                city: city || "Unknown",
                device
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to record visit:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

import { auth } from "@/auth";

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.visit.deleteMany();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to reset visits:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
