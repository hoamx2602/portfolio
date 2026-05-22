import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadImage(imagePath) {
  try {
    const fullPath = path.resolve(process.cwd(), 'public', imagePath.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      console.warn(`[!] Image not found: ${fullPath}`);
      return null;
    }
    console.log(`Uploading image: ${imagePath}...`);
    const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
      filename: path.basename(fullPath),
    });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

const modulesData = [
  {
    category: 'iiot',
    title: 'IIoT Implementation',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    thumbnail: '/iiot-edge-architecture.png',
    contentType: 'overview',
    overview: {
      description: 'A practical, business-focused programme that equips operational managers, engineers, and decision-makers with the knowledge to plan, deploy, and govern Industrial IoT solutions — without writing a single line of code.',
      noCodingNote: 'Designed for operations leaders, plant managers, and business stakeholders. You will work with real industrial dashboards and configure live sensor streams hands-on — all through visual, no-code tools.',
      calloutTitle: 'No Coding Required',
      benefits: [
        { iconName: 'TrendingUp', title: 'Reduce Operational Costs', stat: 'Up to 25% savings', desc: 'Identify inefficiencies and automate data collection to cut labour and maintenance spend.' },
        { iconName: 'ShieldCheck', title: 'Prevent Costly Downtime', stat: 'Up to 40% fewer failures', desc: 'Use real-time sensor data and predictive alerts to act before equipment breaks down.' },
        { iconName: 'BarChart', title: 'Data-Driven Decisions', stat: 'Live operational dashboards', desc: 'Replace gut-feel with real-time visibility across every machine, line, and facility.' },
        { iconName: 'Zap', title: 'Accelerate Digital Transformation', stat: 'Industry 4.0 readiness', desc: 'Build internal capability to lead IIoT projects and evaluate vendor proposals confidently.' },
      ],
      useCases: [
        { iconName: 'Factory', title: 'Smart Manufacturing', outcome: 'Reduced scrap rate by 18% through real-time quality monitoring on the production line.' },
        { iconName: 'Wifi', title: 'Connected Asset Tracking', outcome: 'Achieved 99.2% asset visibility across 3 sites — with zero IT dependency.' },
        { iconName: 'TrendingUp', title: 'Predictive Maintenance', outcome: 'Cut unplanned downtime by 35% within 6 months of deployment.' },
        { iconName: 'BarChart', title: 'Energy Monitoring', outcome: 'Identified £120k/yr in energy waste through automated consumption tracking.' },
      ],
      topics: [
        'IIoT architecture & sensor ecosystems',
        'Connecting machines to the cloud (no coding)',
        'Building live operational dashboards',
        'Predictive maintenance fundamentals',
        'Data security & industrial protocols',
        'Evaluating IIoT vendors & platforms',
        'Business case & ROI calculation',
        'Governance, compliance & change management',
      ],
      gallery: [
        { src: '/iiot-sensor-lab.png', caption: 'Hands-On Sensor Lab' },
        { src: '/iiot-dashboard.png', caption: 'Live Factory Dashboard' },
        { src: '/iiot-predictive-maintenance.png', caption: 'Predictive Maintenance Analytics' },
        { src: '/iiot-edge-architecture.png', caption: 'IIoT Architecture Workshop' },
      ],
    }
  },
  {
    category: 'ai',
    title: 'Python Fundamentals',
    duration: '5 days',
    level: 'Beginner',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    thumbnail: '/thumb-python.png',
    contentType: 'days',
    days: [
      { day: 1, title: 'Python Basics', topics: ['Variables & Data Types', 'Control Flow', 'Functions'] },
      { day: 2, title: 'Data Structures', topics: ['Lists & Tuples', 'Dictionaries', 'Sets'] },
      { day: 3, title: 'Object-Oriented Programming', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism'] },
      { day: 4, title: 'File Handling & Modules', topics: ['File I/O', 'Exception Handling', 'Custom Modules'] },
      { day: 5, title: 'Python for Data Science', topics: ['NumPy Basics', 'Pandas Introduction', 'Data Visualization with Matplotlib'] },
    ],
  },
  {
    category: 'ai',
    title: 'Machine Learning Hands-On',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    thumbnail: '/thumb-ml.png',
    contentType: 'overview',
    overview: {
      description: 'A practical, code-first deep dive into building, training, and deploying Machine Learning models. Master supervised and unsupervised learning, evaluate model performance, and bridge the gap from prototype to scalable production pipelines.',
      benefits: [
        { iconName: 'Zap', title: 'Fast ML Implementation', stat: 'Quick deployment', desc: 'Rapidly train, test, and deploy powerful regression and classification models.' },
        { iconName: 'BarChart', title: 'Reduce Error Rates', stat: 'Higher precision', desc: 'Master feature engineering and hyperparameter tuning to boost model accuracy.' },
        { iconName: 'Factory', title: 'Production Readiness', stat: 'Robust deployment', desc: 'Learn to serialize, package, and serve your models via highly available APIs.' },
        { iconName: 'TrendingUp', title: 'Unlock Hidden Patterns', stat: 'Data discovery', desc: 'Apply clustering algorithms like K-Means and PCA to find insights in unlabeled data.' },
      ],
      useCases: [
        { iconName: 'ShieldCheck', title: 'Fraud Detection', outcome: 'Implemented a robust classification pipeline to automatically flag anomalous transactions.' },
        { iconName: 'TrendingUp', title: 'Dynamic Pricing', outcome: 'Deployed a regression model that optimized e-commerce pricing in real-time.' },
        { iconName: 'Wifi', title: 'Customer Segmentation', outcome: 'Used K-Means clustering to create highly targeted, personalized marketing campaigns.' },
        { iconName: 'BarChart', title: 'Churn Prediction', outcome: 'Built a Random Forest model that successfully reduced customer churn by 15%.' },
      ],
      topics: [
        'Supervised vs Unsupervised Learning',
        'Regression & Classification Algorithms',
        'Model Evaluation & Metrics (Accuracy, F1, ROC)',
        'Feature Engineering & Data Preprocessing',
        'Hyperparameter Tuning (Grid & Random Search)',
        'Dimensionality Reduction (PCA)',
        'Model Serialization (Pickle/Joblib)',
        'Deploying ML Models as REST APIs',
      ],
    }
  },
  {
    category: 'ai',
    title: 'Advanced Python & Data Analytics',
    duration: '5 days',
    level: 'Advanced',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    thumbnail: '/thumb-data-analytics.png',
    contentType: 'days',
    days: [
      { day: 1, title: 'Advanced Pandas', topics: ['MultiIndex', 'Time Series Analysis', 'Data Aggregation'] },
      { day: 2, title: 'Data Visualization', topics: ['Seaborn', 'Plotly Interactive Charts', 'Dashboard Creation'] },
      { day: 3, title: 'Statistical Analysis', topics: ['Hypothesis Testing', 'A/B Testing', 'Correlation Analysis'] },
      { day: 4, title: 'Big Data Processing', topics: ['PySpark Basics', 'Distributed Computing', 'Data Pipelines'] },
      { day: 5, title: 'Real-World Projects', topics: ['End-to-End Analytics Project', 'Business Intelligence', 'Reporting Automation'] },
    ],
  },
  {
    category: 'ai',
    title: 'Data Management',
    duration: '3 days',
    level: 'Intermediate',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    thumbnail: '/thumb-data-mgmt.png',
    contentType: 'overview',
    overview: {
      description: 'Discover how to build a robust, scalable data foundation. This module covers everything from organizing and structuring enterprise data to securing it, ensuring your organization is primed for advanced AI and analytics.',
      benefits: [
        { iconName: 'TrendingUp', title: 'Unlock AI Capabilities', stat: 'Faster deployment', desc: 'Accelerate your AI readiness by building automated, scalable data pipelines.' },
        { iconName: 'ShieldCheck', title: 'Built-in Compliance', stat: 'GDPR ready', desc: 'Protect sensitive information and ensure strict regulatory compliance by design.' },
        { iconName: 'BarChart', title: 'Enhance Data Quality', stat: 'Higher precision', desc: 'Eliminate bias and errors by feeding clean, normalized data to your models.' },
        { iconName: 'Zap', title: 'Unified Architecture', stat: 'Zero data silos', desc: 'Connect disparate data sources into a seamless, centralized enterprise data ecosystem.' },
      ],
      useCases: [
        { iconName: 'Factory', title: 'Enterprise Data Hub', outcome: 'Consolidated multiple legacy systems into a single source of truth for unified reporting.' },
        { iconName: 'Wifi', title: 'Real-Time Processing', outcome: 'Built high-throughput streaming pipelines for instant insights and rapid decision-making.' },
        { iconName: 'TrendingUp', title: 'Automated Cleaning', outcome: 'Reduced manual data wrangling hours by 80% using automated validation rules.' },
        { iconName: 'ShieldCheck', title: 'Secure Data Sharing', outcome: 'Implemented strict, granular access controls to safely distribute data across teams.' },
      ],
      topics: [
        'Modern Data Architecture (Lakes & Warehouses)',
        'Cloud Data Infrastructure & Scalability',
        'Data Governance, Security & GDPR',
        'Building Automated ETL/ELT Pipelines',
        'Streaming vs Batch Processing',
        'Data Quality & Master Data Management',
        'Preparing Data for AI & Machine Learning',
        'Privacy-Preserving Techniques',
      ],
    }
  },
  {
    category: 'ai',
    title: 'Responsible LLM Enterprise Integration',
    duration: '2 days',
    level: 'Advanced',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    thumbnail: '/thumb-llm.png',
    contentType: 'overview',
    overview: {
      description: 'Equip your technical leadership with the frameworks needed to safely deploy Large Language Models in production. Focus on mitigating risks, preventing data leakage, and ensuring ethical AI alignment.',
      benefits: [
        { iconName: 'ShieldCheck', title: 'Mitigate Hallucinations', stat: '99% factual accuracy', desc: 'Implement RAG and grounding techniques to ensure LLM outputs are reliable.' },
        { iconName: 'Factory', title: 'Prevent Data Leaks', stat: 'Zero exposure', desc: 'Design secure boundaries to prevent sensitive corporate data from training public models.' },
        { iconName: 'Zap', title: 'Defend Against Attacks', stat: 'Robust security', desc: 'Secure your AI applications against prompt injections and jailbreaks.' },
        { iconName: 'TrendingUp', title: 'Ensure Ethical AI', stat: 'Bias-free operations', desc: 'Establish guidelines and automated checks to prevent discriminatory outputs.' },
      ],
      useCases: [
        { iconName: 'ShieldCheck', title: 'Secure Copilot', outcome: 'Deployed internal coding assistant with strict IP protection boundaries.' },
        { iconName: 'Factory', title: 'Enterprise RAG', outcome: 'Built a hallucination-free document QA system over 100,000 internal PDFs.' },
        { iconName: 'Wifi', title: 'Red Teaming', outcome: 'Identified and patched 15 critical vulnerabilities in customer-facing chatbots.' },
        { iconName: 'BarChart', title: 'Bias Auditing', outcome: 'Implemented automated fairness checks in an AI recruitment screening tool.' },
      ],
      topics: [
        'Evaluating Foundation Models',
        'Hallucination Mitigation Strategies',
        'Security & Data Leakage Risks',
        'Retrieval-Augmented Generation (RAG)',
        'Prompt Injection Defense',
        'Ethical AI Guidelines & Bias',
        'Model Auditing & Red Teaming',
        'Compliance in Generative AI',
      ],
    }
  },
  {
    category: 'ai',
    title: 'Masterful Prompt Engineering',
    duration: '2 days',
    level: 'All Levels',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    thumbnail: '/thumb-prompt.png',
    contentType: 'overview',
    overview: {
      description: 'Transform how your team communicates with AI. Learn advanced techniques to extract maximum value from foundation models through precise, structured, and iterative prompting methodologies.',
      benefits: [
        { iconName: 'Zap', title: 'Boost Productivity', stat: '3x faster outputs', desc: 'Reduce the time spent re-prompting by getting it right the first time.' },
        { iconName: 'BarChart', title: 'Enhance Output Quality', stat: 'Higher relevance', desc: 'Use advanced framing and constraints to generate highly specific, usable results.' },
        { iconName: 'ShieldCheck', title: 'Standardize Prompts', stat: 'Consistent AI', desc: 'Develop a library of standardized system prompts for your entire organization.' },
        { iconName: 'Factory', title: 'Automate Workflows', stat: 'Agentic tasks', desc: 'Learn to string multiple prompts together to solve complex, multi-step problems.' },
      ],
      useCases: [
        { iconName: 'TrendingUp', title: 'Content Generation', outcome: 'Automated high-quality marketing copy generation with strict brand voice constraints.' },
        { iconName: 'Zap', title: 'Data Extraction', outcome: 'Extracted structured JSON data from messy, unstructured text with 98% accuracy.' },
        { iconName: 'Wifi', title: 'Code Refactoring', outcome: 'Used Chain-of-Thought to rewrite legacy codebases efficiently.' },
        { iconName: 'Factory', title: 'Customer Support', outcome: 'Designed robust system prompts that handle angry customers gracefully.' },
      ],
      topics: [
        'Zero-Shot & Few-Shot Prompting',
        'Persona Assignment & Roleplay',
        'Context Framing & Constraints',
        'Chain-of-Thought (CoT) Reasoning',
        'ReAct Framework (Reason + Act)',
        'Iterative Refinement & Prompt Chaining',
        'System Prompts & Instruction Tuning',
        'Evaluating Prompt Effectiveness',
      ],
    }
  },
  {
    category: 'ai',
    title: 'AI-Native Vibe Coding & Prototyping',
    duration: '3 days',
    level: 'Intermediate',
    color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
    thumbnail: '/thumb-vibe-coding.png',
    contentType: 'overview',
    overview: {
      description: 'Embrace the future of software development where plain English is your primary programming language. Learn to build, iterate, and deploy functional applications at unprecedented speeds using AI-first IDEs and agentic workflows.',
      noCodingNote: 'While this course covers software concepts, the focus is on directing AI agents through natural language ("vibe coding") rather than writing syntax manually.',
      calloutTitle: 'Natural Language Coding',
      benefits: [
        { iconName: 'Zap', title: 'Rapid Prototyping', stat: '10x faster MVP', desc: 'Go from idea to functional prototype in hours instead of weeks.' },
        { iconName: 'Factory', title: 'Focus on Architecture', stat: 'Semantic logic', desc: 'Shift your focus from writing boilerplate syntax to designing high-level system logic.' },
        { iconName: 'ShieldCheck', title: 'Automated Debugging', stat: 'Fewer blockers', desc: 'Leverage AI agents to instantly identify, explain, and fix complex bugs.' },
        { iconName: 'TrendingUp', title: 'Empower Non-Coders', stat: 'Accessible dev', desc: 'Enable product managers and designers to build functional tools independently.' },
      ],
      useCases: [
        { iconName: 'Wifi', title: 'Internal Tooling', outcome: 'Built a complete CRM dashboard from scratch in 2 days using Cursor.' },
        { iconName: 'Factory', title: 'Legacy Modernization', outcome: 'Migrated a React app to Next.js by delegating repetitive tasks to an AI agent.' },
        { iconName: 'Zap', title: 'UI/UX Iteration', outcome: 'Iterated through 5 different design systems in one afternoon simply by describing the "vibe".' },
        { iconName: 'BarChart', title: 'Test Automation', outcome: 'Generated 100% unit test coverage for an entire module in minutes.' },
      ],
      topics: [
        'The "Vibe Coding" Paradigm Shift',
        'Mastering AI IDEs (Cursor, Windsurf)',
        'Prompt-Driven Architecture Design',
        'Component & Scaffold Generation',
        'Managing AI Context & Codebase Indexing',
        'Agentic Development Workflows',
        'AI-Assisted Bug Fixing & Refactoring',
        'UI/UX Iteration by Vibe',
      ],
    }
  },
  {
    category: 'rpa',
    title: 'RPA Development',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    thumbnail: '/thumb-rpa.png',
    contentType: 'days',
    days: [
      { day: 1, title: 'RPA Fundamentals', topics: ['Introduction to RPA', 'Process Assessment', 'Automation Candidates'] },
      { day: 2, title: 'Bot Development Basics', topics: ['Recording & Playback', 'Variables & Arguments', 'Control Flow'] },
      { day: 3, title: 'Advanced Automation', topics: ['Excel Automation', 'Web Scraping', 'Email Automation'] },
      { day: 4, title: 'Orchestration & Management', topics: ['Bot Scheduling', 'Queue Management', 'Error Handling'] },
      { day: 5, title: 'UiPath Studio', topics: ['UiPath Environment Setup', 'Building Production Bots', 'Deployment & Monitoring'] },
    ],
  },
];

async function seedData() {
  console.log('Starting seed process...');
  
  // First, delete existing training modules
  const existingModules = await client.fetch(`*[_type == "trainingModule"]{_id}`);
  for (const doc of existingModules) {
    console.log(`Deleting existing module ${doc._id}...`);
    await client.delete(doc._id);
  }
  
  // Upload and insert new modules
  for (const module of modulesData) {
    const doc = {
      _type: 'trainingModule',
      title: module.title,
      category: module.category,
      duration: module.duration,
      level: module.level,
      color: module.color,
      contentType: module.contentType,
    };

    if (module.thumbnail) {
      const thumbnailAsset = await uploadImage(module.thumbnail);
      if (thumbnailAsset) {
        doc.thumbnail = thumbnailAsset;
      }
    }

    if (module.contentType === 'days' && module.days) {
      doc.days = module.days.map(d => ({
        _key: `day-${d.day}`,
        ...d
      }));
    }

    if (module.contentType === 'overview' && module.overview) {
      doc.overview = {
        description: module.overview.description,
        noCodingNote: module.overview.noCodingNote || null,
        calloutTitle: module.overview.calloutTitle || null,
        topics: module.overview.topics || [],
      };
      
      if (module.overview.benefits) {
        doc.overview.benefits = module.overview.benefits.map((b, idx) => ({
          _key: `benefit-${idx}`,
          ...b
        }));
      }
      
      if (module.overview.useCases) {
        doc.overview.useCases = module.overview.useCases.map((u, idx) => ({
          _key: `usecase-${idx}`,
          ...u
        }));
      }

      if (module.overview.gallery) {
        doc.overview.gallery = [];
        for (let i = 0; i < module.overview.gallery.length; i++) {
          const item = module.overview.gallery[i];
          const galleryAsset = await uploadImage(item.src);
          if (galleryAsset) {
            doc.overview.gallery.push({
              _key: `gallery-${i}`,
              ...galleryAsset,
              caption: item.caption,
            });
          }
        }
      }
    }

    console.log(`Creating module: ${module.title}`);
    await client.create(doc);
  }
  
  console.log('Seeding completed successfully!');
}

seedData().catch(console.error);
