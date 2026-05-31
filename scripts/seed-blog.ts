import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function block(text: string): object {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
  }
}

function h2(text: string): object {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
  }
}

function h3(text: string): object {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'h3',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
  }
}

function quote(text: string): object {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'blockquote',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
  }
}

function bullets(items: string[]): object {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'normal',
    listItem: 'bullet',
    markDefs: [],
    children: items.flatMap((item) => [
      { _type: 'span', _key: Math.random().toString(36).slice(2), text: item, marks: [] },
    ]),
  }
}

function bulletList(items: string[]): object[] {
  return items.map((item) => ({
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'normal',
    level: 1,
    listItem: 'bullet',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: item, marks: [] }],
  }))
}

const posts = [
  {
    _type: 'blogPost',
    title: 'Why the NHS Must Prioritise Explainable AI Before Scaling Deployments',
    slug: { _type: 'slug', current: 'responsible-ai-nhs' },
    category: 'Responsible AI',
    categoryColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    excerpt:
      'As machine learning models enter clinical pathways, transparency and audit trails are no longer optional. We explore the governance frameworks every health trust should have in place.',
    author: 'Bradford AI Team',
    publishedAt: '2025-05-12T09:00:00Z',
    readTime: '7 min read',
    accentFrom: 'rgba(52,211,153,0.25)',
    accentTo: 'rgba(34,211,238,0.08)',
    featured: true,
    tags: ['NHS', 'XAI', 'Governance', 'Healthcare AI'],
    body: [
      block(
        'Artificial intelligence is being deployed across NHS trusts at an unprecedented pace. From radiology triage tools to sepsis prediction models, machine learning is beginning to influence some of the most consequential clinical decisions in medicine.'
      ),
      block(
        'Yet as adoption scales, a critical gap is emerging: the gap between what AI systems do and what clinicians, patients, and regulators can actually understand about why they do it.'
      ),
      h2('The Black Box Problem in Clinical AI'),
      block(
        'Many high-performing AI systems — particularly those built on deep learning — operate as black boxes. They produce outputs without surfacing the reasoning chain that led to them. In commercial software, this is an inconvenience. In clinical settings, it is a patient safety risk.'
      ),
      block(
        'Consider a sepsis prediction model that flags a patient for urgent intervention. If the model cannot explain which vital signs, lab values, or historical patterns triggered the alert, clinicians are left with two options: trust the model blindly, or dismiss it entirely. Neither is acceptable.'
      ),
      quote(
        '"Explainability is not a nice-to-have feature — it is a prerequisite for clinical accountability." — NHS England AI Framework'
      ),
      h2('What Explainable AI (XAI) Actually Means'),
      block(
        'Explainability in AI refers to techniques and practices that make model decisions interpretable to human users. For NHS deployments, this means:'
      ),
      ...bulletList([
        'Feature importance: showing which inputs most influenced a prediction',
        'Counterfactual explanations: "if this lab value had been different, the prediction would have changed"',
        'Attention maps: for imaging models, highlighting the regions driving a diagnosis',
        'Confidence scores: communicating model uncertainty alongside predictions',
      ]),
      h2('The Regulatory Landscape'),
      block(
        'The UK AI Safety Institute, NHS England\'s AI Lab, and the Medicines and Healthcare products Regulatory Agency (MHRA) have all begun tightening requirements around AI transparency in medical devices. From 2025, high-risk AI systems used in patient care will require documented explainability mechanisms as part of their conformity assessments.'
      ),
      block(
        'Trusts that deploy AI without these mechanisms in place are not only taking clinical risks — they are creating significant regulatory and litigation exposure.'
      ),
      h2('A Practical Governance Checklist'),
      block('For NHS trusts and ICS bodies evaluating or scaling clinical AI, we recommend the following governance foundations:'),
      ...bulletList([
        'Maintain a Model Register documenting every AI system in clinical use, its purpose, training data, and performance metrics',
        'Require vendors to provide XAI documentation for any high-risk application',
        'Establish a Clinical AI Safety Board with multi-disciplinary oversight',
        'Define escalation protocols for when AI recommendations conflict with clinician judgement',
        'Conduct regular bias audits across demographic subgroups',
        'Ensure patient-facing communications disclose when AI has influenced care decisions',
      ]),
      h2('Our Recommendation'),
      block(
        'Before scaling any clinical AI deployment, NHS organisations should conduct a thorough Responsible AI assessment — evaluating explainability, fairness, data governance, and human oversight mechanisms. This is not a one-time checkbox exercise. It must be embedded into the AI lifecycle from procurement through to decommissioning.'
      ),
      block(
        'Bradford AI can support your trust in building the governance frameworks, technical documentation, and staff capability needed to deploy AI responsibly. Get in touch to discuss your needs.'
      ),
    ],
  },
  {
    _type: 'blogPost',
    title: 'From Reactive to Predictive: A Practical IIoT Maintenance Playbook',
    slug: { _type: 'slug', current: 'iiot-predictive-maintenance' },
    category: 'Industrial IoT',
    categoryColor: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
    excerpt:
      'Unplanned downtime costs manufacturers an average of $260k per hour. This step-by-step guide walks through sensor selection, edge computing, and ML model deployment for condition-based maintenance.',
    author: 'Bradford AI Team',
    publishedAt: '2025-04-28T09:00:00Z',
    readTime: '9 min read',
    accentFrom: 'rgba(34,211,238,0.22)',
    accentTo: 'rgba(99,102,241,0.08)',
    featured: false,
    tags: ['IIoT', 'Predictive Maintenance', 'Industry 4.0', 'Edge Computing'],
    body: [
      block(
        'The cost of unplanned downtime is staggering. According to Siemens, manufacturing companies lose an average of $260,000 per hour to unexpected equipment failures. For process industries — oil and gas, chemicals, pharmaceuticals — the figure is often five to ten times higher when regulatory, environmental, and safety consequences are factored in.'
      ),
      block(
        'Reactive maintenance (fix it when it breaks) and preventive maintenance (service on a fixed schedule) are no longer adequate for competitive operations. The future is predictive: using real-time sensor data and machine learning to identify failure signatures before failure occurs.'
      ),
      h2('Step 1: Identify Your Critical Assets'),
      block(
        'Not all equipment is equal. Begin by conducting a criticality assessment across your asset base. Prioritise assets that:'
      ),
      ...bulletList([
        'Have high replacement or repair costs',
        'Sit on the critical production path with no redundancy',
        'Have historically caused safety incidents when failing',
        'Exhibit failure modes that give measurable early warning signals',
      ]),
      block(
        'A typical first deployment focuses on 5–10 critical assets. This keeps scope manageable and allows you to build internal capability before scaling.'
      ),
      h2('Step 2: Sensor Selection and Instrumentation'),
      block(
        'The sensor strategy depends on the failure modes you are targeting. Common modalities include:'
      ),
      ...bulletList([
        'Vibration sensors: detect bearing wear, imbalance, and misalignment in rotating machinery',
        'Temperature sensors: identify overheating in motors, transformers, and gearboxes',
        'Current and power quality monitors: reveal electrical degradation in motors and drives',
        'Acoustic emission sensors: detect cracking and delamination in structural components',
        'Oil analysis ports: monitor lubrication quality in gearboxes and hydraulic systems',
      ]),
      h2('Step 3: Edge Computing Architecture'),
      block(
        'Raw sensor data from industrial equipment can reach gigabytes per day per asset. Sending all of this to the cloud is expensive and introduces latency that makes real-time alerting impractical.'
      ),
      block(
        'Edge computing addresses this by processing data locally — on a gateway device mounted near the equipment — and only transmitting features, anomaly scores, and alerts to the cloud. A well-designed edge architecture can reduce data transmission costs by 80–90% while enabling sub-second alert generation.'
      ),
      quote(
        '"The edge is not a cost-saving measure — it is a prerequisite for real-time industrial intelligence."'
      ),
      h2('Step 4: Building the Predictive Model'),
      block(
        'For most condition-monitoring applications, the most practical model architecture is an anomaly detection approach rather than a fault-specific classifier. This is because:'
      ),
      ...bulletList([
        'Labelled failure data is scarce — equipment rarely fails under controlled conditions',
        'Fault signatures vary between individual machines of the same type',
        'Anomaly detection can identify novel failure modes not seen in training data',
      ]),
      block(
        'Approaches such as autoencoders, isolation forests, and LSTM-based sequence models perform well on continuous sensor data. Start with a statistical baseline (mean, standard deviation, rolling averages) before moving to more complex architectures.'
      ),
      h2('Step 5: Operationalising Alerts'),
      block(
        'A predictive model that generates alerts nobody acts on delivers zero value. Operationalising the output means:'
      ),
      ...bulletList([
        'Integrating alerts into the existing CMMS (Computerised Maintenance Management System)',
        'Defining triage protocols — which alerts go to which technicians',
        'Establishing a feedback loop so technicians can confirm, close, or dismiss alerts',
        'Tracking alert-to-action lead time and maintenance outcome metrics',
      ]),
      block(
        'Our clients typically achieve ROI on IIoT predictive maintenance within 12–18 months of deployment, with the fastest results in facilities with high asset utilisation and frequent unplanned stoppages. Contact us to discuss your facility\'s specific context.'
      ),
    ],
  },
  {
    _type: 'blogPost',
    title: 'Deploying LLMs in Regulated Industries: Governance Before the API Call',
    slug: { _type: 'slug', current: 'llm-enterprise-governance' },
    category: 'AI Strategy',
    categoryColor: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20',
    excerpt:
      'Large language models can unlock enormous productivity — but regulated sectors face data residency, bias, and hallucination risks. Here is how to build guardrails before you write a single prompt.',
    author: 'Bradford AI Team',
    publishedAt: '2025-04-10T09:00:00Z',
    readTime: '11 min read',
    accentFrom: 'rgba(139,92,246,0.22)',
    accentTo: 'rgba(236,72,153,0.08)',
    featured: false,
    tags: ['LLMs', 'GenAI', 'Regulated Industries', 'AI Governance'],
    body: [
      block(
        'The arrival of large language models (LLMs) as enterprise-ready tools has created an urgent challenge for regulated industries: how to capture the productivity gains of generative AI while managing the very real risks of hallucination, data leakage, and regulatory non-compliance.'
      ),
      block(
        'In banking, healthcare, legal services, and government, the stakes are too high for a "move fast and break things" approach. The organisations that will emerge as leaders in this space are those that build governance infrastructure before they build applications.'
      ),
      h2('Why LLMs Are Different From Previous AI Deployments'),
      block(
        'Traditional predictive AI models — classifiers, regression models, recommendation systems — have well-understood failure modes. They produce numerical outputs with probability scores, and their errors are typically bounded.'
      ),
      block(
        'LLMs are fundamentally different. They generate natural language outputs that can be fluent, authoritative, and completely wrong. This phenomenon — hallucination — is not a bug to be patched; it is an inherent property of how these models work. In a regulated context, a confident but incorrect LLM response about a regulatory requirement, a drug interaction, or a legal clause is not just unhelpful — it is a liability.'
      ),
      h2('The Four Governance Pillars'),
      h3('1. Data Residency and Confidentiality'),
      block(
        'Before integrating any LLM API, map exactly what data will be sent to the model. For regulated sectors, this means:'
      ),
      ...bulletList([
        'Identifying whether any personally identifiable information (PII) or special category data could appear in prompts',
        'Understanding where the API provider processes and stores data',
        'Reviewing whether the provider\'s terms allow data to be used for model training',
        'Assessing whether on-premises or private cloud deployment is required for sensitive workloads',
      ]),
      h3('2. Hallucination Mitigation'),
      block(
        'No governance framework can eliminate hallucination, but it can contain its impact. Effective mitigation strategies include:'
      ),
      ...bulletList([
        'Retrieval-Augmented Generation (RAG): grounding model responses in a curated, verified knowledge base',
        'Output validation layers: programmatic checks against known facts, regulatory databases, or structured data sources',
        'Confidence scoring: where models express uncertainty rather than generating confident-sounding responses',
        'Human-in-the-loop requirements for high-stakes outputs',
      ]),
      h3('3. Audit Trails and Explainability'),
      block(
        'Regulated organisations need to be able to answer: "What did the AI say, to whom, based on what input, and when?" This requires:'
      ),
      ...bulletList([
        'Logging every prompt and response with timestamps and user identifiers',
        'Immutable audit log storage with appropriate retention periods',
        'Mechanisms for users to flag and report problematic outputs',
        'Documented review processes for high-risk use cases',
      ]),
      h3('4. Access Control and Misuse Prevention'),
      block(
        'LLMs can be prompted to bypass their intended constraints through adversarial inputs. For enterprise deployments:'
      ),
      ...bulletList([
        'Implement system-level prompt injection defences',
        'Define and enforce permissible use cases through role-based access',
        'Monitor for prompt patterns associated with policy violations',
        'Establish clear acceptable use policies with staff training',
      ]),
      quote(
        '"The question is not whether to deploy generative AI — it is whether you have the governance infrastructure to do so safely."'
      ),
      h2('A Practical Starting Point'),
      block(
        'For regulated organisations considering their first LLM deployment, we recommend starting with an internal-facing, low-risk use case — such as document summarisation for internal policy documents or FAQ generation from approved knowledge bases. This allows you to build governance processes, test monitoring tools, and develop staff competency before exposing LLM capabilities to customer-facing or high-stakes workflows.'
      ),
      block(
        'Bradford AI offers structured LLM readiness assessments that evaluate your data infrastructure, risk tolerance, and governance maturity — and produce a prioritised roadmap for safe LLM adoption.'
      ),
    ],
  },
  {
    _type: 'blogPost',
    title: 'Measuring RPA ROI in Local Government: Beyond FTE Savings',
    slug: { _type: 'slug', current: 'rpa-roi-public-sector' },
    category: 'RPA',
    categoryColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    excerpt:
      'Process automation in councils is often evaluated on headcount reduction alone. We make the case for a broader value framework — compliance, citizen satisfaction, and audit readiness.',
    author: 'Bradford AI Team',
    publishedAt: '2025-03-18T09:00:00Z',
    readTime: '6 min read',
    accentFrom: 'rgba(245,158,11,0.22)',
    accentTo: 'rgba(239,68,68,0.08)',
    featured: false,
    tags: ['RPA', 'Public Sector', 'ROI', 'Local Government'],
    body: [
      block(
        'When local councils evaluate Robotic Process Automation, the conversation almost always gravitates toward one metric: Full-Time Equivalent (FTE) savings. How many staff hours will automation replace? What is the payback period if we can redeploy X members of staff?'
      ),
      block(
        'This framing is understandable — budgets are under pressure and elected members want to see clear financial returns. But it is also dangerously narrow. It misses the most significant value that RPA can deliver to public sector organisations.'
      ),
      h2('The Hidden Costs RPA Actually Addresses'),
      h3('Compliance Risk and Regulatory Exposure'),
      block(
        'Manual processes in high-volume, rules-based back-office functions carry inherent compliance risk. Council tax processing, benefits administration, planning application acknowledgements, and housing benefit calculations are all subject to statutory deadlines and error rate tolerances.'
      ),
      block(
        'A software robot executes the same process the same way, every time, with a complete audit trail. When a compliance review or ombudsman investigation occurs, automated processes are dramatically easier to audit than manual ones. The cost of a single significant compliance failure — in staff time, legal costs, and reputational damage — can exceed the entire annual cost of an RPA deployment.'
      ),
      h3('Citizen Satisfaction and Service Quality'),
      block(
        'Public sector RPA has a direct impact on the citizen experience that is rarely quantified in business cases:'
      ),
      ...bulletList([
        'Faster processing of applications and requests reduces citizen waiting time',
        'Elimination of manual errors reduces the volume of complaints and appeals',
        'Consistent communication and acknowledgement improves citizen confidence',
        '24/7 processing capability reduces backlogs that build up overnight and over weekends',
      ]),
      quote(
        '"The true return on automation in the public sector is measured in better outcomes for citizens, not just lower headcount." — Local Government Association'
      ),
      h3('Staff Wellbeing and Retention'),
      block(
        'High-volume, repetitive administrative tasks are among the lowest-satisfaction activities in local government. Staff turnover in processing roles is high, and the cost of recruitment, onboarding, and training is rarely captured in automation business cases. Freeing staff from repetitive work to focus on complex cases, citizen interaction, and decision-making typically improves both satisfaction and retention.'
      ),
      h2('Building a Comprehensive RPA Business Case'),
      block('An effective public sector RPA business case should quantify:'),
      ...bulletList([
        'Direct time savings: hours recovered across all affected roles',
        'Error reduction: current error rates, rework costs, and complaint volumes',
        'Compliance value: reduction in regulatory risk and audit preparation time',
        'Citizen value: processing time improvements and satisfaction metric changes',
        'Staff redeployment: higher-value activities staff can focus on',
        'Scalability: ability to handle volume spikes without additional resource',
      ]),
      h2('Where to Start'),
      block(
        'The highest-value starting points for council RPA deployments are typically: council tax exemption processing, housing benefits change of circumstances, freedom of information request triage, and planning application acknowledgement and validation. These combine high volume, clear rules, and measurable compliance requirements.'
      ),
      block(
        'Bradford AI has supported multiple local authorities in building robust RPA business cases and deploying automation with governance frameworks appropriate for the public sector context. Contact us to discuss your council\'s automation priorities.'
      ),
    ],
  },
  {
    _type: 'blogPost',
    title: 'The SME Data Strategy Checklist: 8 Things to Fix Before You Touch AI',
    slug: { _type: 'slug', current: 'data-strategy-sme' },
    category: 'Data Strategy',
    categoryColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    excerpt:
      'AI initiatives built on poor data foundations are doomed to fail. This checklist helps small and medium enterprises audit data quality, ownership, and pipelines before investing in ML.',
    author: 'Bradford AI Team',
    publishedAt: '2025-03-05T09:00:00Z',
    readTime: '5 min read',
    accentFrom: 'rgba(59,130,246,0.22)',
    accentTo: 'rgba(16,185,129,0.08)',
    featured: false,
    tags: ['Data Strategy', 'SME', 'Data Quality', 'AI Readiness'],
    body: [
      block(
        '"We want to use AI to improve X" is one of the most common conversations we have with SME leadership teams. It is usually followed, within a few questions, by the discovery that the data needed to power that AI does not exist in usable form, is scattered across incompatible systems, or has never been collected consistently.'
      ),
      block(
        'The uncomfortable truth is that most AI projects fail not because of problems with the AI — but because of problems with the data. Before you invest in a data science team, an ML platform, or an AI vendor, work through this checklist.'
      ),
      h2('The 8-Point AI Data Readiness Checklist'),
      h3('1. Do you know what data you have?'),
      block(
        'This sounds obvious, but many SMEs have data scattered across ERP systems, spreadsheets, email chains, paper records, and third-party platforms with no consolidated data inventory. Start by documenting every significant data source: what it contains, who owns it, how often it is updated, and what format it is in.'
      ),
      h3('2. Is your data captured consistently?'),
      block(
        'Inconsistent data entry is the silent killer of AI projects. If the same field is populated with free text in one period and a dropdown in another, if dates are entered in multiple formats, or if mandatory fields are routinely left blank, you have a data quality problem that must be fixed before AI training begins.'
      ),
      h3('3. Do you have enough historical data?'),
      block(
        'Most supervised machine learning models require hundreds to thousands of labelled examples to learn effectively. If you have 18 months of transaction history but want to predict seasonal demand 24 months ahead, you probably do not have enough data yet. Understand the minimum data requirements for your target AI use case before committing.'
      ),
      h3('4. Is data ownership clearly assigned?'),
      block(
        'Data without an owner gets stale, inconsistent, and ungoverned. Every significant data source should have a named individual responsible for its quality, accuracy, and currency. This is particularly important for AI training data that will be refreshed over time.'
      ),
      h3('5. Is your data accessible programmatically?'),
      block(
        'AI systems need data to flow automatically — not through manual exports. If accessing your operational data requires a human to run a report and email a CSV, your data infrastructure is not AI-ready. Modern AI pipelines require API access or direct database connectivity.'
      ),
      h3('6. Have you addressed PII and data protection?'),
      block(
        'If your AI use case involves personal data — customer records, employee data, patient information — you must ensure your data collection, processing, and model training practices comply with UK GDPR. Failure to do so is not just a regulatory risk; it can force an AI project to be shut down mid-implementation.'
      ),
      h3('7. Can you label your training data?'),
      block(
        'Supervised learning requires labelled examples: inputs paired with the correct outputs. For an SME, this often means a subject matter expert manually reviewing and classifying historical records. Budget for this effort — it is typically the most time-consuming part of an ML project and is frequently underestimated.'
      ),
      h3('8. Do you have baseline performance metrics?'),
      block(
        'How will you know if your AI system is working? Define the metrics you will use to evaluate AI performance before you deploy. Without a baseline, you cannot demonstrate improvement, and you cannot identify when model performance degrades over time.'
      ),
      quote(
        '"Every hour spent on data infrastructure before the AI project starts saves three hours of debugging after it launches."'
      ),
      block(
        'Bradford AI offers Data Readiness Assessments for SMEs considering their first AI investment. We evaluate your data infrastructure against the specific requirements of your target use case and produce a prioritised remediation plan. Get in touch to start the conversation.'
      ),
    ],
  },
  {
    _type: 'blogPost',
    title: 'EU AI Act Readiness: What UK Organisations Still Need to Do in 2025',
    slug: { _type: 'slug', current: 'ai-act-readiness' },
    category: 'AI Governance',
    categoryColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
    excerpt:
      'Despite Brexit, many UK companies supply EU markets or operate EU subsidiaries — making AI Act compliance unavoidable. Here is a practical readiness roadmap for legal and technical teams.',
    author: 'Bradford AI Team',
    publishedAt: '2025-02-20T09:00:00Z',
    readTime: '10 min read',
    accentFrom: 'rgba(244,63,94,0.22)',
    accentTo: 'rgba(251,191,36,0.08)',
    featured: false,
    tags: ['EU AI Act', 'AI Governance', 'Compliance', 'Regulation'],
    body: [
      block(
        'The EU AI Act — the world\'s first comprehensive legal framework for artificial intelligence — is now in force, with high-risk AI system requirements phasing in through 2025 and 2026. For UK organisations, the assumption that Brexit means exemption is dangerously wrong.'
      ),
      block(
        'Any AI system placed on the EU market, used by EU citizens, or operated by an EU-based subsidiary is within scope. For UK technology companies, professional services firms, and regulated industries with European operations, compliance is not optional.'
      ),
      h2('Understanding the Risk Classification System'),
      block(
        'The AI Act categorises AI systems by risk level, with different compliance obligations at each tier:'
      ),
      ...bulletList([
        'Unacceptable risk: prohibited outright (social scoring, real-time biometric surveillance in public spaces)',
        'High risk: strict conformity assessment, transparency, and documentation requirements',
        'Limited risk: transparency obligations (e.g., chatbots must disclose they are AI)',
        'Minimal risk: no mandatory requirements, though voluntary codes of conduct apply',
      ]),
      block(
        'High-risk categories include AI used in: recruitment and employment decisions, credit scoring and insurance underwriting, educational assessment, critical infrastructure management, law enforcement, and medical devices.'
      ),
      h2('The High-Risk Compliance Requirements'),
      block(
        'For organisations deploying high-risk AI, the Act requires:'
      ),
      ...bulletList([
        'A comprehensive risk management system documented and maintained throughout the AI lifecycle',
        'Training data governance with documented quality criteria and bias assessment',
        'Technical documentation sufficient for a conformity assessment',
        'Automatic logging of all AI decisions that could affect individuals',
        'Transparency to deploying organisations about the AI system\'s capabilities and limitations',
        'Human oversight measures ensuring AI decisions can be reviewed and overridden',
        'Accuracy, robustness, and cybersecurity measures appropriate to the risk level',
      ]),
      h2('The Readiness Gap for UK Organisations'),
      block(
        'Our assessment of UK organisations in AI Act scope reveals consistent gaps across four areas:'
      ),
      h3('Documentation'),
      block(
        'Most organisations lack the systematic technical documentation the Act requires. Model cards, data sheets, risk assessments, and conformity declarations need to be created for every high-risk AI system — and maintained as systems evolve.'
      ),
      h3('Data Governance'),
      block(
        'Training data quality and representativeness requirements go beyond current GDPR practice. Organisations need documented processes for assessing and addressing bias in training datasets.'
      ),
      h3('Human Oversight'),
      block(
        'Many AI deployments lack the operational procedures to ensure meaningful human review of high-stakes decisions. Implementing effective human-in-the-loop mechanisms requires both technical and process redesign.'
      ),
      h3('Supplier Management'),
      block(
        'Organisations using AI from third-party vendors are responsible for ensuring those vendors\' systems comply. Existing supplier contracts rarely address AI Act obligations.'
      ),
      h2('A Practical Readiness Roadmap'),
      block('We recommend UK organisations approach AI Act readiness in three phases:'),
      ...bulletList([
        'Phase 1 — Inventory and Classification (1–2 months): Identify all AI systems in use or under development and classify them against the Act\'s risk taxonomy',
        'Phase 2 — Gap Assessment (2–3 months): For each high-risk system, assess current documentation, governance, and technical practices against Act requirements',
        'Phase 3 — Remediation (3–12 months): Implement required technical measures, governance processes, and documentation, with priority on highest-risk systems',
      ]),
      quote(
        '"The organisations that treat the EU AI Act as a compliance burden will always be behind. Those that treat it as a governance framework will build better AI."'
      ),
      block(
        'Bradford AI provides AI Act readiness assessments, gap analysis, and implementation support for UK organisations in scope. Our team combines legal, technical, and governance expertise to help you build compliant AI systems — not just documentation. Contact us to discuss your readiness.'
      ),
    ],
  },
]

async function seedBlogPosts() {
  console.log('🌱 Seeding blog posts to Sanity...')

  // Delete existing blog posts first
  const existingSlugs = await client.fetch<{ _id: string }[]>(
    `*[_type == "blogPost"]{ _id }`
  )
  if (existingSlugs.length > 0) {
    console.log(`  Deleting ${existingSlugs.length} existing blog post(s)...`)
    for (const doc of existingSlugs) {
      await client.delete(doc._id)
    }
  }

  for (const post of posts) {
    try {
      const created = await client.create(post)
      console.log(`  ✓ Created: "${post.title}" → ${created._id}`)
    } catch (err: any) {
      console.error(`  ✗ Failed: "${post.title}" — ${err.message}`)
    }
  }

  console.log('\n✅ Blog posts seeded successfully!')
  console.log(`   Total: ${posts.length} posts`)
}

seedBlogPosts().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
