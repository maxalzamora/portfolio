window.PORTFOLIO = {
  meta: {
    title: "Max Alzamora — Junior Backend Developer",
    description:
      "Max Alzamora is a junior backend developer in Barcelona. Python, Django, SQL and clean, tested systems.",
    keywords:
      "Max Alzamora, Junior Backend Developer, Python, Django, SQL, Barcelona, Portfolio",
    author: "Max Alzamora",
    themeColor: "#f4f1e8",
    locale: "en_GB",
    url: "https://maxalzamora.github.io/portfolio/",
    ogImage: "https://maxalzamora.github.io/portfolio/src/assets/projects/portfolio.webp"
  },

  identity: {
    name: "Max Alzamora",
    initials: "MA",
    role: "Junior Backend Developer",
    location: "Barcelona, Spain",
    availability: "Open to junior backend roles"
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ],

  hero: {
    eyebrow: "Junior Backend Developer · Barcelona",
    titleBefore: "Where ",
    titleEmphasis: " creativity ",
    titleAfter: "becomes functionality.",
    description:
      "Backend developer focused on Java and Spring, with a background in graphic design and a passion for building things. I enjoy solving problems, working with data and turning ideas into functional software.",
    primaryCta: { label: "Explore my work", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    image: "src/assets/profile.webp",
    imageAlt: "Max Alzamora, junior backend developer",
    status: "Open to work",
    facts: [
      { label: "Based in", value: "Barcelona, Spain" },
      { label: "Focus", value: "Java · Python · REST APIs" },
      { label: "Background", value: "Design · Programming · Data" }
    ],
    profile: {
      name: "Max Alzamora",
      role: "Junior Backend Developer",
      note: "A creative background, a technical mindset and a passion for building useful things.",
      stack: ["Java", "Spring", "SQL", "Python"],
      availability: "Open to junior backend opportunities"
    }
  },

  about: {
    kicker: "01 — About",
    title: "Bridging Design, Data, and Code.",
    paragraphs: [
      "I studied <strong>music</strong> and <strong>graphic design</strong>, and spent over 10 years working as a graphic designer, mostly as a freelancer. Along the way, I developed an interest in <strong>web development</strong> and eventually started <strong>programming videogames</strong> as a self-taught developer.",
      "More recently, I explored <strong>software testing</strong> and <strong>data analytics</strong> before discovering that <strong>backend development</strong> was where I wanted to focus. I completed backend training in Java and Spring, covering REST APIs, databases, Git and automated testing.",
      "I'm now looking to grow as a backend developer, contribute to real projects and bring my creativity, problem-solving skills and professional experience into software development."
    ],
    principles: [
      {
        title: "Creative problem-solving",
        text: "A different perspective shaped by years of creative work and technical exploration."
      },
      {
        title: "Attention to detail",
        text: "A professional habit developed through over a decade of design work."
      },
      {
        title: "Independent learning",
        text: "Comfortable exploring new technologies, researching solutions and learning by building."
      }
    ],
    now: {
      title: "Currently",
      text: "Building on my backend development foundations through personal projects and continued practice.",
      items: ["Docker", "PostgreSQL", "Test Automation"]
    }
  },

  skills: {
    kicker: "02 — Skills",
    title: "A growing technical toolkit.",
    note: "Built through formal training, hands-on projects and professional experience.",
    categories: [
      {
        title: "Backend",
        items: ["Java", "Spring", "REST APIs", "JPA/Hibernate", "Python"]
      },
      {
        title: "Databases",
        items: [
          "SQL",
          "PostgreSQL",
          "MySQL"
        ]
      },
      {
        title: "Testing & Tools",
        items: ["JUnit", "Test Automation", "Git"]
      },
      {
        title: "Data & Analytics",
        items: [
          "Pandas",
          "Power BI",
          "Excel",
          "Scikit-learn",
          "Matplotlib",
          "Seaborn"
        ]
      },
      {
        title: "Frontend",
        items: [
          "JavaScript",
          "HTML",
          "CSS",
          "Wordpress"
        ]
      },
      {
        title: "Softskills",
        items: ["Independent learning", "Creativity", "Attention to detail", "Adaptability", "Organization"]
      },
      {
        title: "Languages",
        items: ["Catalan — Native", "Spanish — Native", "English — C1"]
      }
    ]
  },

  projects: {
    kicker: "03 — Projects",
    title: "Selected work.",
    note: "Three projects that show how I think, build and test.",
    categories: [
      {
        title: "Backend & full-stack",
        projects: [
          {
            name: "SongTrove",
            type: "Django application",
            year: "2026",
            description:
              "A Django web application born out of the need for a centralized, clutter-free songbook with exactly the features I wanted. It includes user accounts, personal libraries, song management, search and filters, on-the-fly chord transposition, capo calculations and a clean print view.",
            image: "src/assets/projects/songtrove.webp",
            imageAlt: "SongTrove — chord sheet library in dark mode",
            repo: "https://github.com/maxalzamora/songtrove",
            live: "https://songtrove.pythonanywhere.com/",
            private: false,
            showStats: false,
            statsRepo: "maxalzamora/songtrove",
            tech: [
              "Python",
              "Django",
              "MySQL"
            ]
          },
          {
            name: "Cyanofy",
            type: "Spring Boot application",
            year: "2026",
            description:
              "A Spring Boot application that turns a photograph into the digital negative you print on transparency for a <a class='inline-link' href='https://en.wikipedia.org/wiki/Cyanotype' target='_blank' rel='noopener noreferrer'>cyanotype</a> contact print. I built it for my partner, who teaches cyanotype workshops and kept finding most negative-making tools behind a paywall, so it handles the whole process without one: density-based tone mapping, 16-bit TIFF and page-sized PDF exports, a preview of the finished print, and calibration from a photographed print.",
            image: "src/assets/projects/cyanotypes.webp",
            imageAlt: "Cyanotypes — upload form and the Prussian-blue print preview it produces",
            repo: "https://github.com/maxalzamora/cyanotype-maker",
            live: "",
            private: false,
            showStats: false,
            statsRepo: "maxalzamora/cyanotype-maker",
            tech: [
              "Java",
              "Spring Boot",
              "JUnit",
              "PDFBox"
            ]
          }
        ]
      },
      {
        title: "Frontend & PWA",
        projects: [
          {
            name: "Six Count",
            type: "Installable PWA",
            year: "2026",
            description:
              "A lightweight boxing training app built for a friend who wanted a distraction-free way to train. It features three-minute rounds, spoken punch combinations in English and Catalan, synthesized bell sounds, fullscreen mode, wake lock and offline support.",
            image: "src/assets/projects/six-count.webp",
            imageAlt: "Six Count — boxing round timer app",
            repo: "https://github.com/maxalzamora/boxingapp",
            live: "https://maxalzamora.github.io/boxingapp/",
            private: false,
            showStats: false,
            statsRepo: "maxalzamora/boxingapp",
            tech: [
              "JavaScript",
              "HTML",
              "CSS",
              "Web APIs"
            ]
          }
        ]
      }
    ]
  },

  contact: {
    kicker: "04 — Contact",
    title: "Let's build something together.",
    description:
      "I'm looking for junior backend opportunities where I can contribute, grow and put my skills into practice. Let's talk!",
    note: "Always happy to connect and talk about opportunities.",
    form: {
      action: "",
      submitLabel: "Send message"
    },
    links: [
      {
        label: "Email",
        value: "maxalzamorawork@gmail.com",
        href: "mailto:maxalzamorawork@gmail.com",
        icon: "email"
      },
      {
        label: "GitHub",
        value: "github.com/maxalzamora",
        href: "https://github.com/maxalzamora",
        icon: "github"
      },
      {
        label: "Linkedin",
        value: "linkedin.com/in/maxalzamora",
        href: "https://www.linkedin.com/in/maxalzamora/",
        icon: "linkedin"
      },

    ]
  },

  footer: {
    tagline: "Backend developer · Barcelona",
    copyright: "© 2026 Max Alzamora",
    builtWith: "Built with vanilla HTML, CSS and JavaScript.",
    backToTop: "Back to top"
  },

  ui: {
    skipToContent: "Skip to content",
    mainNavigation: "Main navigation",
    home: "home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    headerCta: "Let's talk",
    language: "Language",
    profileSummary: "Profile summary",
    coreStack: "Core stack",
    scrollToExplore: "Scroll to explore",
    liveSite: "Live site",
    private: "Private",
    project: "project",
    projects: "projects",
    projectFallback: "Project",
    formName: "Name",
    formEmail: "Email",
    formSubject: "Subject",
    formMessage: "Message",
    formNamePlaceholder: "Ada Lovelace",
    formEmailPlaceholder: "ada@example.com",
    formSubjectPlaceholder: "Junior backend role",
    formMessagePlaceholder: "Tell me about the role or project…",
    sendMessage: "Send message",
    sending: "Sending…",
    noContactMethod: "No contact method is configured yet.",
    portfolioEnquiry: "Portfolio enquiry",
    openingEmail: "Opening your email app…",
    messageSent: "Message sent. Thanks for reaching out.",
    sent: "Sent",
    genericError: "Something went wrong. Please try again.",
    connectionError: "Connection failed. Please check your internet and try again."
  },

  theme: {
    lightLabel: "Switch to dark mode",
    darkLabel: "Switch to light mode"
  }
};

/* ============================================================================
   Language versions
   ----------------------------------------------------------------------------
   English is the default. Add or edit translations here. The header language
   picker switches between these objects and stores the choice in localStorage.
   ============================================================================ */
window.PORTFOLIO_LANGUAGES = {
  en: window.PORTFOLIO,
  es:   {
    "meta": {
      "title": "Max Alzamora — Desarrollador Backend Junior",
      "description": "Max Alzamora es un desarrollador backend junior en Barcelona. Python, Django, SQL y sistemas limpios y bien testeados.",
      "keywords": "Max Alzamora, Desarrollador Backend Junior, Python, Django, SQL, Barcelona, Portfolio",
      "author": "Max Alzamora",
      "themeColor": "#f4f1e8",
      "locale": "es_ES",
      "url": "https://maxalzamora.github.io/portfolio/",
      "ogImage": "https://maxalzamora.github.io/portfolio/src/assets/projects/portfolio.webp"
    },
    "identity": {
      "name": "Max Alzamora",
      "initials": "MA",
      "role": "Desarrollador Backend Junior",
      "location": "Barcelona, España",
      "availability": "Abierto a puestos de backend junior"
    },
    "nav": [
      {
        "label": "Sobre mí",
        "href": "#about"
      },
      {
        "label": "Habilidades",
        "href": "#skills"
      },
      {
        "label": "Proyectos",
        "href": "#projects"
      },
      {
        "label": "Contacto",
        "href": "#contact"
      }
    ],
    "hero": {
      "eyebrow": "Desarrollador Backend Junior · Barcelona",
      "titleBefore": "Donde la ",
      "titleEmphasis": " creatividad ",
      "titleAfter": "se vuelve funcionalidad.",
      "description": "Desarrollador backend centrado en Java y Spring, con formación en diseño gráfico y pasión por construir cosas. Me gusta resolver problemas, trabajar con datos y convertir ideas en software funcional.",
      "primaryCta": {
        "label": "Explora mi trabajo",
        "href": "#projects"
      },
      "secondaryCta": {
        "label": "Hablemos",
        "href": "#contact"
      },
      "image": "src/assets/profile.webp",
      "imageAlt": "Max Alzamora, desarrollador backend junior",
      "status": "Abierto a trabajar",
      "facts": [
        {
          "label": "Ubicación",
          "value": "Barcelona, España"
        },
        {
          "label": "Enfoque",
          "value": "Java · Python · APIs REST"
        },
        {
          "label": "Trayectoria",
          "value": "Diseño · Programación · Datos"
        }
      ],
      "profile": {
        "name": "Max Alzamora",
        "role": "Desarrollador Backend Junior",
        "note": "Una trayectoria creativa, una mentalidad técnica y pasión por construir cosas útiles.",
        "stack": [
          "Java",
          "Spring",
          "SQL",
          "Python"
        ],
        "availability": "Abierto a oportunidades de backend junior"
      }
    },
    "about": {
      "kicker": "01 — Sobre mí",
      "title": "Uniendo diseño, datos y código.",
      "paragraphs": [
        "Estudié <strong>música</strong> y <strong>diseño gráfico</strong>, y pasé más de 10 años trabajando como diseñador gráfico, sobre todo como freelance. Por el camino, me interesé por el <strong>desarrollo web</strong> y acabé empezando a <strong>programar videojuegos</strong> como desarrollador autodidacta.",
        "Más recientemente, he explorado el <strong>testing de software</strong> y el <strong>análisis de datos</strong> antes de descubrir que el <strong>desarrollo backend</strong> era en lo que quería centrarme. He completado una formación backend en Java y Spring, cubriendo APIs REST, bases de datos, Git y testing automatizado.",
        "Ahora busco crecer como desarrollador backend, contribuir a proyectos reales y aportar mi creatividad, mi capacidad de resolución de problemas y mi experiencia profesional al desarrollo de software."
      ],
      "principles": [
        {
          "title": "Resolución creativa de problemas",
          "text": "Una perspectiva diferente, forjada por años de trabajo creativo y exploración técnica."
        },
        {
          "title": "Atención al detalle",
          "text": "Un hábito profesional desarrollado a lo largo de más de una década de trabajo en diseño."
        },
        {
          "title": "Aprendizaje autónomo",
          "text": "Cómodo explorando nuevas tecnologías, investigando soluciones y aprendiendo construyendo."
        }
      ],
      "now": {
        "title": "Actualmente",
        "text": "Afianzando mis bases de desarrollo backend con proyectos personales y práctica continua.",
        "items": [
          "Docker",
          "PostgreSQL",
          "Automatización de pruebas"
        ]
      }
    },
    "skills": {
      "kicker": "02 — Habilidades",
      "title": "Un conjunto de herramientas técnicas en crecimiento.",
      "note": "Construido a través de formación reglada, proyectos prácticos y experiencia profesional.",
      "categories": [
        {
          "title": "Backend",
          "items": [
            "Java",
            "Spring",
            "APIs REST",
            "JPA/Hibernate",
            "Python"
          ]
        },
        {
          "title": "Bases de datos",
          "items": [
            "SQL",
            "PostgreSQL",
            "MySQL"
          ]
        },
        {
          "title": "Testing y herramientas",
          "items": [
            "JUnit",
            "Automatización de pruebas",
            "Git"
          ]
        },
        {
          "title": "Datos y analítica",
          "items": [
            "Pandas",
            "Power BI",
            "Excel",
            "Scikit-learn",
            "Matplotlib",
            "Seaborn"
          ]
        },
        {
          "title": "Frontend",
          "items": [
            "JavaScript",
            "HTML",
            "CSS",
            "Wordpress"
          ]
        },
        {
          "title": "Competencias transversales",
          "items": [
            "Aprendizaje autónomo",
            "Creatividad",
            "Atención al detalle",
            "Adaptabilidad",
            "Organización"
          ]
        },
        {
          "title": "Idiomas",
          "items": [
            "Catalán — Nativo",
            "Español — Nativo",
            "Inglés — C1"
          ]
        }
      ]
    },
    "projects": {
      "kicker": "03 — Proyectos",
      "title": "Proyectos elegidos.",
      "note": "Tres proyectos que muestran cómo pienso, construyo y pruebo.",
      "categories": [
        {
          "title": "Backend y full-stack",
          "projects": [
            {
              "name": "SongTrove",
              "type": "Aplicación Django",
              "year": "2026",
              "description": "Una aplicación web en Django que nació de la necesidad de tener un cancionero centralizado, con exactamente las funciones que quería. Incluye cuentas de usuario, bibliotecas personales, gestión de canciones, búsqueda y filtros, transposición de acordes al vuelo, cálculo de cejilla y una vista de impresión limpia.",
              "image": "src/assets/projects/songtrove.webp",
              "imageAlt": "SongTrove — biblioteca de hojas de acordes en modo oscuro",
              "repo": "https://github.com/maxalzamora/songtrove",
              "live": "https://songtrove.pythonanywhere.com/",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/songtrove",
              "tech": [
                "Python",
                "Django",
                "MySQL"
              ]
            },
            {
              "name": "Cyanofy",
              "type": "Aplicación Spring Boot",
              "year": "2026",
              "description": "Una aplicación Spring Boot que convierte una fotografía en el negativo digital que se imprime en transparencia para hacer <a class='inline-link' href='https://es.wikipedia.org/wiki/Cianotipia' target='_blank' rel='noopener noreferrer'>cianotipos</a>. La construí para mi pareja, que imparte talleres de cianotipia y se encontraba con que casi todas las herramientas para crear negativos eran de pago, así que esta cubre todo el proceso sin necesidad de ello: mapeo de tonos basado en la densidad, exportación en TIFF de 16 bits y PDF al tamaño de página, una previsualización de la copia final y calibración a partir de una copia fotografiada.",
              "image": "src/assets/projects/cyanotypes.webp",
              "imageAlt": "Cyanotypes — formulario de subida y la previsualización en azul de Prusia de la copia que genera",
              "repo": "https://github.com/maxalzamora/cyanotype-maker",
              "live": "",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/cyanotype-maker",
              "tech": [
                "Java",
                "Spring Boot",
                "JUnit",
                "PDFBox"
              ]
            }
          ]
        },
        {
          "title": "Frontend y PWA",
          "projects": [
            {
              "name": "Six Count",
              "type": "PWA instalable",
              "year": "2026",
              "description": "Una aplicación ligera de entrenamiento de boxeo creada para una amiga que quería entrenar sin distracciones. Incluye asaltos de tres minutos, combinaciones de golpes anunciadas en voz alta en inglés y catalán, sonidos de campana sintetizados, modo de pantalla completa, wake lock y soporte offline.",
              "image": "src/assets/projects/six-count.webp",
              "imageAlt": "Six Count — aplicación temporizador de asaltos de boxeo",
              "repo": "https://github.com/maxalzamora/boxingapp",
              "live": "https://maxalzamora.github.io/boxingapp/",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/boxingapp",
              "tech": [
                "JavaScript",
                "HTML",
                "CSS",
                "Web APIs"
              ]
            }
          ]
        }
      ]
    },
    "contact": {
      "kicker": "04 — Contacto",
      "title": "Construyamos algo juntos.",
      "description": "Busco oportunidades de backend junior donde pueda aportar, crecer y poner en práctica mis habilidades. ¡Hablemos!",
      "note": "Siempre es un placer conectar y hablar de oportunidades.",
      "form": {
        "action": "",
        "submitLabel": "Enviar mensaje"
      },
      "links": [
        {
          "label": "Correo",
          "value": "maxalzamorawork@gmail.com",
          "href": "mailto:maxalzamorawork@gmail.com",
          "icon": "email"
        },
        {
          "label": "GitHub",
          "value": "github.com/maxalzamora",
          "href": "https://github.com/maxalzamora",
          "icon": "github"
        },
        {
          "label": "Linkedin",
          "value": "linkedin.com/in/maxalzamora",
          "href": "https://www.linkedin.com/in/maxalzamora/",
          "icon": "linkedin"
        }
      ]
    },
    "footer": {
      "tagline": "Desarrollador backend · Barcelona",
      "copyright": "© 2026 Max Alzamora",
      "builtWith": "Creado con HTML, CSS y JavaScript vanilla.",
      "backToTop": "Volver arriba"
    },
    "ui": {
      "skipToContent": "Saltar al contenido",
      "mainNavigation": "Navegación principal",
      "home": "inicio",
      "openMenu": "Abrir menú",
      "closeMenu": "Cerrar menú",
      "headerCta": "Hablemos",
      "language": "Idioma",
      "profileSummary": "Resumen del perfil",
      "coreStack": "Stack principal",
      "scrollToExplore": "Desplázate para explorar",
      "liveSite": "Ver sitio",
      "private": "Privado",
      "project": "proyecto",
      "projects": "proyectos",
      "projectFallback": "Proyecto",
      "formName": "Nombre",
      "formEmail": "Correo",
      "formSubject": "Asunto",
      "formMessage": "Mensaje",
      "formNamePlaceholder": "Ada Lovelace",
      "formEmailPlaceholder": "ada@example.com",
      "formSubjectPlaceholder": "Puesto backend junior",
      "formMessagePlaceholder": "Cuéntame sobre el puesto o el proyecto…",
      "sendMessage": "Enviar mensaje",
      "sending": "Enviando…",
      "noContactMethod": "Todavía no hay un método de contacto configurado.",
      "portfolioEnquiry": "Consulta sobre el portfolio",
      "openingEmail": "Abriendo tu aplicación de correo…",
      "messageSent": "Mensaje enviado. Gracias por escribir.",
      "sent": "Enviado",
      "genericError": "Algo ha ido mal. Inténtalo de nuevo.",
      "connectionError": "No se pudo conectar. Comprueba tu conexión e inténtalo de nuevo."
    },
    "theme": {
      "lightLabel": "Cambiar a modo oscuro",
      "darkLabel": "Cambiar a modo claro"
    }
  },
  ca:   {
    "meta": {
      "title": "Max Alzamora — Desenvolupador Backend Junior",
      "description": "Max Alzamora és un desenvolupador backend junior a Barcelona. Python, Django, SQL i sistemes nets i ben testejats.",
      "keywords": "Max Alzamora, Desenvolupador Backend Junior, Python, Django, SQL, Barcelona, Portfolio",
      "author": "Max Alzamora",
      "themeColor": "#f4f1e8",
      "locale": "ca_ES",
      "url": "https://maxalzamora.github.io/portfolio/",
      "ogImage": "https://maxalzamora.github.io/portfolio/src/assets/projects/portfolio.webp"
    },
    "identity": {
      "name": "Max Alzamora",
      "initials": "MA",
      "role": "Desenvolupador Backend Junior",
      "location": "Barcelona, Espanya",
      "availability": "Obert a llocs de backend junior"
    },
    "nav": [
      {
        "label": "Sobre mi",
        "href": "#about"
      },
      {
        "label": "Habilitats",
        "href": "#skills"
      },
      {
        "label": "Projectes",
        "href": "#projects"
      },
      {
        "label": "Contacte",
        "href": "#contact"
      }
    ],
    "hero": {
      "eyebrow": "Desenvolupador Backend Junior · Barcelona",
      "titleBefore": "On la ",
      "titleEmphasis": " creativitat ",
      "titleAfter": "esdevé funcionalitat.",
      "description": "Desenvolupador backend centrat en Java i Spring, amb formació en disseny gràfic i passió per construir coses. M'agrada resoldre problemes, treballar amb dades i convertir idees en programari funcional.",
      "primaryCta": {
        "label": "Explora la meva feina",
        "href": "#projects"
      },
      "secondaryCta": {
        "label": "Parlem",
        "href": "#contact"
      },
      "image": "src/assets/profile.webp",
      "imageAlt": "Max Alzamora, desenvolupador backend junior",
      "status": "Obert a treballar",
      "facts": [
        {
          "label": "Ubicació",
          "value": "Barcelona, Espanya"
        },
        {
          "label": "Enfocament",
          "value": "Java · Python · APIs REST"
        },
        {
          "label": "Trajectòria",
          "value": "Disseny · Programació · Dades"
        }
      ],
      "profile": {
        "name": "Max Alzamora",
        "role": "Desenvolupador Backend Junior",
        "note": "Una trajectòria creativa, una mentalitat tècnica i passió per construir coses útils.",
        "stack": [
          "Java",
          "Spring",
          "SQL",
          "Python"
        ],
        "availability": "Obert a oportunitats de backend junior"
      }
    },
    "about": {
      "kicker": "01 — Sobre mi",
      "title": "Unint disseny, dades i codi.",
      "paragraphs": [
        "Vaig estudiar <strong>música</strong> i <strong>disseny gràfic</strong>, i vaig passar més de 10 anys treballant com a dissenyador gràfic, sobretot com a freelance. Pel camí, em vaig interessar pel <strong>desenvolupament web</strong> i vaig acabar començant a <strong>programar videojocs</strong> com a desenvolupador autodidacte.",
        "Més recentment, he explorat el <strong>testing de software</strong> i l'<strong>anàlisi de dades</strong> abans de descobrir que el <strong>desenvolupament backend</strong> era en el que volia centrar-me. He completat una formació backend en Java i Spring, cobrint APIs REST, bases de dades, Git i testing automatitzat.",
        "Ara busco créixer com a desenvolupador backend, contribuir a projectes reals i aportar la meva creativitat, la meva capacitat de resolució de problemes i la meva experiència professional al desenvolupament de programari."
      ],
      "principles": [
        {
          "title": "Resolució creativa de problemes",
          "text": "Una perspectiva diferent, forjada per anys de treball creatiu i exploració tècnica."
        },
        {
          "title": "Atenció al detall",
          "text": "Un hàbit professional desenvolupat al llarg de més d'una dècada de treball en disseny."
        },
        {
          "title": "Aprenentatge autònom",
          "text": "Còmode explorant noves tecnologies, investigant solucions i aprenent construint."
        }
      ],
      "now": {
        "title": "Actualment",
        "text": "Consolidant les meves bases de desenvolupament backend amb projectes personals i pràctica contínua.",
        "items": [
          "Docker",
          "PostgreSQL",
          "Automatització de proves"
        ]
      }
    },
    "skills": {
      "kicker": "02 — Habilitats",
      "title": "Un conjunt d'eines tècniques en creixement.",
      "note": "Construït a través de formació reglada, projectes pràctics i experiència professional.",
      "categories": [
        {
          "title": "Backend",
          "items": [
            "Java",
            "Spring",
            "APIs REST",
            "JPA/Hibernate",
            "Python"
          ]
        },
        {
          "title": "Bases de dades",
          "items": [
            "SQL",
            "PostgreSQL",
            "MySQL"
          ]
        },
        {
          "title": "Testing i eines",
          "items": [
            "JUnit",
            "Automatització de proves",
            "Git"
          ]
        },
        {
          "title": "Dades i analítica",
          "items": [
            "Pandas",
            "Power BI",
            "Excel",
            "Scikit-learn",
            "Matplotlib",
            "Seaborn"
          ]
        },
        {
          "title": "Frontend",
          "items": [
            "JavaScript",
            "HTML",
            "CSS",
            "Wordpress"
          ]
        },
        {
          "title": "Competències transversals",
          "items": [
            "Aprenentatge autònom",
            "Creativitat",
            "Atenció al detall",
            "Adaptabilitat",
            "Organització"
          ]
        },
        {
          "title": "Idiomes",
          "items": [
            "Català — Natiu",
            "Castellà — Natiu",
            "Anglès — C1"
          ]
        }
      ]
    },
    "projects": {
      "kicker": "03 — Projectes",
      "title": "Projectes escollits.",
      "note": "Tres projectes que mostren com penso, construeixo i provo.",
      "categories": [
        {
          "title": "Backend i full-stack",
          "projects": [
            {
              "name": "SongTrove",
              "type": "Aplicació Django",
              "year": "2026",
              "description": "Una aplicació web en Django que va néixer de la necessitat de tenir un cançoner centralitzat, amb exactament les funcions que volia. Inclou comptes d'usuari, biblioteques personals, gestió de cançons, cerca i filtres, transposició d'acords al vol, càlcul del capo i una vista d'impressió neta.",
              "image": "src/assets/projects/songtrove.webp",
              "imageAlt": "SongTrove — biblioteca de fulls d'acords en mode fosc",
              "repo": "https://github.com/maxalzamora/songtrove",
              "live": "https://songtrove.pythonanywhere.com/",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/songtrove",
              "tech": [
                "Python",
                "Django",
                "MySQL"
              ]
            },
            {
              "name": "Cyanofy",
              "type": "Aplicació Spring Boot",
              "year": "2026",
              "description": "Una aplicació Spring Boot que converteix una fotografia en el negatiu digital que s'imprimeix en transparència per a poder fer <a class='inline-link' href='https://ca.wikipedia.org/wiki/Cianot%C3%ADpia' target='_blank' rel='noopener noreferrer'>cianotips</a>. La vaig construir per a la meva parella, que imparteix tallers de cianotipia i es trobava que gairebé totes les eines per crear negatius eren de pagament, així que aquesta cobreix tot el procés sense necessitat de tenir-ne: mapatge de tons basat en la densitat, exportació en TIFF de 16 bits i PDF a la mida de pàgina, una previsualització de la còpia final i calibratge a partir d'una còpia fotografiada.",
              "image": "src/assets/projects/cyanotypes.webp",
              "imageAlt": "Cyanotypes — formulari de pujada i la previsualització en blau de Prússia de la còpia que genera",
              "repo": "https://github.com/maxalzamora/cyanotype-maker",
              "live": "",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/cyanotype-maker",
              "tech": [
                "Java",
                "Spring Boot",
                "JUnit",
                "PDFBox"
              ]
            }
          ]
        },
        {
          "title": "Frontend i PWA",
          "projects": [
            {
              "name": "Six Count",
              "type": "PWA instal·lable",
              "year": "2026",
              "description": "Una aplicació lleugera d'entrenament de boxa creada per a una amiga que volia entrenar sense distraccions. Inclou assalts de tres minuts, combinacions de cops anunciades en veu alta en anglès i català, sons de campana sintetitzats, mode de pantalla completa, wake lock i suport offline.",
              "image": "src/assets/projects/six-count.webp",
              "imageAlt": "Six Count — aplicació temporitzador d'assalts de boxa",
              "repo": "https://github.com/maxalzamora/boxingapp",
              "live": "https://maxalzamora.github.io/boxingapp/",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/boxingapp",
              "tech": [
                "JavaScript",
                "HTML",
                "CSS",
                "Web APIs"
              ]
            }
          ]
        }
      ]
    },
    "contact": {
      "kicker": "04 — Contacte",
      "title": "Construïm alguna cosa junts.",
      "description": "Busco oportunitats de backend junior on pugui aportar, créixer i posar en pràctica les meves habilitats. Parlem!",
      "note": "Sempre és un plaer connectar i parlar d'oportunitats.",
      "form": {
        "action": "",
        "submitLabel": "Enviar missatge"
      },
      "links": [
        {
          "label": "Correu",
          "value": "maxalzamorawork@gmail.com",
          "href": "mailto:maxalzamorawork@gmail.com",
          "icon": "email"
        },
        {
          "label": "GitHub",
          "value": "github.com/maxalzamora",
          "href": "https://github.com/maxalzamora",
          "icon": "github"
        },
        {
          "label": "Linkedin",
          "value": "linkedin.com/in/maxalzamora",
          "href": "https://www.linkedin.com/in/maxalzamora/",
          "icon": "linkedin"
        }
      ]
    },
    "footer": {
      "tagline": "Desenvolupador backend · Barcelona",
      "copyright": "© 2026 Max Alzamora",
      "builtWith": "Creat amb HTML, CSS i JavaScript vanilla.",
      "backToTop": "Torna a dalt"
    },
    "ui": {
      "skipToContent": "Salta al contingut",
      "mainNavigation": "Navegació principal",
      "home": "inici",
      "openMenu": "Obre el menú",
      "closeMenu": "Tanca el menú",
      "headerCta": "Parlem",
      "language": "Idioma",
      "profileSummary": "Resum del perfil",
      "coreStack": "Stack principal",
      "scrollToExplore": "Desplaça't per explorar",
      "liveSite": "Veure web",
      "private": "Privat",
      "project": "projecte",
      "projects": "projectes",
      "projectFallback": "Projecte",
      "formName": "Nom",
      "formEmail": "Correu",
      "formSubject": "Assumpte",
      "formMessage": "Missatge",
      "formNamePlaceholder": "Ada Lovelace",
      "formEmailPlaceholder": "ada@example.com",
      "formSubjectPlaceholder": "Feina backend junior",
      "formMessagePlaceholder": "Explica'm sobre la feina o el projecte…",
      "sendMessage": "Enviar missatge",
      "sending": "Enviant…",
      "noContactMethod": "Encara no hi ha cap mètode de contacte configurat.",
      "portfolioEnquiry": "Consulta sobre el portfolio",
      "openingEmail": "Obrint la teva aplicació de correu…",
      "messageSent": "Missatge enviat. Gràcies per escriure.",
      "sent": "Enviat",
      "genericError": "Alguna cosa ha fallat. Torna-ho a provar.",
      "connectionError": "No s'ha pogut connectar. Comprova la connexió i torna-ho a provar."
    },
    "theme": {
      "lightLabel": "Canvia a mode fosc",
      "darkLabel": "Canvia a mode clar"
    }
  }
};
