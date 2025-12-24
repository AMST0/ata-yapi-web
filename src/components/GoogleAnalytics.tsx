'use client';

import Script from 'next/script';
import { getGAMeasurementId, isAnalyticsEnabled } from '@/lib/analytics';

/**
 * Google Analytics 4 Component
 * 
 * Only loads GA4 scripts if NEXT_PUBLIC_GA4_ID is set.
 * Uses next/script with afterInteractive strategy for optimal performance.
 */
export default function GoogleAnalytics() {
    const measurementId = getGAMeasurementId();

    // Don't render anything if GA4 is not configured
    if (!isAnalyticsEnabled() || !measurementId) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${measurementId}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}
