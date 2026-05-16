export type Locale = 'en' | 'es' | 'fr'

export const locales: Locale[] = ['en', 'es', 'fr']

export const translations = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      training: 'Training',
      projects: 'Projects',
      team: 'Team',
      clients: 'Clients',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Technology Consulting & Training',
      title: 'Empowering businesses with AI, IIoT & RPA solutions',
      subtitle: 'We help organizations transform their operations through cutting-edge technology consulting and professional training programs.',
      cta: 'Get Started',
      learnMore: 'Learn More',
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
      title: 'Featured Projects',
      subtitle: 'Real-world solutions delivering measurable results',
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
      tagline: 'Consultoria y Capacitacion Tecnologica',
      title: 'Impulsando empresas con soluciones de IA, IIoT y RPA',
      subtitle: 'Ayudamos a las organizaciones a transformar sus operaciones a traves de consultoria tecnologica de vanguardia y programas de capacitacion profesional.',
      cta: 'Comenzar',
      learnMore: 'Mas Informacion',
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
    },
  },
  fr: {
    nav: {
      about: 'A Propos',
      services: 'Services',
      training: 'Formation',
      projects: 'Projets',
      team: 'Equipe',
      clients: 'Clients',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Conseil et Formation Technologique',
      title: 'Solutions IA, IIoT et RPA pour les entreprises',
      subtitle: 'Nous aidons les organisations a transformer leurs operations grace au conseil technologique de pointe et aux programmes de formation professionnelle.',
      cta: 'Commencer',
      learnMore: 'En Savoir Plus',
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
    },
  },
}

export function getTranslation(locale: Locale) {
  return translations[locale]
}
