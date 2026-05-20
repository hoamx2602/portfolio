export type Locale = 'en' | 'es' | 'fr' | 'ar'

export const locales: Locale[] = ['en', 'es', 'fr', 'ar']

export const rtlLocales: Locale[] = ['ar']

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}

export const translations = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      responsibleAI: 'Responsible AI',
      training: 'Training',
      projects: 'Case Studies',
      team: 'Team',
      clients: 'Clients',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Responsible Industrial AI Consultancy',
      title: 'Empowering Organisations Through AI, Automation & Digital Innovation',
      subtitle: 'We help organisations adopt AI, Industrial IoT, and automation technologies responsibly through hands-on training and strategic guidance.',
      cta: 'Book a Consultation',
      learnMore: 'Learn More',
      exploreTraining: 'Explore Training Programmes',
      trustSignal: 'Trusted by enterprises, public sector organisations, and universities across the UK',
    },
    about: {
      title: 'About Us',
      subtitle: 'Driving digital transformation since 2015',
      description: 'We are a leading technology consulting firm specializing in Artificial Intelligence, Industrial Internet of Things, and Robotic Process Automation. Our team of experts helps businesses optimize operations, reduce costs, and accelerate growth through innovative solutions.',
      stats: {
        clients: 'Clients Served',
        projects: 'Projects Delivered',
        countries: 'Countries',
        experts: 'Expert Consultants',
      },
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive technology solutions tailored to your needs',
      learnMore: 'View Training Programs',
      ai: {
        title: 'Artificial Intelligence',
        description: 'Machine learning, natural language processing, computer vision, and predictive analytics solutions to automate decision-making and enhance business intelligence.',
      },
      iiot: {
        title: 'Industrial IoT',
        description: 'Smart manufacturing, predictive maintenance, asset tracking, and real-time monitoring systems for Industry 4.0 transformation.',
      },
      rpa: {
        title: 'Robotic Process Automation',
        description: 'Workflow automation, process optimization, and intelligent automation solutions to streamline business operations and reduce manual tasks.',
      },
    },
    whyUs: {
      tagline: 'Our Difference',
      title: 'Why Organisations Choose Us',
      subtitle: 'We combine academic rigour with industrial expertise to deliver responsible, practical, and impactful technology solutions.',
      academic: {
        title: 'Academic & Industry Expertise',
        description: 'Bridging peer-reviewed research and real-world industrial implementation — from concept to deployment.',
      },
      responsible: {
        title: 'Responsible AI Focus',
        description: 'Beyond AI hype toward trustworthy, explainable, and GDPR-compliant AI deployment in regulated sectors.',
      },
      training: {
        title: 'Practical Hands-On Training',
        description: 'Real industrial dashboards, IoT architectures, and applied AI systems — not just theory in a classroom.',
      },
      enterprise: {
        title: 'Enterprise & Public Sector',
        description: 'Deep understanding of governance, compliance, procurement, and the unique challenges of regulated industries.',
      },
    },
    responsibleAI: {
      tagline: 'Our Core Differentiator',
      title: 'Responsible AI & Governance',
      description: 'As AI adoption accelerates, organisations face growing pressure to deploy systems that are not just powerful — but trustworthy, fair, and compliant.',
      description2: 'We are one of the few consultancies that combines AI capability, industrial deployment, and full governance frameworks — making us uniquely positioned to support NHS, councils, universities, and regulated industries.',
      cta: 'Discuss Your AI Governance Needs',
      sectorsLabel: 'Particularly suited for regulated sectors:',
      calloutBold: 'Our unique positioning:',
      callout: 'Very few organisations combine AI capability, Industrial IoT deployment, RPA automation, and Responsible AI governance in a single practice. This is our strongest competitive advantage.',
      pillars: {
        explainability: 'Explainable AI (XAI)',
        fairness: 'Bias Detection & Fairness',
        gdpr: 'GDPR & AI Compliance',
        dataProtection: 'Data Protection by Design',
        riskManagement: 'AI Risk Management',
        humanCentred: 'Human-Centred AI',
        governance: 'AI Governance Frameworks',
        ethics: 'Ethical AI Deployment',
      },
    },
    training: {
      title: 'Training Programs',
      subtitle: 'Upskill your team with expert-led courses',
      programs: {
        aiFoundations: {
          title: 'AI Foundations',
          duration: '40 hours',
          level: 'Beginner',
        },
        iiotImplementation: {
          title: 'IIoT Implementation',
          duration: '32 hours',
          level: 'Intermediate',
        },
        rpaAdvanced: {
          title: 'Advanced RPA',
          duration: '48 hours',
          level: 'Advanced',
        },
      },
      viewAll: 'View All Programs',
    },
    projects: {
      title: 'Case Studies',
      subtitle: 'Real-world solutions delivering measurable, validated results',
      viewCase: 'View Case Study',
    },
    team: {
      title: 'Meet Our Team',
      subtitle: 'Industry experts dedicated to driving your digital transformation',
    },
    clients: {
      title: 'Trusted by Industry Leaders',
      subtitle: 'We partner with forward-thinking organizations across diverse industries',
      testimonials: 'What Our Clients Say',
      stats: {
        clients: 'Clients Worldwide',
        projects: 'Projects Delivered',
        satisfaction: 'Client Satisfaction',
        countries: 'Countries Served',
      },
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Ready to transform your business? Let us help you get started.',
      form: {
        name: 'Your Name',
        email: 'Email Address',
        company: 'Company',
        message: 'Message',
        send: 'Send Message',
      },
      info: {
        email: 'contact@techconsult.com',
        phone: '+1 (555) 123-4567',
        address: '123 Innovation Drive, Tech City, TC 12345',
      },
    },
    footer: {
      copyright: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      gdprNote: 'GDPR Compliant · Responsible AI Practitioner · ISO 27001 Aligned',
      description: 'A responsible industrial AI consultancy combining AI, Industrial IoT, RPA, and AI governance for enterprises and public sector organisations.',
    },
  },
  es: {
    nav: {
      about: 'Nosotros',
      services: 'Servicios',
      training: 'Capacitacion',
      projects: 'Proyectos',
      team: 'Equipo',
      clients: 'Clientes',
      contact: 'Contacto',
    },
    hero: {
      tagline: 'Consultoria de IA Industrial Responsable',
      title: 'Empoderando Organizaciones a través de IA, Automatización e Innovación Digital',
      subtitle: 'Ayudamos a las organizaciones a adoptar la IA, el IIoT y las tecnologías de automatización de forma responsable a través de formación práctica y orientación estratégica.',
      cta: 'Reservar una Consulta',
      learnMore: 'Mas Informacion',
      exploreTraining: 'Explorar Programas de Formacion',
      trustSignal: 'De confianza para empresas, sector publico y universidades',
    },
    about: {
      title: 'Sobre Nosotros',
      subtitle: 'Impulsando la transformacion digital desde 2015',
      description: 'Somos una firma lider en consultoria tecnologica especializada en Inteligencia Artificial, Internet Industrial de las Cosas y Automatizacion Robotica de Procesos. Nuestro equipo de expertos ayuda a las empresas a optimizar operaciones, reducir costos y acelerar el crecimiento a traves de soluciones innovadoras.',
      stats: {
        clients: 'Clientes Atendidos',
        projects: 'Proyectos Entregados',
        countries: 'Paises',
        experts: 'Consultores Expertos',
      },
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones tecnologicas integrales adaptadas a sus necesidades',
      learnMore: 'Ver Programas de Capacitacion',
      ai: {
        title: 'Inteligencia Artificial',
        description: 'Soluciones de aprendizaje automatico, procesamiento de lenguaje natural, vision por computadora y analisis predictivo para automatizar la toma de decisiones y mejorar la inteligencia empresarial.',
      },
      iiot: {
        title: 'IoT Industrial',
        description: 'Fabricacion inteligente, mantenimiento predictivo, seguimiento de activos y sistemas de monitoreo en tiempo real para la transformacion de Industria 4.0.',
      },
      rpa: {
        title: 'Automatizacion Robotica de Procesos',
        description: 'Automatizacion de flujos de trabajo, optimizacion de procesos y soluciones de automatizacion inteligente para agilizar las operaciones comerciales.',
      },
    },
    whyUs: {
      tagline: 'Nuestra Diferencia',
      title: 'Por Que Nos Eligen las Organizaciones',
      subtitle: 'Combinamos rigor academico con experiencia industrial para ofrecer soluciones tecnologicas responsables, practicas e impactantes.',
      academic: { title: 'Experiencia Academica e Industrial', description: 'Vinculamos investigacion y despliegue industrial real, del concepto a la produccion.' },
      responsible: { title: 'Enfoque en IA Responsable', description: 'Mas alla del hype de la IA hacia despliegues confiables, explicables y conformes con el GDPR.' },
      training: { title: 'Formacion Practica', description: 'Sistemas industriales reales, no solo teoria en un aula.' },
      enterprise: { title: 'Empresa y Sector Publico', description: 'Comprension profunda de gobernanza, cumplimiento normativo y contratacion publica.' },
    },
    responsibleAI: {
      tagline: 'Nuestro Diferenciador Principal',
      title: 'IA Responsable y Gobernanza',
      description: 'A medida que la adopcion de la IA se acelera, las organizaciones enfrentan una presion creciente para desplegar sistemas que sean confiables, justos y conformes.',
      description2: 'Somos una de las pocas consultoras que combina capacidad de IA, despliegue industrial y marcos de gobernanza completos.',
      cta: 'Hablar de Gobernanza de IA',
      sectorsLabel: 'Especialmente adecuado para sectores regulados:',
      calloutBold: 'Nuestro posicionamiento unico:',
      callout: 'Muy pocas organizaciones combinan IA, IIoT industrial, automatizacion RPA y gobernanza de IA responsable en una sola practica.',
      pillars: { explainability: 'IA Explicable (XAI)', fairness: 'Deteccion de Sesgo', gdpr: 'GDPR y Cumplimiento de IA', dataProtection: 'Proteccion de Datos', riskManagement: 'Gestion de Riesgos de IA', humanCentred: 'IA Centrada en el Humano', governance: 'Marcos de Gobernanza de IA', ethics: 'Despliegue Etico de IA' },
    },
    training: {
      title: 'Programas de Capacitacion',
      subtitle: 'Mejore las habilidades de su equipo con cursos dirigidos por expertos',
      programs: {
        aiFoundations: {
          title: 'Fundamentos de IA',
          duration: '40 horas',
          level: 'Principiante',
        },
        iiotImplementation: {
          title: 'Implementacion IIoT',
          duration: '32 horas',
          level: 'Intermedio',
        },
        rpaAdvanced: {
          title: 'RPA Avanzado',
          duration: '48 horas',
          level: 'Avanzado',
        },
      },
      viewAll: 'Ver Todos los Programas',
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Soluciones reales con resultados medibles',
      viewCase: 'Ver Caso de Estudio',
    },
    team: {
      title: 'Nuestro Equipo',
      subtitle: 'Expertos de la industria dedicados a impulsar su transformacion digital',
    },
    clients: {
      title: 'Confiado por Lideres de la Industria',
      subtitle: 'Nos asociamos con organizaciones visionarias en diversas industrias',
      testimonials: 'Lo Que Dicen Nuestros Clientes',
      stats: {
        clients: 'Clientes en Todo el Mundo',
        projects: 'Proyectos Entregados',
        satisfaction: 'Satisfaccion del Cliente',
        countries: 'Paises Atendidos',
      },
    },
    contact: {
      title: 'Contactenos',
      subtitle: 'Listo para transformar su negocio? Permitanos ayudarle a comenzar.',
      form: {
        name: 'Su Nombre',
        email: 'Correo Electronico',
        company: 'Empresa',
        message: 'Mensaje',
        send: 'Enviar Mensaje',
      },
      info: {
        email: 'contacto@techconsult.com',
        phone: '+1 (555) 123-4567',
        address: '123 Innovation Drive, Tech City, TC 12345',
      },
    },
    footer: {
      copyright: 'Todos los derechos reservados.',
      privacy: 'Politica de Privacidad',
      terms: 'Terminos de Servicio',
      gdprNote: 'Cumplimiento GDPR · Practicante de IA Responsable · Alineado ISO 27001',
      description: 'Consultoria de IA industrial responsable que combina IA, IIoT, RPA y gobernanza de IA para empresas y organismos del sector publico.',
    },
  },
  fr: {
    nav: {
      about: 'A Propos',
      services: 'Services',
      responsibleAI: 'IA Responsable',
      training: 'Formation',
      projects: 'Etudes de Cas',
      team: 'Equipe',
      clients: 'Clients',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Conseil en IA Industrielle Responsable',
      title: 'Habiliter les Organisations grâce à l\'IA, l\'Automatisation et l\'Innovation Numérique',
      subtitle: 'Nous aidons les organisations à adopter l\'IA, l\'IIoT et les technologies d\'automatisation de manière responsable via des formations pratiques et des conseils stratégiques.',
      cta: 'Reserver une Consultation',
      learnMore: 'En Savoir Plus',
      exploreTraining: 'Explorer les Programmes de Formation',
      trustSignal: 'Reconnu par des entreprises, des organismes publics et des universites',
    },
    about: {
      title: 'A Propos de Nous',
      subtitle: 'Moteur de la transformation numerique depuis 2015',
      description: 'Nous sommes un cabinet de conseil technologique de premier plan specialise dans l\'Intelligence Artificielle, l\'Internet Industriel des Objets et l\'Automatisation Robotique des Processus. Notre equipe d\'experts aide les entreprises a optimiser leurs operations, reduire les couts et accelerer la croissance grace a des solutions innovantes.',
      stats: {
        clients: 'Clients Servis',
        projects: 'Projets Livres',
        countries: 'Pays',
        experts: 'Consultants Experts',
      },
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Solutions technologiques completes adaptees a vos besoins',
      learnMore: 'Voir les Programmes de Formation',
      ai: {
        title: 'Intelligence Artificielle',
        description: 'Solutions d\'apprentissage automatique, de traitement du langage naturel, de vision par ordinateur et d\'analyse predictive pour automatiser la prise de decision et ameliorer l\'intelligence commerciale.',
      },
      iiot: {
        title: 'IoT Industriel',
        description: 'Fabrication intelligente, maintenance predictive, suivi des actifs et systemes de surveillance en temps reel pour la transformation Industrie 4.0.',
      },
      rpa: {
        title: 'Automatisation Robotique des Processus',
        description: 'Automatisation des flux de travail, optimisation des processus et solutions d\'automatisation intelligente pour rationaliser les operations commerciales.',
      },
    },
    whyUs: {
      tagline: 'Notre Difference',
      title: 'Pourquoi les Organisations Nous Choisissent',
      subtitle: 'Nous combinons rigueur academique et expertise industrielle pour des solutions responsables et impactantes.',
      academic: { title: 'Expertise Academique et Industrielle', description: 'Relier la recherche et le deploiement industriel reel, du concept a la production.' },
      responsible: { title: 'Focus IA Responsable', description: 'Au-dela du battage mediatique vers un deploiement de l\'IA digne de confiance et conforme au RGPD.' },
      training: { title: 'Formation Pratique', description: 'Vrais systemes industriels, pas seulement de la theorie en salle de classe.' },
      enterprise: { title: 'Entreprise et Secteur Public', description: 'Comprehension approfondie de la gouvernance, conformite et marches publics.' },
    },
    responsibleAI: {
      tagline: 'Notre Differentiateur Principal',
      title: 'IA Responsable et Gouvernance',
      description: 'Les organisations font face a une pression croissante pour deployer des systemes dignes de confiance, equitables et conformes.',
      description2: 'Nous sommes l\'un des rares cabinets combinant capacite IA, deploiement industriel et cadres de gouvernance complets.',
      cta: 'Discuter de la Gouvernance IA',
      sectorsLabel: 'Particulierement adapte aux secteurs reglementes:',
      calloutBold: 'Notre positionnement unique:',
      callout: 'Tres peu d\'organisations combinent IA, IIoT industriel, automatisation RPA et gouvernance IA responsable dans une seule pratique.',
      pillars: { explainability: 'IA Explicable (XAI)', fairness: 'Detection des Biais', gdpr: 'RGPD et Conformite IA', dataProtection: 'Protection des Donnees', riskManagement: 'Gestion des Risques IA', humanCentred: 'IA Centree sur l\'Humain', governance: 'Cadres de Gouvernance IA', ethics: 'Deploiement Ethique de l\'IA' },
    },
    training: {
      title: 'Programmes de Formation',
      subtitle: 'Developpez les competences de votre equipe avec des cours diriges par des experts',
      programs: {
        aiFoundations: {
          title: 'Fondamentaux IA',
          duration: '40 heures',
          level: 'Debutant',
        },
        iiotImplementation: {
          title: 'Implementation IIoT',
          duration: '32 heures',
          level: 'Intermediaire',
        },
        rpaAdvanced: {
          title: 'RPA Avance',
          duration: '48 heures',
          level: 'Avance',
        },
      },
      viewAll: 'Voir Tous les Programmes',
    },
    projects: {
      title: 'Projets en Vedette',
      subtitle: 'Solutions reelles avec des resultats mesurables',
      viewCase: 'Voir l\'Etude de Cas',
    },
    team: {
      title: 'Notre Equipe',
      subtitle: 'Experts de l\'industrie dedies a stimuler votre transformation numerique',
    },
    clients: {
      title: 'Fait Confiance par les Leaders de l\'Industrie',
      subtitle: 'Nous collaborons avec des organisations visionnaires dans diverses industries',
      testimonials: 'Ce Que Disent Nos Clients',
      stats: {
        clients: 'Clients dans le Monde',
        projects: 'Projets Livres',
        satisfaction: 'Satisfaction Client',
        countries: 'Pays Desservis',
      },
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Pret a transformer votre entreprise? Laissez-nous vous aider a demarrer.',
      form: {
        name: 'Votre Nom',
        email: 'Adresse Email',
        company: 'Entreprise',
        message: 'Message',
        send: 'Envoyer le Message',
      },
      info: {
        email: 'contact@techconsult.com',
        phone: '+1 (555) 123-4567',
        address: '123 Innovation Drive, Tech City, TC 12345',
      },
    },
    footer: {
      copyright: 'Tous droits reserves.',
      privacy: 'Politique de Confidentialite',
      terms: 'Conditions d\'Utilisation',
      gdprNote: 'Conforme RGPD · Praticien IA Responsable · Aligne ISO 27001',
      description: 'Cabinet de conseil en IA industrielle responsable combinant IA, IIoT, RPA et gouvernance de l\'IA pour les entreprises et le secteur public.',
    },
  },
  ar: {
    nav: {
      about: 'من نحن',
      services: 'خدماتنا',
      responsibleAI: 'الذكاء الاصطناعي المسؤول',
      training: 'التدريب',
      projects: 'دراسات الحالة',
      team: 'الفريق',
      clients: 'العملاء',
      contact: 'تواصل معنا',
    },
    hero: {
      tagline: 'استشارات الذكاء الاصطناعي الصناعي المسؤول',
      title: 'تمكين المؤسسات من خلال الذكاء الاصطناعي والأتمتة والابتكار الرقمي',
      subtitle: 'نساعد المؤسسات على تبني تقنيات الذكاء الاصطناعي وإنترنت الأشياء الصناعي والأتمتة بمسؤولية من خلال التدريب العملي والتوجيه الاستراتيجي.',
      cta: 'احجز استشارة',
      learnMore: 'اعرف المزيد',
      exploreTraining: 'استكشف برامج التدريب',
      trustSignal: 'موثوق به من قبل الشركات والقطاع العام والجامعات',
    },
    about: {
      title: 'من نحن',
      subtitle: 'نقود التحول الرقمي منذ عام 2015',
      description: 'نحن شركة استشارات تقنية رائدة متخصصة في الذكاء الاصطناعي وإنترنت الأشياء الصناعي وأتمتة العمليات الآلية. يساعد فريق خبرائنا الشركات على تحسين العمليات وخفض التكاليف وتسريع النمو من خلال حلول مبتكرة.',
      stats: {
        clients: 'عميل تمت خدمته',
        projects: 'مشروع تم تسليمه',
        countries: 'دولة',
        experts: 'مستشار خبير',
      },
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'حلول تقنية شاملة مصممة لاحتياجاتك',
      learnMore: 'عرض برامج التدريب',
      ai: {
        title: 'الذكاء الاصطناعي',
        description: 'حلول التعلم الآلي ومعالجة اللغة الطبيعية والرؤية الحاسوبية والتحليلات التنبؤية لأتمتة اتخاذ القرار وتعزيز ذكاء الأعمال.',
      },
      iiot: {
        title: 'إنترنت الأشياء الصناعي',
        description: 'التصنيع الذكي والصيانة التنبؤية وتتبع الأصول وأنظمة المراقبة في الوقت الفعلي لتحول الصناعة 4.0.',
      },
      rpa: {
        title: 'أتمتة العمليات الآلية',
        description: 'أتمتة سير العمل وتحسين العمليات وحلول الأتمتة الذكية لتبسيط العمليات التجارية وتقليل المهام اليدوية.',
      },
    },
    whyUs: {
      tagline: 'ما يميزنا',
      title: 'لماذا تختارنا المؤسسات',
      subtitle: 'نجمع بين الصرامة الأكاديمية والخبرة الصناعية لتقديم حلول تقنية مسؤولة وعملية ومؤثرة.',
      academic: { title: 'الخبرة الأكاديمية والصناعية', description: 'نربط البحث العلمي بالتطبيق الصناعي الواقعي من الفكرة إلى الإنتاج.' },
      responsible: { title: 'التركيز على الذكاء الاصطناعي المسؤول', description: 'ما وراء الضجيج نحو نشر الذكاء الاصطناعي الموثوق والقابل للتفسير والمتوافق مع GDPR.' },
      training: { title: 'التدريب العملي التطبيقي', description: 'أنظمة صناعية حقيقية وليس مجرد نظرية في الفصول الدراسية.' },
      enterprise: { title: 'الشركات والقطاع العام', description: 'فهم عميق للحوكمة والامتثال والمشتريات العامة.' },
    },
    responsibleAI: {
      tagline: 'مميزنا الرئيسي',
      title: 'الذكاء الاصطناعي المسؤول والحوكمة',
      description: 'مع تسارع تبني الذكاء الاصطناعي، تواجه المؤسسات ضغطاً متزايداً لنشر أنظمة موثوقة وعادلة ومتوافقة.',
      description2: 'نحن من القلائل الذين يجمعون قدرة الذكاء الاصطناعي والنشر الصناعي وأطر الحوكمة الشاملة.',
      cta: 'ناقش احتياجات حوكمة الذكاء الاصطناعي',
      sectorsLabel: 'مناسب بشكل خاص للقطاعات المنظمة:',
      calloutBold: 'تموضعنا الفريد:',
      callout: 'قليل جداً من المؤسسات تجمع الذكاء الاصطناعي وإنترنت الأشياء الصناعي وأتمتة العمليات وحوكمة الذكاء الاصطناعي المسؤول في ممارسة واحدة.',
      pillars: { explainability: 'الذكاء الاصطناعي القابل للتفسير', fairness: 'كشف التحيز والعدالة', gdpr: 'GDPR والامتثال للذكاء الاصطناعي', dataProtection: 'حماية البيانات بالتصميم', riskManagement: 'إدارة مخاطر الذكاء الاصطناعي', humanCentred: 'الذكاء الاصطناعي المتمحور حول الإنسان', governance: 'أطر حوكمة الذكاء الاصطناعي', ethics: 'النشر الأخلاقي للذكاء الاصطناعي' },
    },
    training: {
      title: 'برامج التدريب',
      subtitle: 'طوّر مهارات فريقك مع دورات يقودها خبراء',
      programs: {
        aiFoundations: {
          title: 'أساسيات الذكاء الاصطناعي',
          duration: '40 ساعة',
          level: 'مبتدئ',
        },
        iiotImplementation: {
          title: 'تطبيق إنترنت الأشياء الصناعي',
          duration: '32 ساعة',
          level: 'متوسط',
        },
        rpaAdvanced: {
          title: 'أتمتة العمليات المتقدمة',
          duration: '48 ساعة',
          level: 'متقدم',
        },
      },
      viewAll: 'عرض جميع البرامج',
    },
    projects: {
      title: 'المشاريع المميزة',
      subtitle: 'حلول واقعية تحقق نتائج قابلة للقياس',
      viewCase: 'عرض دراسة الحالة',
    },
    team: {
      title: 'تعرف على فريقنا',
      subtitle: 'خبراء الصناعة المكرسون لقيادة تحولك الرقمي',
    },
    clients: {
      title: 'موثوق به من قبل رواد الصناعة',
      subtitle: 'نتعاون مع منظمات رائدة عبر صناعات متنوعة',
      testimonials: 'ماذا يقول عملاؤنا',
      stats: {
        clients: 'عميل حول العالم',
        projects: 'مشروع تم تسليمه',
        satisfaction: 'رضا العملاء',
        countries: 'دولة تم خدمتها',
      },
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'هل أنت مستعد لتحويل أعمالك؟ دعنا نساعدك على البدء.',
      form: {
        name: 'اسمك',
        email: 'البريد الإلكتروني',
        company: 'الشركة',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
      },
      info: {
        email: 'contact@techconsult.com',
        phone: '+1 (555) 123-4567',
        address: '123 Innovation Drive, Tech City, TC 12345',
      },
    },
    footer: {
      copyright: 'جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      gdprNote: 'متوافق مع GDPR · ممارس الذكاء الاصطناعي المسؤول · متوافق مع ISO 27001',
      description: 'شركة استشارات الذكاء الاصطناعي الصناعي المسؤول تجمع بين الذكاء الاصطناعي وإنترنت الأشياء الصناعي وأتمتة العمليات وحوكمة الذكاء الاصطناعي للشركات والقطاع العام.',
    },
  },
}

export function getTranslation(locale: Locale) {
  return translations[locale]
}
