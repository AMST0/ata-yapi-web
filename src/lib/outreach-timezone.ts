// Country-aware IANA timezone mapping and DST-safe local 09:00 scheduler
// Ensures outreach emails arrive at exact morning business hours (e.g. 09:00) in each recipient country.

export interface CountryTimezoneMeta {
    code: string;
    nameEn: string;
    nameTr: string;
    cityTr: string;
    flag: string;
    timeZone: string;
}

export const COUNTRY_TIMEZONES: Record<string, CountryTimezoneMeta> = {
    DE: { code: "DE", nameEn: "Germany", nameTr: "Almanya", cityTr: "Berlin", flag: "🇩🇪", timeZone: "Europe/Berlin" },
    BE: { code: "BE", nameEn: "Belgium", nameTr: "Belçika", cityTr: "Brüksel", flag: "🇧🇪", timeZone: "Europe/Brussels" },
    NL: { code: "NL", nameEn: "Netherlands", nameTr: "Hollanda", cityTr: "Amsterdam", flag: "🇳🇱", timeZone: "Europe/Amsterdam" },
    AT: { code: "AT", nameEn: "Austria", nameTr: "Avusturya", cityTr: "Viyana", flag: "🇦🇹", timeZone: "Europe/Vienna" },
    CH: { code: "CH", nameEn: "Switzerland", nameTr: "İsviçre", cityTr: "Zürih", flag: "🇨🇭", timeZone: "Europe/Zurich" },
    FR: { code: "FR", nameEn: "France", nameTr: "Fransa", cityTr: "Paris", flag: "🇫🇷", timeZone: "Europe/Paris" },
    IT: { code: "IT", nameEn: "Italy", nameTr: "İtalya", cityTr: "Roma", flag: "🇮🇹", timeZone: "Europe/Rome" },
    ES: { code: "ES", nameEn: "Spain", nameTr: "İspanya", cityTr: "Madrid", flag: "🇪🇸", timeZone: "Europe/Madrid" },
    PL: { code: "PL", nameEn: "Poland", nameTr: "Polonya", cityTr: "Varşova", flag: "🇵🇱", timeZone: "Europe/Warsaw" },
    SE: { code: "SE", nameEn: "Sweden", nameTr: "İsveç", cityTr: "Stockholm", flag: "🇸🇪", timeZone: "Europe/Stockholm" },
    DK: { code: "DK", nameEn: "Denmark", nameTr: "Danimarka", cityTr: "Kopenhag", flag: "🇩🇰", timeZone: "Europe/Copenhagen" },
    NO: { code: "NO", nameEn: "Norway", nameTr: "Norveç", cityTr: "Oslo", flag: "🇳🇴", timeZone: "Europe/Oslo" },
    GB: { code: "GB", nameEn: "United Kingdom", nameTr: "Birleşik Krallık", cityTr: "Londra", flag: "🇬🇧", timeZone: "Europe/London" },
    PT: { code: "PT", nameEn: "Portugal", nameTr: "Portekiz", cityTr: "Lizbon", flag: "🇵🇹", timeZone: "Europe/Lisbon" },
    GR: { code: "GR", nameEn: "Greece", nameTr: "Yunanistan", cityTr: "Atina", flag: "🇬🇷", timeZone: "Europe/Athens" },
    RO: { code: "RO", nameEn: "Romania", nameTr: "Romanya", cityTr: "Bükreş", flag: "🇷🇴", timeZone: "Europe/Bucharest" },
    BG: { code: "BG", nameEn: "Bulgaria", nameTr: "Bulgaristan", cityTr: "Sofya", flag: "🇧🇬", timeZone: "Europe/Sofia" },
    TR: { code: "TR", nameEn: "Türkiye", nameTr: "Türkiye", cityTr: "İstanbul", flag: "🇹🇷", timeZone: "Europe/Istanbul" },
    AE: { code: "AE", nameEn: "United Arab Emirates", nameTr: "BAE (Dubai)", cityTr: "Dubai", flag: "🇦🇪", timeZone: "Asia/Dubai" },
    US: { code: "US", nameEn: "United States", nameTr: "ABD", cityTr: "New York", flag: "🇺🇸", timeZone: "America/New_York" },
    OTHER: { code: "OTHER", nameEn: "Europe", nameTr: "Avrupa (CET)", cityTr: "Orta Avrupa", flag: "🇪🇺", timeZone: "Europe/Berlin" },
};

const EMAIL_TLD_TO_CODE: Record<string, string> = {
    de: "DE",
    be: "BE",
    nl: "NL",
    at: "AT",
    ch: "CH",
    fr: "FR",
    it: "IT",
    es: "ES",
    pl: "PL",
    se: "SE",
    dk: "DK",
    no: "NO",
    uk: "GB",
    pt: "PT",
    gr: "GR",
    ro: "RO",
    bg: "BG",
    tr: "TR",
    ae: "AE",
};

export function resolveCountryTimezone(countryCode?: string, email?: string): CountryTimezoneMeta {
    const normalized = (countryCode || "").trim().toUpperCase();
    if (normalized && normalized !== "OTHER" && COUNTRY_TIMEZONES[normalized]) {
        return COUNTRY_TIMEZONES[normalized];
    }

    if (email) {
        const clean = email.trim().toLowerCase();
        const tld = clean.split(".").pop() || "";
        const mapped = EMAIL_TLD_TO_CODE[tld];
        if (mapped && COUNTRY_TIMEZONES[mapped]) {
            return COUNTRY_TIMEZONES[mapped];
        }
    }

    return COUNTRY_TIMEZONES[normalized] || COUNTRY_TIMEZONES.OTHER;
}

interface ZonedParts {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    weekday: string;
}

function getZonedParts(date: Date, timeZone: string): ZonedParts {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
        weekday: "short",
    });

    const parts = formatter.formatToParts(date);
    const map: Record<string, string> = {};
    for (const part of parts) {
        if (part.type !== "literal") {
            map[part.type] = part.value;
        }
    }

    return {
        year: Number(map.year || 2026),
        month: Number(map.month || 1),
        day: Number(map.day || 1),
        hour: Number(map.hour || 0) % 24,
        minute: Number(map.minute || 0),
        second: Number(map.second || 0),
        weekday: map.weekday || "Mon",
    };
}

/**
 * Converts a wall-clock date/time in a specific IANA timezone into an exact UTC Date,
 * iterating twice so Daylight Saving Time (CET/CEST, WET/WEST, EET/EEST, EST/EDT) transitions are exact.
 */
export function zonedWallTimeToUtc(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    timeZone: string
): Date {
    const targetWallAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
    let guessMs = targetWallAsUtc;

    for (let i = 0; i < 2; i++) {
        const parts = getZonedParts(new Date(guessMs), timeZone);
        const zonedAsUtc = Date.UTC(
            parts.year,
            parts.month - 1,
            parts.day,
            parts.hour,
            parts.minute,
            parts.second,
            0
        );
        const offsetMs = zonedAsUtc - guessMs;
        guessMs = targetWallAsUtc - offsetMs;
    }

    return new Date(guessMs);
}

export function parseTargetTime(hhmm: string): { hour: number; minute: number; formatted: string } {
    const match = /^(\d{1,2}):(\d{2})$/.exec((hhmm || "09:00").trim());
    if (!match) {
        return { hour: 9, minute: 0, formatted: "09:00" };
    }
    const hour = Math.max(0, Math.min(23, Number(match[1])));
    const minute = Math.max(0, Math.min(59, Number(match[2])));
    return {
        hour,
        minute,
        formatted: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    };
}

export function formatDateInZoneTr(date: Date, timeZone: string): string {
    return new Intl.DateTimeFormat("tr-TR", {
        timeZone,
        day: "2-digit",
        month: "short",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).format(date);
}

export function formatClockInZone(date: Date, timeZone: string): string {
    return new Intl.DateTimeFormat("tr-TR", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).format(date);
}

export interface ComputedCountrySchedule {
    scheduledAtUtc: Date;
    scheduledAtIso: string;
    timeZone: string;
    countryNameTr: string;
    cityTr: string;
    flag: string;
    targetLocalTime: string;
    recipientLocalLabel: string;
    turkeyLocalLabel: string;
    currentCountryClock: string;
    minutesUntilSend: number;
}

/**
 * Calculates the next occurrence of targetLocalTime (default "09:00") in the recipient's country timezone.
 * - If today's target hour in that country hasn't passed yet, schedules for today at 09:00 local time.
 * - If today's target hour has already passed, schedules for tomorrow at 09:00 local time.
 * - If skipWeekends is enabled (default true) and the day in that country falls on Sat/Sun, advances to Monday 09:00.
 */
export function computeNextCountryLocalSchedule(
    countryCode?: string,
    options?: {
        email?: string;
        targetLocalTime?: string;
        skipWeekends?: boolean;
         staggerIndex?: number;
        staggerSeconds?: number;
        now?: Date;
    }
): ComputedCountrySchedule {
    const now = options?.now || new Date();
    const skipWeekends = options?.skipWeekends ?? true;
    const { hour, minute, formatted } = parseTargetTime(options?.targetLocalTime || "09:00");
    const meta = resolveCountryTimezone(countryCode, options?.email);
    const { timeZone } = meta;

    const nowParts = getZonedParts(now, timeZone);
    let cursorUtcDate = new Date(Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day));

    let candidateUtc = zonedWallTimeToUtc(
        cursorUtcDate.getUTCFullYear(),
        cursorUtcDate.getUTCMonth() + 1,
        cursorUtcDate.getUTCDate(),
        hour,
        minute,
        timeZone
    );

    // If the target time today in that country is already in the past (or within 45 seconds), move to tomorrow
    if (candidateUtc.getTime() <= now.getTime() + 45_000) {
        cursorUtcDate = new Date(cursorUtcDate.getTime() + 86_400_000);
        candidateUtc = zonedWallTimeToUtc(
            cursorUtcDate.getUTCFullYear(),
            cursorUtcDate.getUTCMonth() + 1,
            cursorUtcDate.getUTCDate(),
            hour,
            minute,
            timeZone
        );
    }

    if (skipWeekends) {
        for (let guard = 0; guard < 4; guard++) {
            const candidateParts = getZonedParts(candidateUtc, timeZone);
            if (candidateParts.weekday !== "Sat" && candidateParts.weekday !== "Sun") {
                break;
            }
            cursorUtcDate = new Date(cursorUtcDate.getTime() + 86_400_000);
            candidateUtc = zonedWallTimeToUtc(
                cursorUtcDate.getUTCFullYear(),
                cursorUtcDate.getUTCMonth() + 1,
                cursorUtcDate.getUTCDate(),
                hour,
                minute,
                timeZone
            );
        }
    }

    // Optional gentle staggering (e.g. 15s apart for multiple recipients in the same country so Gmail SMTP isn't burst-hit at the exact millisecond)
    const staggerIdx = options?.staggerIndex || 0;
    const staggerSec = options?.staggerSeconds ?? 12;
    if (staggerIdx > 0 && staggerSec > 0) {
        candidateUtc = new Date(candidateUtc.getTime() + staggerIdx * staggerSec * 1000);
    }

    const minutesUntilSend = Math.max(1, Math.round((candidateUtc.getTime() - now.getTime()) / 60_000));

    return {
        scheduledAtUtc: candidateUtc,
        scheduledAtIso: candidateUtc.toISOString(),
        timeZone,
        countryNameTr: meta.nameTr,
        cityTr: meta.cityTr,
        flag: meta.flag,
        targetLocalTime: formatted,
        recipientLocalLabel: formatDateInZoneTr(candidateUtc, timeZone),
        turkeyLocalLabel: formatDateInZoneTr(candidateUtc, "Europe/Istanbul"),
        currentCountryClock: formatClockInZone(now, timeZone),
        minutesUntilSend,
    };
}

