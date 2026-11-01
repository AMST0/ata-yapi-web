import { NextRequest, NextResponse } from 'next/server';
import { TemplateContact } from '@/lib/outreach-templates';
import { getAllOutreachContacts } from '@/lib/outreach-store';
import { requireAdmin } from '@/lib/admin-auth';
import {
    SendOutreachMailResult,
    createOutreachTransporter,
    sendSingleOutreachMail,
} from '@/lib/outreach-mailer';

export async function POST(request: NextRequest) {
    const authError = requireAdmin(request);
    if (authError) return authError;

    try {
        const body = await request.json();
        const {
            contactId,
            contactIds,
            sendAll,
            lang = 'tr',
            customSubject,
            isTest = false,
            testEmail = 'atayapicambalkon@gmail.com',
        } = body;

        const allContacts = getAllOutreachContacts();
        const transporter = createOutreachTransporter();

        let targets: TemplateContact[] = [];

        if (sendAll) {
            targets = allContacts;
        } else if (Array.isArray(contactIds) && contactIds.length > 0) {
            targets = allContacts.filter((c) => contactIds.includes(c.id));
        } else if (contactId) {
            const single = allContacts.find((c) => c.id === contactId);
            if (!single) {
                return NextResponse.json({ success: false, error: 'Firma bulunamadı.' }, { status: 404 });
            }
            targets = [single];
        } else {
            return NextResponse.json({ success: false, error: 'Gönderilecek hedef firma belirtilmedi.' }, { status: 400 });
        }

        const results: SendOutreachMailResult[] = [];
        const safeLang: 'tr' | 'en' = lang === 'en' ? 'en' : 'tr';

        for (const target of targets) {
            const sendRes = await sendSingleOutreachMail({
                contact: target,
                lang: safeLang,
                customSubject,
                isTest,
                testEmail,
                transporter,
            });
            results.push(sendRes);

            if (targets.length > 1) {
                await new Promise((res) => setTimeout(res, 600));
            }
        }

        const successfulCount = results.filter((r) => r.success).length;
        const failedCount = results.filter((r) => !r.success).length;

        return NextResponse.json({
            success: successfulCount > 0,
            totalRequested: targets.length,
            successfulCount,
            failedCount,
            isTest,
            results,
            message: isTest
                ? `Test maili başarıyla ${testEmail} adresine iletildi!`
                : `${successfulCount} firmaya e-posta başarıyla gönderildi.`,
        });
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : 'E-posta gönderim servisi sırasında bir hata oluştu.';
        console.error('Outreach send error:', error);
        return NextResponse.json(
            {
                success: false,
                error: errMsg,
            },
            { status: 500 }
        );
    }
}
