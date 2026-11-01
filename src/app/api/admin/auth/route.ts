import { NextRequest, NextResponse } from 'next/server';
import {
    AUTH_COOKIE_NAME,
    SESSION_COOKIE_OPTIONS,
    createAdminSessionToken,
    isAdminAuthenticated,
    verifyAdminPassword,
} from '@/lib/admin-auth';
import { isDbConfigured } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password || !verifyAdminPassword(String(password))) {
            return NextResponse.json(
                { success: false, error: 'Geçersiz şifre! Lütfen şifrenizi kontrol ediniz.' },
                { status: 401 }
            );
        }

        const token = createAdminSessionToken();
        const response = NextResponse.json({
            success: true,
            message: 'Giriş başarılı',
        });

        response.cookies.set({
            name: AUTH_COOKIE_NAME,
            value: token,
            ...SESSION_COOKIE_OPTIONS,
        });

        return response;
    } catch (error) {
        console.error('Admin auth error:', error);
        return NextResponse.json({ success: false, error: 'Giriş işlemi sırasında hata oluştu' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const authenticated = isAdminAuthenticated(request);

    return NextResponse.json({
        authenticated,
        ...(authenticated
            ? {
                  system: {
                      dbMode: isDbConfigured() ? 'postgresql' : 'memory',
                      smtpConfigured: true,
                  },
              }
            : {}),
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
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });

    return response;
}
