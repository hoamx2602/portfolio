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
        <td style="padding:10px 0;color:#6b7280;font-size:13px;width:90px;vertical-align:top">Company</td>
        <td style="padding:10px 0;color:#e5e7eb;font-size:13px">${esc(company)}</td>
      </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#0f1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1117;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px">

        <!-- Header: dark logo band -->
        <tr><td style="background:#141820;border-radius:14px 14px 0 0;padding:28px 32px 24px;text-align:center;border-left:1px solid #2a2f3d;border-right:1px solid #2a2f3d;border-top:1px solid #2a2f3d">
          <img src="https://www.skilpex.uk/side-logo.svg" width="174" height="68" alt="Skilpex" style="display:block;margin:0 auto" />
        </td></tr>

        <!-- Navy title band -->
        <tr><td style="background:#0C447C;padding:20px 32px 20px;text-align:center">
          <h1 style="margin:0 0 4px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px">New Enquiry</h1>
          <p style="margin:0;color:rgba(255,255,255,0.6);font-size:13px">via your website contact form</p>
        </td></tr>

        <!-- Gold accent bar -->
        <tr><td style="background:#EF9F27;height:4px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Body -->
        <tr><td style="background:#141820;padding:32px;border-left:1px solid #2a2f3d;border-right:1px solid #2a2f3d">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-bottom:1px solid #2a2f3d;padding-bottom:24px">
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:13px;width:90px;vertical-align:top">Name</td>
              <td style="padding:10px 0;color:#e5e7eb;font-size:13px;font-weight:600">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top">Email</td>
              <td style="padding:10px 0;font-size:13px">
                <a href="mailto:${esc(email)}" style="color:#60a5fa;text-decoration:none;font-weight:500">${esc(email)}</a>
              </td>
            </tr>
            ${companyRow}
          </table>

          <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#EF9F27;text-transform:uppercase;letter-spacing:0.08em">Message</p>
          <div style="background:#0f1117;border-radius:8px;border-left:3px solid #EF9F27;padding:16px 20px;font-size:14px;color:#d1d5db;line-height:1.75;white-space:pre-wrap">${esc(message)}</div>

          <div style="margin-top:28px;text-align:center">
            <a href="mailto:${esc(email)}?subject=Re: Your enquiry to Skilpex"
               style="display:inline-block;background:#0C447C;color:#ffffff;text-decoration:none;border-radius:8px;padding:13px 32px;font-size:14px;font-weight:600;letter-spacing:0.01em">
              Reply to ${esc(name)}
            </a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0f1117;border:1px solid #2a2f3d;border-top:none;border-radius:0 0 14px 14px;padding:24px 32px;text-align:center">
          <img src="https://www.skilpex.uk/main-logo.svg" width="28" height="32" alt="Skilpex" style="display:block;margin:0 auto 10px" />
          <p style="margin:0 0 3px;font-size:12px;color:#6b7280">
            &copy; ${new Date().getFullYear()} Skilpex &nbsp;&middot;&nbsp;
            <a href="https://www.skilpex.uk" style="color:#60a5fa;text-decoration:none">skilpex.uk</a>
          </p>
          <p style="margin:0;font-size:11px;color:#4b5563">This message was submitted via the contact form on your website.</p>
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
