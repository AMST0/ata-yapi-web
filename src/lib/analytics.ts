/**
 * Google Analytics 4 Event Tracking Utilities
 * 
 * Uses NEXT_PUBLIC_GA4_ID environment variable.
 * If not set, all tracking functions become no-ops with zero performance impact.
 */

// Check if GA4 is configured
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID;

// Type declaration for gtag
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event' | 'js',
            targetId: string | Date,
            config?: Record<string, unknown>
        ) => void;
        dataLayer?: unknown[];
    }
}

/**
 * Check if analytics is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
    return Boolean(GA_MEASUREMENT_ID);
};

/**
 * Get the GA4 Measurement ID
 */
export const getGAMeasurementId = (): string | undefined => {
    return GA_MEASUREMENT_ID;
};

/**
 * Track a custom event
 * No-op if GA4 is not configured
 */
export const trackEvent = (
    eventName: string,
    params?: Record<string, unknown>
): void => {
    if (!GA_MEASUREMENT_ID) return;
    if (typeof window === 'undefined') return;
    if (!window.gtag) return;

    window.gtag('event', eventName, params);
};

/**
 * Track WhatsApp button click
 * Can be used directly as onClick handler
 */
export const trackWhatsAppClick = (): void => {
    trackEvent('whatsapp_click', {
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
    });
};

/**
 * Track phone call button click
 * Can be used directly as onClick handler
 */
export const trackPhoneClick = (): void => {
    trackEvent('phone_click', {
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
    });
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string): void => {
    trackEvent('form_submit', {
        form_name: formName,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
    });
};

/**
 * Track calculator WhatsApp click
 * Can be used directly as onClick handler
 */
export const trackCalculatorWhatsApp = (): void => {
    trackEvent('calculator_whatsapp_click', {
        calculator_type: 'balcony',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
    });
};

/**
 * Track page view (for SPA navigation)
 */
export const trackPageView = (url: string): void => {
    if (!GA_MEASUREMENT_ID) return;
    if (typeof window === 'undefined') return;
    if (!window.gtag) return;

    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
    });
};

