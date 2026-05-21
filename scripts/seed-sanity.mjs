import { createClient } from '@sanity/client'
import 'dotenv/config'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-05-21',
})

const trainingModules = [
  // ── AI ──
  {
    _type: 'trainingModule',
    id: 'python-fundamentals',
    title: 'Python Fundamentals for AI',
    category: 'ai',
    duration: '4 weeks',
    level: 'Beginner',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    contentType: 'days',
    days: [
      { day: 1, title: 'Introduction to Python & Setup', topics: ['Variables, Data Types', 'Control Flow (if, for, while)', 'Functions & Modules'] },
      { day: 2, title: 'Data Structures & OOP', topics: ['Lists, Dictionaries, Sets', 'Classes and Objects', 'Error Handling'] },
      { day: 3, title: 'Data Manipulation', topics: ['NumPy Basics', 'Pandas DataFrames', 'Data Cleaning'] },
      { day: 4, title: 'Mini Project', topics: ['Building a simple CLI tool', 'Code Review', 'Best Practices'] },
    ],
  },
  {
    _type: 'trainingModule',
    id: 'ml-hands-on',
    title: 'ML Hands-on with Scikit-learn',
    category: 'ai',
    duration: '6 weeks',
    level: 'Intermediate',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    contentType: 'days',
    days: [
      { day: 1, title: 'Supervised Learning', topics: ['Linear Regression', 'Logistic Regression', 'Model Evaluation'] },
      { day: 2, title: 'Tree-based Models', topics: ['Decision Trees', 'Random Forests', 'XGBoost'] },
      { day: 3, title: 'Unsupervised Learning', topics: ['K-Means Clustering', 'PCA', 'Anomaly Detection'] },
      { day: 4, title: 'Capstone Project', topics: ['End-to-end ML Pipeline', 'Model Deployment Basics', 'Presentation'] },
    ],
  },
  {
    _type: 'trainingModule',
    id: 'advanced-data-analytics',
    title: 'Advanced Python & Data Analytics',
    category: 'ai',
    duration: '5 weeks',
    level: 'Advanced',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    contentType: 'days',
    days: [
      { day: 1, title: 'Advanced Pandas', topics: ['Complex Merges', 'Window Functions', 'Performance Tuning'] },
      { day: 2, title: 'Data Visualization', topics: ['Matplotlib & Seaborn', 'Plotly Interactive Graphs', 'Dashboarding'] },
      { day: 3, title: 'Time Series Analysis', topics: ['Handling Dates', 'Moving Averages', 'ARIMA Basics'] },
      { day: 4, title: 'Real-world Analytics', topics: ['A/B Testing Analysis', 'Customer Segmentation', 'Final Project'] },
    ],
  },

  // ── IIoT ──
  {
    _type: 'trainingModule',
    id: 'data-management',
    title: 'Data Management & Infrastructure',
    category: 'iiot',
    duration: '3 weeks',
    level: 'Beginner',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    contentType: 'overview',
    overview: {
      description: 'Understanding the backbone of IIoT. Learn how data is collected from sensors, stored, and managed securely in industrial environments.',
      noCodingNote: 'No Coding Required - Focus on architecture and concepts.',
      calloutTitle: 'Why Data Management Matters',
      benefits: [
        { iconName: 'Factory', title: 'Data Integration', stat: '100%', desc: 'Unified view of operations' },
        { iconName: 'ShieldCheck', title: 'Security', stat: 'Enterprise', desc: 'Secure data pipelines' }
      ],
      useCases: [
        { iconName: 'CheckCircle2', title: 'Centralized Logging', outcome: 'Single source of truth for all machines' },
        { iconName: 'CheckCircle2', title: 'Edge to Cloud', outcome: 'Efficient data transfer and storage' }
      ],
      topics: ['Data Lakes vs Warehouses', 'MQTT & OPC UA Protocols', 'Data Security Basics', 'Cloud vs Edge Computing']
    }
  },
  {
    _type: 'trainingModule',
    id: 'iiot-implementation',
    title: 'IIoT Implementation Strategy',
    category: 'iiot',
    duration: '5 weeks',
    level: 'Intermediate',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    contentType: 'overview',
    overview: {
      description: 'A strategic guide for managers and leaders on how to plan, pilot, and scale IIoT solutions across manufacturing plants without getting bogged down in code.',
      noCodingNote: 'No Coding Required - Tailored for Business Leaders & Project Managers.',
      calloutTitle: 'Business Impact of IIoT',
      benefits: [
        { iconName: 'TrendingUp', title: 'Efficiency', stat: '+25%', desc: 'Increase in OEE' },
        { iconName: 'BarChart3', title: 'ROI', stat: '6 Months', desc: 'Average payback period' }
      ],
      useCases: [
        { iconName: 'CheckCircle2', title: 'Predictive Maintenance', outcome: 'Reduce unplanned downtime by 40%' },
        { iconName: 'CheckCircle2', title: 'Energy Management', outcome: 'Cut energy costs by 15% through smart monitoring' }
      ],
      topics: ['Vendor Selection', 'ROI Calculation', 'Change Management', 'Scaling from Pilot to Plant']
    }
  },

  // ── RPA ──
  {
    _type: 'trainingModule',
    id: 'responsible-llm',
    title: 'Using LLM Reasonably',
    category: 'rpa',
    duration: '2 weeks',
    level: 'All Levels',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    contentType: 'overview',
    overview: {
      description: 'Learn how to integrate Large Language Models (LLMs) into your daily workflows safely, ethically, and effectively.',
      noCodingNote: 'No Coding Required - Perfect for all office workers.',
      calloutTitle: 'Safe AI Adoption',
      benefits: [
        { iconName: 'ShieldCheck', title: 'Data Privacy', stat: '100%', desc: 'Compliant AI usage' },
        { iconName: 'Zap', title: 'Productivity', stat: 'x2', desc: 'Faster task completion' }
      ],
      useCases: [
        { iconName: 'CheckCircle2', title: 'Document Summarization', outcome: 'Process 100-page reports in seconds' },
        { iconName: 'CheckCircle2', title: 'Email Drafting', outcome: 'Automate routine communications securely' }
      ],
      topics: ['AI Hallucinations', 'Data Privacy Policies', 'Choosing the right LLM', 'Ethical AI Use']
    }
  },
  {
    _type: 'trainingModule',
    id: 'prompt-engineering',
    title: 'Prompt Engineering Masterclass',
    category: 'rpa',
    duration: '3 weeks',
    level: 'Intermediate',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    contentType: 'days',
    days: [
      { day: 1, title: 'Prompting Basics', topics: ['Zero-shot vs Few-shot', 'Clarity and Context', 'System Prompts'] },
      { day: 2, title: 'Advanced Techniques', topics: ['Chain of Thought', 'Tree of Thoughts', 'Prompt Chaining'] },
      { day: 3, title: 'Domain Specific Prompts', topics: ['Coding Prompts', 'Creative Writing', 'Data Extraction'] },
      { day: 4, title: 'Evaluation & Refinement', topics: ['Testing Prompts', 'Iterative Refinement', 'Building a Prompt Library'] },
    ]
  },
  {
    _type: 'trainingModule',
    id: 'vibe-coding',
    title: 'AI-Native Vibe Coding',
    category: 'rpa',
    duration: '4 weeks',
    level: 'Advanced',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    contentType: 'overview',
    overview: {
      description: 'The future of software development. Learn how to build applications by directing AI agents through natural language instead of writing syntax.',
      noCodingNote: 'Natural Language Coding - Describe what you want, AI builds it.',
      calloutTitle: 'Rapid Prototyping',
      benefits: [
        { iconName: 'Zap', title: 'Speed', stat: '10x', desc: 'Faster time to market' },
        { iconName: 'Users', title: 'Accessibility', stat: '100%', desc: 'Anyone can build apps' }
      ],
      useCases: [
        { iconName: 'CheckCircle2', title: 'Internal Tools', outcome: 'Build admin dashboards in hours' },
        { iconName: 'CheckCircle2', title: 'Automated Scripts', outcome: 'Generate complex automation workflows easily' }
      ],
      topics: ['Agentic Workflows', 'Cursor & Copilot Advanced Use', 'Debugging AI Code', 'System Architecture via Prompts']
    }
  }
]

const projects = [
  {
    _type: 'project',
    id: 'smart-factory',
    title: 'Smart Factory Transformation',
    client: 'Global Manufacturing Corp',
    category: 'iiot',
    categoryColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description: 'Implemented a comprehensive IIoT solution reducing downtime by 40% and increasing production efficiency by 25%.',
    metrics: [
      { _key: '1', value: '40%',  label: 'Downtime Reduction' },
      { _key: '2', value: '25%',  label: 'Efficiency Increase' },
      { _key: '3', value: '$2M',  label: 'Annual Savings' },
    ],
    gradientFrom: 'rgba(52,211,153,0.25)',
    gradientTo:   'rgba(34,211,238,0.10)',
    accentColor:  '#34d399',
    iconLabel:    'IIoT',
    fullDescription: 'A complete digital transformation of a 50-year-old manufacturing facility, bringing Industry 4.0 capabilities to legacy equipment through strategic IoT sensor deployment and real-time analytics.',
    challenge: 'The client faced significant production losses due to unexpected equipment failures and inefficient maintenance schedules. Their legacy systems lacked visibility into machine health and performance metrics.',
    solution: 'We deployed over 500 IoT sensors across critical machinery, implemented edge computing for real-time data processing, and built a centralized dashboard for predictive maintenance alerts. Machine learning models were trained on historical data to predict failures 72 hours in advance.',
    results: [
      'Reduced unplanned downtime by 40%',
      'Increased overall equipment effectiveness (OEE) by 25%',
      'Achieved $2M in annual cost savings',
      'Reduced maintenance costs by 30%',
      'Improved worker safety with real-time hazard detection',
    ],
    technologies: ['Azure IoT Hub', 'Apache Kafka', 'TensorFlow', 'Power BI', 'Edge Computing'],
  },
  {
    _type: 'project',
    id: 'ai-customer-service',
    title: 'AI-Powered Customer Service',
    client: 'FinTech Solutions Ltd',
    category: 'ai',
    categoryColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Deployed conversational AI handling 80% of customer inquiries automatically with 95% satisfaction rate.',
    metrics: [
      { _key: '1', value: '80%', label: 'Automation Rate' },
      { _key: '2', value: '95%', label: 'Satisfaction Score' },
      { _key: '3', value: '60%', label: 'Cost Reduction' },
    ],
    gradientFrom: 'rgba(96,165,250,0.25)',
    gradientTo:   'rgba(34,211,238,0.10)',
    accentColor:  '#60a5fa',
    iconLabel:    'AI',
    fullDescription: 'An intelligent customer service platform combining natural language processing, sentiment analysis, and multi-channel support to deliver exceptional customer experiences at scale.',
    challenge: 'The financial services company was struggling with high call volumes, long wait times, and inconsistent service quality. Customer satisfaction scores were declining, and operational costs were increasing.',
    solution: 'We developed a multi-channel AI assistant using advanced NLP models, integrated with their existing CRM and knowledge base. The system handles complex financial queries, performs secure account lookups, and seamlessly escalates to human agents when needed.',
    results: [
      'Automated 80% of routine customer inquiries',
      'Achieved 95% customer satisfaction rating',
      'Reduced support costs by 60%',
      'Decreased average response time from 15 minutes to 30 seconds',
      'Enabled 24/7 customer support availability',
    ],
    technologies: ['OpenAI GPT-4', 'LangChain', 'Pinecone', 'Twilio', 'Salesforce Integration'],
  },
  {
    _type: 'project',
    id: 'enterprise-rpa',
    title: 'Enterprise Process Automation',
    client: 'Healthcare Systems Inc',
    category: 'rpa',
    categoryColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    description: 'Automated 200+ business processes saving 50,000 hours annually across multiple departments.',
    metrics: [
      { _key: '1', value: '200+', label: 'Processes Automated' },
      { _key: '2', value: '50K',  label: 'Hours Saved/Year' },
      { _key: '3', value: '99.9%', label: 'Accuracy Rate' },
    ],
    gradientFrom: 'rgba(251,146,60,0.25)',
    gradientTo:   'rgba(245,158,11,0.10)',
    accentColor:  '#fb923c',
    iconLabel:    'RPA',
    fullDescription: 'A comprehensive robotic process automation implementation that transformed back-office operations across finance, HR, and patient services in a major healthcare network.',
    challenge: 'The healthcare organization was burdened by manual, repetitive processes across departments — leading to errors, delays, and staff burnout. Claims processing alone required 40 FTEs and had a 5% error rate.',
    solution: 'We conducted process mining to identify automation opportunities, designed and deployed 200+ RPA bots using UiPath, and implemented an intelligent orchestration layer. Bots handle everything from claims processing to employee onboarding.',
    results: [
      'Automated 200+ business processes',
      'Saved 50,000 work hours annually',
      'Achieved 99.9% accuracy rate',
      'Reduced claims processing time by 75%',
      'Freed up 35 FTEs for higher-value work',
    ],
    technologies: ['UiPath', 'Process Mining', 'OCR', 'Azure Functions', 'SQL Server'],
  },
]

const team = [
  {
    _type: 'teamMember',
    name: 'Dr. Sarah Chen',
    role: 'CEO & AI Lead',
    bio: '15+ years in AI research. Former Google AI researcher with expertise in deep learning and NLP.',
    gradientFrom: 'rgba(96,165,250,0.30)',
    gradientTo: 'rgba(34,211,238,0.15)',
    accentColor: '#60a5fa',
    initials: 'SC',
    linkedin: '#',
    twitter: '#',
  },
  {
    _type: 'teamMember',
    name: 'Michael Rodriguez',
    role: 'CTO & IIoT Director',
    bio: 'Industrial automation expert. Led digital transformation projects for Fortune 500 manufacturers.',
    gradientFrom: 'rgba(52,211,153,0.30)',
    gradientTo: 'rgba(20,184,166,0.15)',
    accentColor: '#34d399',
    initials: 'MR',
    linkedin: '#',
    twitter: '#',
  },
  {
    _type: 'teamMember',
    name: 'Emily Watson',
    role: 'Head of Automation',
    bio: 'RPA pioneer. Architected enterprise-scale automation solutions saving clients millions annually.',
    gradientFrom: 'rgba(251,146,60,0.30)',
    gradientTo: 'rgba(245,158,11,0.15)',
    accentColor: '#fb923c',
    initials: 'EW',
    linkedin: '#',
    twitter: '#',
  }
]

async function seed() {
  try {
    console.log('Seeding Training Modules...')
    for (const doc of trainingModules) {
      await client.create(doc)
    }
    
    console.log('Seeding Projects...')
    for (const doc of projects) {
      await client.create(doc)
    }

    console.log('Seeding Team Members...')
    for (const doc of team) {
      await client.create(doc)
    }

    console.log('Successfully seeded all data!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed()
