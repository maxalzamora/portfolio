/* ============================================================================
   MAX ALZAMORA — PORTFOLIO CONTENT
   ----------------------------------------------------------------------------
   This is the only file you need to edit for day-to-day changes.

   Tips:
   • English lives in `window.PORTFOLIO`; Spanish and Catalan live in
     `window.PORTFOLIO_LANGUAGES` at the bottom of this file.
   • Each language is a complete copy, including links and interface strings.
     Update shared details in all three language objects.
   • Paragraph fields accept normal HTML, so <strong>bold</strong> works.
   • Add a project by copying an object inside `projects.categories[].projects`.
   • Add a skill by adding a string to `skills.categories[].items`.
   • Leave a link as "" to hide that button.
   • The contact form uses a mailto: fallback while `contact.form.action` is "".
     Paste a Formspree endpoint there if you want AJAX form submissions.
   ============================================================================ */

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
      "titleBefore": "Construyo las ",
      "titleEmphasis": "partes silenciosas",
      "titleAfter": " de la web.",
      "description": "Convierto requisitos difusos en modelos de datos claros, endpoints predecibles y páginas que cargan rápido. Ahora mismo busco mi primer puesto en backend.",
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
          "value": "Python · Django · SQL"
        },
        {
          "label": "Aprendiendo",
          "value": "Docker · APIs · CI/CD"
        }
      ],
      "profile": {
        "name": "Max Alzamora",
        "role": "Desarrollador Backend Junior",
        "note": "Me gustan los sistemas pequeños y bien testeados que se entienden fácilmente seis meses después.",
        "stack": [
          "Python",
          "Django",
          "MySQL",
          "pytest"
        ],
        "availability": "Disponible para puestos junior"
      }
    },
    "about": {
      "kicker": "01 — Sobre mí",
      "title": "Curioso por las partes que hay detrás de la pantalla.",
      "paragraphs": [
        "Soy un desarrollador backend que vive en <strong>Barcelona</strong>, centrado en Python y Django. Disfruto convirtiendo requisitos difusos en modelos de datos claros, endpoints predecibles y páginas que cargan rápido.",
        "Mi proyecto principal es <strong>SongTrove</strong>, una biblioteca privada de hojas de acordes creada con Django, MySQL y plantillas renderizadas en el servidor. Cubre autenticación, datos por usuario, CRUD, búsqueda, un parser de ChordPro, transposición al vuelo y una vista de impresión. La suite de tests se ejecuta en CI en cada push.",
        "Ahora mismo estoy profundizando en <strong>SQL, testing, Docker y diseño de APIs</strong>. Me importa el código legible, los commits pequeños y entregar cosas que funcionen de principio a fin."
      ],
      "principles": [
        {
          "title": "Primero, legible",
          "text": "El código se lee más a menudo de lo que se escribe. Optimizo para la siguiente persona que tenga que cambiarlo."
        },
        {
          "title": "Prueba los bordes",
          "text": "Los caminos felices son fáciles. Me importan los permisos, los estados vacíos y los casos incómodos intermedios."
        },
        {
          "title": "Entrega en pequeño",
          "text": "Commits pequeños, migraciones claras y un despliegue que funciona superan una rama perfecta que nunca llega a producción."
        }
      ],
      "now": {
        "title": "Actualmente",
        "text": "Profundizando en SQL, testing y las piezas entre el código y el servidor.",
        "items": [
          "Docker",
          "PostgreSQL",
          "Diseño de APIs REST",
          "CI/CD"
        ]
      }
    },
    "skills": {
      "kicker": "02 — Habilidades",
      "title": "Herramientas que uso.",
      "note": "Un stack práctico, construido con proyectos más que con tutoriales.",
      "categories": [
        {
          "title": "Lenguajes",
          "items": [
            "Python",
            "SQL",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Bash"
          ]
        },
        {
          "title": "Backend",
          "items": [
            "Django",
            "Django ORM",
            "APIs REST",
            "Autenticación",
            "Sesiones",
            "Plantillas renderizadas en el servidor",
            "CRUD",
            "Validación de formularios"
          ]
        },
        {
          "title": "Bases de datos",
          "items": [
            "MySQL",
            "SQLite",
            "Modelado relacional",
            "Consultas e índices"
          ]
        },
        {
          "title": "Testing y herramientas",
          "items": [
            "pytest",
            "pytest-django",
            "Cobertura",
            "Git",
            "GitHub Actions",
            "Linux"
          ]
        },
        {
          "title": "Despliegue",
          "items": [
            "PythonAnywhere",
            "WhiteNoise",
            "Variables de entorno",
            "GitHub Pages"
          ]
        },
        {
          "title": "Aprendiendo ahora",
          "items": [
            "Docker",
            "PostgreSQL",
            "Diseño de APIs REST",
            "CI/CD"
          ]
        }
      ]
    },
    "projects": {
      "kicker": "03 — Proyectos",
      "title": "Trabajo seleccionado.",
      "note": "Tres proyectos que muestran cómo pienso, construyo y pruebo.",
      "categories": [
        {
          "title": "Backend y full-stack",
          "projects": [
            {
              "name": "SongTrove",
              "type": "Aplicación Django",
              "year": "2026",
              "description": "Una biblioteca privada de hojas de acordes para las canciones que de verdad tocas. Creada con Django y MySQL, gestiona registro e inicio de sesión, bibliotecas por usuario, CRUD, búsqueda y filtros, importación de ChordPro y texto plano, transposición al vuelo, aritmética de cejilla y una vista de impresión limpia. La suite de tests cubre el parser, las vistas y los permisos, alcanza el 98% de cobertura y se comprueba en CI en cada push.",
              "image": "src/assets/projects/songtrove.webp",
              "imageAlt": "SongTrove — biblioteca de hojas de acordes en modo oscuro",
              "repo": "https://github.com/maxalzamora/songtrove",
              "live": "",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/songtrove",
              "tech": [
                "Python",
                "Django",
                "MySQL",
                "PyMySQL",
                "pytest",
                "GitHub Actions"
              ]
            },
            {
              "name": "Portfolio",
              "type": "Sitio estático",
              "year": "2026",
              "description": "Este sitio. Un portfolio centrado en el contenido, creado con HTML, CSS y JavaScript vanilla. Cada sección se renderiza desde un único archivo de datos editable, no hay framework ni build step, y se despliega directamente en GitHub Pages.",
              "image": "src/assets/projects/portfolio.webp",
              "imageAlt": "Max Alzamora — sitio web del portfolio",
              "repo": "https://github.com/maxalzamora/portfolio",
              "live": "https://maxalzamora.github.io/portfolio/",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/portfolio",
              "tech": [
                "HTML5",
                "CSS3",
                "JavaScript",
                "GitHub Pages"
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
              "description": "Un pequeño temporizador de asaltos de boxeo que canta combinaciones de golpes en voz alta mientras entrenas. Tres asaltos de 3 minutos, indicaciones de voz en inglés y catalán, una campana sintetizada, pantalla completa, wake lock y soporte offline. Instalable como PWA sin dependencias ni build step.",
              "image": "src/assets/projects/six-count.webp",
              "imageAlt": "Six Count — aplicación temporizador de asaltos de boxeo",
              "repo": "https://github.com/maxalzamora/boxingapp",
              "live": "",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/boxingapp",
              "tech": [
                "JavaScript",
                "Web Speech API",
                "Web Audio API",
                "Service Worker",
                "PWA"
              ]
            }
          ]
        }
      ]
    },
    "contact": {
      "kicker": "04 — Contacto",
      "title": "Construyamos algo que funcione.",
      "description": "Busco un puesto backend junior donde pueda aprender de gente a la que le importe el oficio. Si eso suena a tu equipo, escríbeme.",
      "note": "Normalmente respondo en un día o dos.",
      "form": {
        "action": "",
        "submitLabel": "Enviar mensaje"
      },
      "links": [
        {
          "label": "Correo",
          "value": "37882827+maxalzamora@users.noreply.github.com",
          "href": "mailto:37882827+maxalzamora@users.noreply.github.com",
          "icon": "email"
        },
        {
          "label": "GitHub",
          "value": "github.com/maxalzamora",
          "href": "https://github.com/maxalzamora",
          "icon": "github"
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
      "titleBefore": "Construeixo les ",
      "titleEmphasis": "parts silencioses",
      "titleAfter": " de la web.",
      "description": "Transformo requisits difusos en models de dades clars, endpoints previsibles i pàgines que carreguen ràpid. Ara mateix busco la meva primera feina en backend.",
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
          "value": "Python · Django · SQL"
        },
        {
          "label": "Aprenent",
          "value": "Docker · APIs · CI/CD"
        }
      ],
      "profile": {
        "name": "Max Alzamora",
        "role": "Desenvolupador Backend Junior",
        "note": "M'agraden els sistemes petits i ben testejats que s'entenen fàcilment sis mesos després.",
        "stack": [
          "Python",
          "Django",
          "MySQL",
          "pytest"
        ],
        "availability": "Disponible per a llocs junior"
      }
    },
    "about": {
      "kicker": "01 — Sobre mi",
      "title": "Curiós per les parts que hi ha darrere de la pantalla.",
      "paragraphs": [
        "Sóc un desenvolupador backend que viu a <strong>Barcelona</strong>, centrat en Python i Django. M'agrada convertir requisits difusos en models de dades clars, endpoints previsibles i pàgines que carreguen ràpid.",
        "El meu projecte principal és <strong>SongTrove</strong>, una biblioteca privada de fulls d'acords creada amb Django, MySQL i plantilles renderitzades al servidor. Cobreix autenticació, dades per usuari, CRUD, cerca, un parser de ChordPro, transposició al vol i una vista d'impressió. La suite de tests s'executa a CI a cada push.",
        "Ara mateix estic aprofundint en <strong>SQL, testing, Docker i disseny d'APIs</strong>. M'importa el codi llegible, els commits petits i lliurar coses que funcionin de principi a fi."
      ],
      "principles": [
        {
          "title": "Primer, llegible",
          "text": "El codi es llegeix més sovint del que s'escriu. Optimitzo per a la següent persona que l'hagi de canviar."
        },
        {
          "title": "Prova les vores",
          "text": "Els camins feliços són fàcils. M'importen els permisos, els estats buits i els casos incòmodes entremig."
        },
        {
          "title": "Lliura en petit",
          "text": "Commits petits, migracions clares i un desplegament que funciona superen una branca perfecta que mai arriba a producció."
        }
      ],
      "now": {
        "title": "Actualment",
        "text": "Aprofundint en SQL, testing i les peces entre el codi i el servidor.",
        "items": [
          "Docker",
          "PostgreSQL",
          "Disseny d'APIs REST",
          "CI/CD"
        ]
      }
    },
    "skills": {
      "kicker": "02 — Habilitats",
      "title": "Eines que faig servir.",
      "note": "Un stack pràctic, construït amb projectes més que amb tutorials.",
      "categories": [
        {
          "title": "Llenguatges",
          "items": [
            "Python",
            "SQL",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Bash"
          ]
        },
        {
          "title": "Backend",
          "items": [
            "Django",
            "Django ORM",
            "APIs REST",
            "Autenticació",
            "Sessions",
            "Plantilles renderitzades al servidor",
            "CRUD",
            "Validació de formularis"
          ]
        },
        {
          "title": "Bases de dades",
          "items": [
            "MySQL",
            "SQLite",
            "Modelatge relacional",
            "Consultes i índexs"
          ]
        },
        {
          "title": "Testing i eines",
          "items": [
            "pytest",
            "pytest-django",
            "Cobertura",
            "Git",
            "GitHub Actions",
            "Linux"
          ]
        },
        {
          "title": "Desplegament",
          "items": [
            "PythonAnywhere",
            "WhiteNoise",
            "Variables d'entorn",
            "GitHub Pages"
          ]
        },
        {
          "title": "Aprenent ara",
          "items": [
            "Docker",
            "PostgreSQL",
            "Disseny d'APIs REST",
            "CI/CD"
          ]
        }
      ]
    },
    "projects": {
      "kicker": "03 — Projectes",
      "title": "Feina seleccionada.",
      "note": "Tres projectes que mostren com penso, construeixo i provo.",
      "categories": [
        {
          "title": "Backend i full-stack",
          "projects": [
            {
              "name": "SongTrove",
              "type": "Aplicació Django",
              "year": "2026",
              "description": "Una biblioteca privada de fulls d'acords per a les cançons que realment toques. Creada amb Django i MySQL, gestiona registre i inici de sessió, biblioteques per usuari, CRUD, cerca i filtres, importació de ChordPro i text pla, transposició al vol, aritmètica del capot i una vista d'impressió neta. La suite de tests cobreix el parser, les vistes i els permisos, arriba al 98% de cobertura i es comprova a CI a cada push.",
              "image": "src/assets/projects/songtrove.webp",
              "imageAlt": "SongTrove — biblioteca de fulls d'acords en mode fosc",
              "repo": "https://github.com/maxalzamora/songtrove",
              "live": "",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/songtrove",
              "tech": [
                "Python",
                "Django",
                "MySQL",
                "PyMySQL",
                "pytest",
                "GitHub Actions"
              ]
            },
            {
              "name": "Portfolio",
              "type": "Lloc estàtic",
              "year": "2026",
              "description": "Aquest lloc. Un portfolio centrat en el contingut, creat amb HTML, CSS i JavaScript vanilla. Cada secció es renderitza des d'un únic fitxer de dades editable, no hi ha framework ni build step, i es desplega directament a GitHub Pages.",
              "image": "src/assets/projects/portfolio.webp",
              "imageAlt": "Max Alzamora — lloc web del portfolio",
              "repo": "https://github.com/maxalzamora/portfolio",
              "live": "https://maxalzamora.github.io/portfolio/",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/portfolio",
              "tech": [
                "HTML5",
                "CSS3",
                "JavaScript",
                "GitHub Pages"
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
              "description": "Un petit temporitzador d'assalts de boxa que canta combinacions de cops en veu alta mentre entrenes. Tres assalts de 3 minuts, indicacions de veu en anglès i català, una campana sintetitzada, pantalla completa, wake lock i suport offline. Instal·lable com a PWA sense dependències ni build step.",
              "image": "src/assets/projects/six-count.webp",
              "imageAlt": "Six Count — aplicació temporitzador d'assalts de boxa",
              "repo": "https://github.com/maxalzamora/boxingapp",
              "live": "",
              "private": false,
              "showStats": false,
              "statsRepo": "maxalzamora/boxingapp",
              "tech": [
                "JavaScript",
                "Web Speech API",
                "Web Audio API",
                "Service Worker",
                "PWA"
              ]
            }
          ]
        }
      ]
    },
    "contact": {
      "kicker": "04 — Contacte",
      "title": "Construïm alguna cosa que funcioni.",
      "description": "Busco una feina backend junior on pugui aprendre de gent a qui li importi l'ofici. Si això sona al teu equip, escriu-me.",
      "note": "Normalment responc en un dia o dos.",
      "form": {
        "action": "",
        "submitLabel": "Enviar missatge"
      },
      "links": [
        {
          "label": "Correu",
          "value": "37882827+maxalzamora@users.noreply.github.com",
          "href": "mailto:37882827+maxalzamora@users.noreply.github.com",
          "icon": "email"
        },
        {
          "label": "GitHub",
          "value": "github.com/maxalzamora",
          "href": "https://github.com/maxalzamora",
          "icon": "github"
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
      "liveSite": "Veure lloc",
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
