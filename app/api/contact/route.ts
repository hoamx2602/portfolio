import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const apiKey   = process.env.RESEND_API_KEY
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? ''
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

  // Guard: ensure env vars are configured
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 503 }
    )
  }
  if (!TO_EMAIL) {
    return NextResponse.json(
      { error: 'Recipient email is not configured.' },
      { status: 503 }
    )
  }

  const resend = new Resend(apiKey)

  let body: { name?: string; email?: string; company?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, company, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject: `New Contact Form Submission from ${name}${company ? ` (${company})` : ''}`,
    html: buildEmailHtml({ name, email, company, message }),
    text: buildEmailText({ name, email, company, message }),
  })

  if (error) {
    console.error('[contact/route] Resend error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}

function buildEmailHtml({
  name,
  email,
  company,
  message,
}: {
  name: string
  email: string
  company?: string
  message: string
}) {
  const companyRow = company
    ? `<tr>
        <td style="padding:8px 0;color:#6b7280;font-size:13px;width:100px">Company</td>
        <td style="padding:8px 0;color:#111827;font-size:13px">${esc(company)}</td>
      </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0d9488,#0891b2);border-radius:12px 12px 0 0;padding:32px;text-align:center">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;margin-bottom:12px">
            <span style="color:#fff;font-weight:700;font-size:14px">TC</span>
          </div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">New Enquiry</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px">from your website contact form</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:32px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #f3f4f6;margin-bottom:24px;padding-bottom:24px">
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;width:100px">Name</td>
              <td style="padding:8px 0;color:#111827;font-size:13px;font-weight:600">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td>
              <td style="padding:8px 0;color:#0891b2;font-size:13px">
                <a href="mailto:${esc(email)}" style="color:#0891b2;text-decoration:none">${esc(email)}</a>
              </td>
            </tr>
            ${companyRow}
          </table>

          <p style="margin:0 0 8px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Message</p>
          <div style="background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;padding:16px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap">${esc(message)}</div>

          <div style="margin-top:28px;text-align:center">
            <a href="mailto:${esc(email)}?subject=Re: Your enquiry" style="display:inline-block;background:linear-gradient(135deg,#0d9488,#0891b2);color:#fff;text-decoration:none;border-radius:8px;padding:12px 28px;font-size:14px;font-weight:600">
              Reply to ${esc(name)}
            </a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center">
          <p style="margin:0;font-size:12px;color:#9ca3af">This message was sent from the contact form at your TechConsult website.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildEmailText({
  name,
  email,
  company,
  message,
}: {
  name: string
  email: string
  company?: string
  message: string
}) {
  return [
    'New Contact Form Submission',
    '─────────────────────────',
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    '',
    'Message:',
    message,
    '',
    '─────────────────────────',
    'Sent from the TechConsult website contact form.',
  ]
    .filter((l) => l !== null)
    .join('\n')
}

function esc(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
