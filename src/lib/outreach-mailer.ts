import fs from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';
import {
    OUTREACH_CONFIG,
    TemplateContact,
    getEmailHtml,
    getEmailPlainText,
    getEmailSubject,
} from '@/lib/outreach-templates';
import { markOutreachContactSent } from '@/lib/outreach-store';

let cachedLogoBuffer: Buffer | null = null;

function getInlineLogoBuffer(): Buffer | null {
    if (cachedLogoBuffer) return cachedLogoBuffer;
    const candidates = [
        path.join(process.cwd(), 'public', 'logo-email.png'),
        path.join(process.cwd(), 'public', 'logo.png'),
    ];
    for (const filePath of candidates) {
        try {
            if (fs.existsSync(filePath)) {
                cachedLogoBuffer = fs.readFileSync(filePath);
                return cachedLogoBuffer;
            }
        } catch {
            // Fall through to next candidate
        }
    }
    return null;
}

export function createOutreachTransporter() {
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

export interface SendOutreachMailParams {
    contact: TemplateContact;
    lang: 'tr' | 'en';
    customSubject?: string;
    isTest?: boolean;
    testEmail?: string;
    transporter?: ReturnType<typeof createOutreachTransporter>;
}

export interface SendOutreachMailResult {
    id: number;
    name: string;
    email: string;
    success: boolean;
    error?: string;
}

export async function sendSingleOutreachMail({
    contact,
    lang,
    customSubject,
    isTest = false,
    testEmail = 'atayapicambalkon@gmail.com',
    transporter,
}: SendOutreachMailParams): Promise<SendOutreachMailResult> {
    const activeTransporter = transporter || createOutreachTransporter();
    const safeLang: 'tr' | 'en' = lang === 'en' ? 'en' : 'tr';
    const recipient = isTest ? testEmail : contact.email;
    const subject = (customSubject && customSubject.trim()) || getEmailSubject(contact, safeLang);
    const logoBuffer = getInlineLogoBuffer();

    const html = getEmailHtml(contact, safeLang, {
        logoSrc: logoBuffer
            ? 'cid:atayapi-logo'
            : `${OUTREACH_CONFIG.websiteHref}/logo-email.png`,
    });
    const text = getEmailPlainText(contact, safeLang);

    try {
        await activeTransporter.sendMail({
            from: `"${OUTREACH_CONFIG.senderName}" <${OUTREACH_CONFIG.senderEmail}>`,
            to: recipient,
            replyTo: OUTREACH_CONFIG.senderEmail,
            subject: isTest ? `[TEST MAİLİ] ${subject}` : subject,
            text,
            html,
            attachments: logoBuffer
                ? [
                      {
                          filename: 'ata-yapi-logo.png',
                          content: logoBuffer,
                          contentType: 'image/png',
                          cid: 'atayapi-logo',
                          contentDisposition: 'inline',
                      },
                  ]
                : undefined,
        });

        if (!isTest) {
            markOutreachContactSent(contact.id, safeLang);
        }

        return {
            id: contact.id,
            name: contact.name,
            email: recipient,
            success: true,
        };
    } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'E-posta gönderimi başarısız oldu.';
        console.error(`Error sending outreach email to ${recipient}:`, err);
        return {
            id: contact.id,
            name: contact.name,
            email: recipient,
            success: false,
            error: errMsg,
        };
    }
}

