import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const AUTH_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getAdminPassword(): string {
    return process.env.ADMIN_PASSWORD || 'atayapi2026';
}

function getSigningSecret(): string {
    return process.env.ADMIN_SESSION_SECRET || `atayapi-hmac-secret::${getAdminPassword()}`;
}

export function verifyAdminPassword(input: string): boolean {
    const expected = getAdminPassword();
    const inputBuf = Buffer.from(String(input));
    const expectedBuf = Buffer.from(expected);
    if (inputBuf.length !== expectedBuf.length) {
        return false;
    }
    return crypto.timingSafeEqual(inputBuf, expectedBuf);
}

export function createAdminSessionToken(): string {
    const issuedAt = Date.now().toString();
    const signature = crypto
        .createHmac('sha256', getSigningSecret())
        .update(issuedAt)
        .digest('hex');
    return `${issuedAt}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null): boolean {
    if (!token || !token.includes('.')) return false;

    const [issuedAtStr, signature] = token.split('.');
    const issuedAt = Number(issuedAtStr);
    if (!Number.isFinite(issuedAt) || !signature) return false;

    const ageMs = Date.now() - issuedAt;
    if (ageMs < -60_000 || ageMs > SESSION_MAX_AGE_SECONDS * 1000) {
        return false;
    }

    const expectedSig = crypto
        .createHmac('sha256', getSigningSecret())
        .update(issuedAtStr)
        .digest('hex');

    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expectedBuf.length) return false;

    return crypto.timingSafeEqual(sigBuf, expectedBuf);
}

export function isAdminAuthenticated(request: NextRequest): boolean {
    const cookieVal = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    return verifyAdminSessionToken(cookieVal);
}

export function requireAdmin(request: NextRequest): NextResponse | null {
    if (!isAdminAuthenticated(request)) {
        return NextResponse.json(
            { success: false, error: 'Yetkisiz erişim. Lütfen yönetici girişi yapınız.' },
            { status: 401 }
        );
    }
    return null;
}

export function isQuoteAuthorized(request: NextRequest): boolean {
    if (isAdminAuthenticated(request)) return true;
    const expectedPin = process.env.NEXT_PUBLIC_QUOTE_PIN || '1234';
    const providedPin = request.headers.get('x-quote-pin') || '';
    return providedPin === expectedPin;
}

export const SESSION_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
};

