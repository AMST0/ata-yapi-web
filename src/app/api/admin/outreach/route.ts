import { NextRequest, NextResponse } from 'next/server';
import { OUTREACH_CONFIG } from '@/lib/outreach-templates';
import {
    OutreachContact,
    addCustomOutreachContact,
    getAllOutreachContacts,
    removeCustomOutreachContact,
} from '@/lib/outreach-store';
import { requireAdmin } from '@/lib/admin-auth';
import { processDueScheduledOutreachJobs } from '@/lib/outreach-schedule-store';

export type { OutreachContact };

export async function GET(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    await processDueScheduledOutreachJobs().catch(() => {});
    const contacts = getAllOutreachContacts();
    const uniqueCountries = new Set(contacts.map((c) => c.countryCode));

    return NextResponse.json({
        totalSent: contacts.length,
        countriesCount: uniqueCountries.size,
        sender: {
            email: OUTREACH_CONFIG.senderEmail,
            name: OUTREACH_CONFIG.senderName,
            whatsapp: OUTREACH_CONFIG.whatsappPhone,
            website: OUTREACH_CONFIG.website,
            smtpServer: 'smtp.gmail.com:587',
        },
        contacts,
    });
}

export async function POST(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const body = await request.json();
        const name = String(body.name || '').trim();
        const email = String(body.email || '').trim().toLowerCase();
        const countryCode = String(body.countryCode || 'DE').trim().toUpperCase();
        const category = String(body.category || 'Pencere, Cam & Yapı Sistemleri').trim();
        const group = body.group === 'alevi' ? 'alevi' : 'business';

        if (!name || name.length > 160) {
            return NextResponse.json({ success: false, error: 'Geçerli bir firma adı giriniz.' }, { status: 400 });
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ success: false, error: 'Geçerli bir e-posta adresi giriniz.' }, { status: 400 });
        }

        const existing = getAllOutreachContacts().some((c) => c.email.toLowerCase() === email);
        if (existing) {
            return NextResponse.json({ success: false, error: 'Bu e-posta adresi zaten listede mevcut.' }, { status: 409 });
        }

        const contact = addCustomOutreachContact({
            name,
            email,
            countryCode,
            category,
            group,
        });

        return NextResponse.json({ success: true, contact });
    } catch (error) {
        console.error('Error adding outreach contact:', error);
        return NextResponse.json({ success: false, error: 'Firma eklenirken hata oluştu.' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    if (!Number.isFinite(id)) {
        return NextResponse.json({ success: false, error: 'Geçersiz firma ID.' }, { status: 400 });
    }

    const removed = removeCustomOutreachContact(id);
    if (!removed) {
        return NextResponse.json(
            { success: false, error: 'Sabit liste kayıtları silinemez veya kayıt bulunamadı.' },
            { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
}
