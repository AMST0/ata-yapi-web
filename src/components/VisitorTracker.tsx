"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
    const pathname = usePathname();
    const lastTrackedPath = useRef<string | null>(null);

    useEffect(() => {
        // Exclude internal admin and api routes
        if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api") || pathname.startsWith("/_next")) {
            return;
        }

        // Avoid tracking the exact same path multiple times in rapid succession
        if (lastTrackedPath.current === pathname) {
            return;
        }
        lastTrackedPath.current = pathname;

        const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

        let browser = "Other";
        if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
        else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
        else if (ua.includes("Firefox")) browser = "Firefox";
        else if (ua.includes("Edg")) browser = "Edge";

        let os = "Other";
        if (ua.includes("Win")) os = "Windows";
        else if (ua.includes("Mac")) os = "macOS";
        else if (ua.includes("Android")) os = "Android";
        else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
        else if (ua.includes("Linux")) os = "Linux";

        let device = "Desktop";
        if (/Mobi|Android/i.test(ua)) device = "Mobile";
        else if (/Tablet|iPad/i.test(ua)) device = "Tablet";

        const payload = {
            page: pathname,
            referrer: typeof document !== "undefined" ? document.referrer : "",
            browser,
            os,
            device,
        };

        // Fire and forget
        try {
            fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                keepalive: true,
            }).catch(() => {
                // Silently handle if network drops
            });
        } catch {
            // Silently handle
        }
    }, [pathname]);

    return null;
}
