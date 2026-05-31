import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_TOKEN,
  useCdn:    false,
})

// ── Helpers ──────────────────────────────────────────────────────────────────

const k = () => Math.random().toString(36).slice(2, 9)

const p = (text: string) => ({
  _type: 'block', _key: k(), style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})

const h2 = (text: string) => ({
  _type: 'block', _key: k(), style: 'h2', markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})

const h3 = (text: string) => ({
  _type: 'block', _key: k(), style: 'h3', markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})

const li = (text: string) => ({
  _type: 'block', _key: k(), style: 'normal', level: 1, listItem: 'bullet', markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})

// ── Page content ─────────────────────────────────────────────────────────────

const pages = [
  // ── Privacy Policy ────────────────────────────────────────────────────────
  {
    _type: 'legalPage',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy-policy' },
    lastUpdated: '2025-05-01',
    summary: 'This Privacy Policy explains how TechConsult collects, uses, and protects your personal information in accordance with UK GDPR and the Data Protection Act 2018.',
    body: [
      h2('1. Who We Are'),
      p('TechConsult is a responsible industrial AI consultancy based in Bradford, West Yorkshire, UK. We are the data controller for the personal data we collect through this website. For data protection enquiries, please contact us at contact@techconsult.com.'),

      h2('2. What Data We Collect'),
      p('We may collect the following categories of personal data:'),
      li('Contact information — name, email address, phone number, and company name when you submit our contact form'),
      li('Usage data — IP address, browser type, pages visited, and time spent on site (collected via analytics)'),
      li('Communication data — the content of messages you send us through the contact form or by email'),
      li('Cookie data — preferences and session information stored in your browser (see our Cookie Policy)'),

      h2('3. How We Use Your Data'),
      p('We process your personal data for the following purposes and legal bases:'),
      li('To respond to your enquiries and provide our services — legal basis: legitimate interests / contract performance'),
      li('To send you information about our services if you have opted in — legal basis: consent'),
      li('To analyse website performance and improve our services — legal basis: legitimate interests'),
      li('To comply with our legal obligations — legal basis: legal obligation'),

      h2('4. Data Retention'),
      p('We retain personal data only as long as necessary for the purposes for which it was collected. Contact form submissions are retained for up to 2 years. You may request deletion of your data at any time by contacting us.'),

      h2('5. Your Rights'),
      p('Under UK GDPR, you have the following rights:'),
      li('Right of access — you can request a copy of the personal data we hold about you'),
      li('Right to rectification — you can ask us to correct inaccurate data'),
      li('Right to erasure — you can ask us to delete your data in certain circumstances'),
      li('Right to restrict processing — you can ask us to limit how we use your data'),
      li('Right to data portability — you can request your data in a machine-readable format'),
      li('Right to object — you can object to certain types of processing, including direct marketing'),
      p('To exercise any of these rights, please contact us at contact@techconsult.com. You also have the right to lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk.'),

      h2('6. Data Security'),
      p('We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Our practices are aligned with ISO 27001 principles.'),

      h2('7. Third-Party Services'),
      p('We use the following third-party services that may process your data:'),
      li('Sanity.io — content management (data processed in the US under Standard Contractual Clauses)'),
      li('Resend — transactional email delivery'),
      li('Vercel — website hosting'),
      p('Each service is bound by appropriate data processing agreements and safeguards.'),

      h2('8. Changes to This Policy'),
      p('We may update this Privacy Policy from time to time. The date of the most recent revision is shown at the top of this page. Continued use of this website after changes constitutes acceptance of the updated policy.'),

      h2('9. Contact Us'),
      p('For any questions about this Privacy Policy or our data practices, please contact: contact@techconsult.com'),
    ],
  },

  // ── Terms of Service ─────────────────────────────────────────────────────
  {
    _type: 'legalPage',
    title: 'Terms of Service',
    slug: { _type: 'slug', current: 'terms-of-service' },
    lastUpdated: '2025-05-01',
    summary: 'These Terms of Service govern your use of the TechConsult website and the services we provide. By accessing this website, you agree to these terms.',
    body: [
      h2('1. Acceptance of Terms'),
      p('By accessing or using the TechConsult website (the "Site"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the Site.'),

      h2('2. Services'),
      p('TechConsult provides technology consulting, training, and advisory services in the areas of Artificial Intelligence, Industrial IoT, and Robotic Process Automation. The information on this Site is provided for general informational purposes and does not constitute professional advice.'),

      h2('3. Intellectual Property'),
      p('All content on this Site — including text, graphics, logos, images, and software — is the property of TechConsult or its content suppliers and is protected by UK and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.'),

      h2('4. User Conduct'),
      p('When using this Site, you agree not to:'),
      li('Use the Site for any unlawful purpose or in violation of any applicable laws'),
      li('Transmit any harmful, offensive, or disruptive content'),
      li('Attempt to gain unauthorised access to any part of the Site or its related systems'),
      li('Use automated tools to scrape, crawl, or harvest data from the Site without permission'),
      li('Impersonate any person or entity or misrepresent your affiliation with any person or entity'),

      h2('5. Contact Forms and Communications'),
      p('By submitting a contact form on this Site, you consent to TechConsult using the information you provide to respond to your enquiry. We will not use your information for unsolicited marketing without your explicit consent.'),

      h2('6. Limitation of Liability'),
      p('To the fullest extent permitted by law, TechConsult shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, this Site or its content. Our total liability for any direct damages shall not exceed £100.'),

      h2('7. Third-Party Links'),
      p('This Site may contain links to third-party websites. These links are provided for your convenience only. TechConsult does not endorse or accept responsibility for the content of third-party sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.'),

      h2('8. Governing Law'),
      p('These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.'),

      h2('9. Changes to These Terms'),
      p('We reserve the right to modify these Terms of Service at any time. The date of the most recent revision is shown at the top of this page. Your continued use of the Site after any changes constitutes your acceptance of the revised terms.'),

      h2('10. Contact'),
      p('If you have any questions about these Terms of Service, please contact us at contact@techconsult.com.'),
    ],
  },

  // ── Cookie Policy ─────────────────────────────────────────────────────────
  {
    _type: 'legalPage',
    title: 'Cookie Policy',
    slug: { _type: 'slug', current: 'cookie-policy' },
    lastUpdated: '2025-05-01',
    summary: 'This Cookie Policy explains what cookies are, how TechConsult uses them on this website, and how you can manage your cookie preferences.',
    body: [
      h2('1. What Are Cookies?'),
      p('Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners. Cookies do not contain personally identifiable information but may be linked to data we hold about you.'),

      h2('2. How We Use Cookies'),
      p('TechConsult uses cookies for the following purposes:'),

      h3('Essential Cookies'),
      p('These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting your privacy preferences or filling in forms. Without these cookies, services you have asked for cannot be provided.'),

      h3('Analytics Cookies'),
      p('We use Vercel Analytics to understand how visitors interact with our website. These cookies collect information about the number of visitors, which pages are most popular, and how users navigate the site. All data is aggregated and anonymised — no individual is identified.'),

      h3('Preference Cookies'),
      p('These cookies allow the website to remember your preferences, such as your chosen language or colour theme, and provide a more personalised experience.'),

      h2('3. Specific Cookies We Use'),
      li('__vercel_analytics — used by Vercel Analytics to track page views. Expires at the end of the session.'),
      li('theme — stores your light/dark theme preference. Expires after 1 year.'),
      li('locale — stores your language preference. Expires after 1 year.'),

      h2('4. Managing Cookies'),
      p('You can control and delete cookies through your browser settings. Please note that restricting cookies may impact your experience of the website. Most browsers allow you to:'),
      li('See what cookies are stored and delete them individually'),
      li('Block third-party cookies'),
      li('Block all cookies from being set'),
      li('Delete all cookies when you close the browser'),
      p('For more information on managing cookies, visit your browser\'s help pages or www.aboutcookies.org.'),

      h2('5. Changes to This Policy'),
      p('We may update this Cookie Policy periodically. Please check this page occasionally to ensure you are up to date with any changes.'),

      h2('6. Contact'),
      p('If you have questions about our use of cookies, please contact us at contact@techconsult.com.'),
    ],
  },

  // ── GDPR Statement ───────────────────────────────────────────────────────
  {
    _type: 'legalPage',
    title: 'GDPR Statement',
    slug: { _type: 'slug', current: 'gdpr-statement' },
    lastUpdated: '2025-05-01',
    summary: 'TechConsult is committed to compliance with UK GDPR and the Data Protection Act 2018. This statement outlines our approach to data protection and our obligations as a data controller.',
    body: [
      h2('Our Commitment'),
      p('TechConsult takes data protection seriously. As an AI and technology consultancy working with regulated industries, we understand that data governance is not optional — it is fundamental. We are committed to processing personal data lawfully, fairly, and transparently.'),

      h2('Legal Basis for Processing'),
      p('We process personal data only where we have a valid legal basis under UK GDPR:'),
      li('Consent — where you have given clear, specific, and informed consent to processing'),
      li('Contract — where processing is necessary to perform a contract with you or to take steps at your request before entering into a contract'),
      li('Legal obligation — where processing is necessary for compliance with a legal obligation'),
      li('Legitimate interests — where processing is necessary for our legitimate business interests, provided these are not overridden by your interests or rights'),

      h2('Data Controller Details'),
      p('TechConsult acts as the data controller for personal data processed through this website and in connection with our services.'),
      p('Data Controller: TechConsult'),
      p('Contact: contact@techconsult.com'),
      p('Location: Bradford, West Yorkshire, UK'),

      h2('Data Protection Principles'),
      p('In accordance with UK GDPR Article 5, we ensure that personal data is:'),
      li('Processed lawfully, fairly, and in a transparent manner'),
      li('Collected for specified, explicit, and legitimate purposes and not further processed in a way incompatible with those purposes'),
      li('Adequate, relevant, and limited to what is necessary in relation to the purposes for which it is processed'),
      li('Accurate and, where necessary, kept up to date'),
      li('Kept in a form which permits identification of data subjects for no longer than is necessary for the processing purposes'),
      li('Processed in a manner that ensures appropriate security, including protection against unauthorised or unlawful processing and accidental loss, destruction, or damage'),

      h2('Data Subject Rights'),
      p('We respect and uphold the rights of data subjects under UK GDPR, including:'),
      li('The right to be informed about how we process personal data'),
      li('The right of access to personal data we hold'),
      li('The right to rectification of inaccurate personal data'),
      li('The right to erasure ("right to be forgotten") in certain circumstances'),
      li('The right to restrict processing in certain circumstances'),
      li('The right to data portability'),
      li('The right to object to processing'),
      li('Rights related to automated decision-making and profiling'),
      p('To exercise any of these rights, please contact us at contact@techconsult.com. We will respond within 30 days.'),

      h2('Data Breach Procedures'),
      p('In the event of a personal data breach that is likely to result in a risk to the rights and freedoms of individuals, we will notify the Information Commissioner\'s Office (ICO) within 72 hours of becoming aware of the breach. Where there is a high risk to individuals, we will also notify those affected without undue delay.'),

      h2('International Data Transfers'),
      p('Where we transfer personal data outside the UK, we ensure appropriate safeguards are in place in accordance with UK GDPR Chapter V, including Standard Contractual Clauses or adequacy decisions.'),

      h2('Supervisory Authority'),
      p('The supervisory authority for data protection in the UK is the Information Commissioner\'s Office (ICO). You have the right to lodge a complaint with the ICO if you believe your data has been processed unlawfully.'),
      p('Information Commissioner\'s Office: ico.org.uk | 0303 123 1113'),
    ],
  },
]

// ── Seed ─────────────────────────────────────────────────────────────────────

async function seedLegalPages() {
  console.log('🌱 Seeding legal pages to Sanity...')

  // Delete existing
  const existing = await client.fetch<{ _id: string }[]>(`*[_type == "legalPage"]{ _id }`)
  if (existing.length > 0) {
    console.log(`  Deleting ${existing.length} existing legal page(s)...`)
    for (const doc of existing) await client.delete(doc._id)
  }

  for (const page of pages) {
    try {
      const created = await client.create(page)
      console.log(`  ✓ Created: "${page.title}" → /legal/${page.slug.current}`)
    } catch (err: any) {
      console.error(`  ✗ Failed: "${page.title}" — ${err.message}`)
    }
  }

  console.log(`\n✅ Legal pages seeded! Total: ${pages.length}`)
}

seedLegalPages().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
