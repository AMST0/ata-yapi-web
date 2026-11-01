import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'atayapi2026';
const AUTH_COOKIE_NAME = 'admin_session';
const AUTH_TOKEN = 'authenticated_admin_atayapi';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password || password !== DEFAULT_ADMIN_PASSWORD) {
            return NextResponse.json(
                { success: false, error: 'Geçersiz şifre! Lütfen şifrenizi kontrol ediniz.' },
                { status: 401 }
            );
        }

        const response = NextResponse.json({
            success: true,
            message: 'Giriş başarılı',
        });

        // 30 days expiration
        response.cookies.set({
            name: AUTH_COOKIE_NAME,
            value: AUTH_TOKEN,
            httpOnly: false, // accessible to client for fast client-side checks
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
        });

        return response;
    } catch (error) {
        console.error('Admin auth error:', error);
        return NextResponse.json({ success: false, error: 'Giriş işlemi sırasında hata oluştu' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);
    const isAuthenticated = sessionCookie?.value === AUTH_TOKEN;

    return NextResponse.json({
        authenticated: isAuthenticated,
    });
}

export async function DELETE() {
    const response = NextResponse.json({
        success: true,
        message: 'Çıkış yapıldı',
    });

    response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: '',
        path: '/',
        maxAge: 0,
    });

    return response;
}
