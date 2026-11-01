import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
    OUTREACH_CONFIG,
    getEmailSubject,
    getEmailHtml,
    getEmailPlainText,
    TemplateContact,
} from '@/lib/outreach-templates';
import { getAllOutreachContacts, markOutreachContactSent } from '@/lib/outreach-store';
import { requireAdmin } from '@/lib/admin-auth';

function getTransporter() {
    const user = process.env.SMTP_USER || 'atayapicambalkon@gmail.com';
    const pass = process.env.SMTP_PASSWORD || 'jdyn pfds zxcu agnb';

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user,
            pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
}

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
        const transporter = getTransporter();

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

        const results: { id: number; name: string; email: string; success: boolean; error?: string }[] = [];
        const safeLang: 'tr' | 'en' = lang === 'en' ? 'en' : 'tr';

        for (const target of targets) {
            const recipient = isTest ? testEmail : target.email;
            const subject = customSubject || getEmailSubject(target, safeLang);
            const html = getEmailHtml(target, safeLang);
            const text = getEmailPlainText(target, safeLang);

            try {
                await transporter.sendMail({
                    from: `"${OUTREACH_CONFIG.senderName}" <${OUTREACH_CONFIG.senderEmail}>`,
                    to: recipient,
                    replyTo: OUTREACH_CONFIG.senderEmail,
                    subject: isTest ? `[TEST MAİLİ] ${subject}` : subject,
                    text,
                    html,
                });

                if (!isTest) {
                    markOutreachContactSent(target.id, safeLang);
                }

                results.push({
                    id: target.id,
                    name: target.name,
                    email: recipient,
                    success: true,
                });

                if (targets.length > 1) {
                    await new Promise((res) => setTimeout(res, 600));
                }
            } catch (err: unknown) {
                const errMsg = err instanceof Error ? err.message : 'E-posta gönderimi başarısız oldu.';
                console.error(`Error sending email to ${recipient}:`, err);
                results.push({
                    id: target.id,
                    name: target.name,
                    email: recipient,
                    success: false,
                    error: errMsg,
                });
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
