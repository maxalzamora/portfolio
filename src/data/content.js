/* ============================================================================
   MAX ALZAMORA — PORTFOLIO CONTENT
   ----------------------------------------------------------------------------
   This is the only file you need to edit for day-to-day changes.

   Tips:
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
    titleBefore: "I build the ",
    titleEmphasis: "quiet parts",
    titleAfter: " of the web.",
    description:
      "I turn fuzzy requirements into clear data models, predictable endpoints and pages that load fast. Currently looking for my first backend role.",
    primaryCta: { label: "Explore my work", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    image: "src/assets/profile.webp",
    imageAlt: "Max Alzamora, junior backend developer",
    status: "Open to work",
    facts: [
      { label: "Based in", value: "Barcelona, Spain" },
      { label: "Focus", value: "Python · Django · SQL" },
      { label: "Learning", value: "Docker · APIs · CI/CD" }
    ],
    profile: {
      name: "Max Alzamora",
      role: "Junior Backend Developer",
      note: "I like small, well-tested systems that are easy to understand six months later.",
      stack: ["Python", "Django", "MySQL", "pytest"],
      availability: "Available for junior roles"
    }
  },

  about: {
    kicker: "01 — About",
    title: "Curious about the parts behind the screen.",
    paragraphs: [
      "I'm a backend developer based in <strong>Barcelona</strong>, focused on Python and Django. I enjoy turning fuzzy requirements into clear data models, predictable endpoints and pages that load fast.",
      "My main project is <strong>SongTrove</strong>, a private chord-sheet library built with Django, MySQL and server-rendered templates. It covers authentication, per-user data, CRUD, search, a ChordPro parser, on-the-fly transposition and a print view. The test suite runs in CI on every push.",
      "Right now I'm deepening my knowledge of <strong>SQL, testing, Docker and API design</strong>. I care about readable code, small commits and shipping things that work end to end."
    ],
    principles: [
      {
        title: "Readable first",
        text: "Code is read more often than it is written. I optimise for the next person who has to change it."
      },
      {
        title: "Test the edges",
        text: "Happy paths are easy. I care about permissions, empty states and the awkward cases in between."
      },
      {
        title: "Ship small",
        text: "Small commits, clear migrations and a working deploy beat a perfect branch that never lands."
      }
    ],
    now: {
      title: "Currently",
      text: "Going deeper into SQL, testing and the bits between the code and the server.",
      items: ["Docker", "PostgreSQL", "REST API design", "CI/CD"]
    }
  },

  skills: {
    kicker: "02 — Skills",
    title: "Tools I reach for.",
    note: "A practical stack, built through projects rather than tutorials.",
    categories: [
      {
        title: "Languages",
        items: ["Python", "SQL", "JavaScript", "HTML5", "CSS3", "Bash"]
      },
      {
        title: "Backend",
        items: [
          "Django",
          "Django ORM",
          "REST APIs",
          "Authentication",
          "Sessions",
          "Server-rendered templates",
          "CRUD",
          "Form validation"
        ]
      },
      {
        title: "Databases",
        items: ["MySQL", "SQLite", "Relational modelling", "Queries & indexes"]
      },
      {
        title: "Testing & tooling",
        items: [
          "pytest",
          "pytest-django",
          "Coverage",
          "Git",
          "GitHub Actions",
          "Linux"
        ]
      },
      {
        title: "Deployment",
        items: [
          "PythonAnywhere",
          "WhiteNoise",
          "Environment variables",
          "GitHub Pages"
        ]
      },
      {
        title: "Currently learning",
        items: ["Docker", "PostgreSQL", "REST API design", "CI/CD"]
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
              "A private chord-sheet library for the songs you actually play. Built with Django and MySQL, it handles sign-up and login, per-user libraries, CRUD, search and filters, ChordPro and plain-text imports, on-the-fly transposition, capo arithmetic and a clean print view. The test suite covers the parser, views and permissions, runs at 98% coverage, and is checked in CI on every push.",
            image: "src/assets/projects/songtrove.webp",
            imageAlt: "SongTrove — chord sheet library in dark mode",
            repo: "https://github.com/maxalzamora/songtrove",
            live: "",
            private: false,
            showStats: false,
            statsRepo: "maxalzamora/songtrove",
            tech: [
              "Python",
              "Django",
              "MySQL",
              "PyMySQL",
              "pytest",
              "GitHub Actions"
            ]
          },
          {
            name: "Portfolio",
            type: "Static site",
            year: "2026",
            description:
              "This site. A content-first portfolio built with vanilla HTML, CSS and JavaScript. Every section is rendered from one editable data file, there is no framework or build step, and it deploys straight to GitHub Pages.",
            image: "src/assets/projects/portfolio.webp",
            imageAlt: "Max Alzamora — portfolio website",
            repo: "https://github.com/maxalzamora/portfolio",
            live: "https://maxalzamora.github.io/portfolio/",
            private: false,
            showStats: false,
            statsRepo: "maxalzamora/portfolio",
            tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"]
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
              "A small boxing round timer that calls punch combinations out loud while you train. Three 3-minute rounds, voice cues in English and Catalan, a synthesized bell, fullscreen, wake lock and offline support. Installable as a PWA with no dependencies or build step.",
            image: "src/assets/projects/six-count.webp",
            imageAlt: "Six Count — boxing round timer app",
            repo: "https://github.com/maxalzamora/boxingapp",
            live: "",
            private: false,
            showStats: false,
            statsRepo: "maxalzamora/boxingapp",
            tech: [
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

  contact: {
    kicker: "04 — Contact",
    title: "Let's build something that works.",
    description:
      "I'm looking for a junior backend role where I can learn from people who care about the craft. If that sounds like your team, say hello.",
    note: "Usually replies within a day or two.",
    form: {
      // Leave empty to open the visitor's email app (mailto fallback).
      // Paste a Formspree endpoint such as https://formspree.io/f/xxxxxxx
      // here to use AJAX submission instead.
      action: "",
      submitLabel: "Send message"
    },
    links: [
      {
        label: "Email",
        value: "37882827+maxalzamora@users.noreply.github.com",
        href: "mailto:37882827+maxalzamora@users.noreply.github.com",
        icon: "email"
      },
      {
        label: "GitHub",
        value: "github.com/maxalzamora",
        href: "https://github.com/maxalzamora",
        icon: "github"
      }
      // Add LinkedIn (or any other link) when you have one:
      // { label: "LinkedIn", value: "linkedin.com/in/your-handle", href: "https://www.linkedin.com/in/your-handle/", icon: "linkedin" }
    ]
  },

  footer: {
    tagline: "Backend developer · Barcelona",
    copyright: "© 2026 Max Alzamora",
    builtWith: "Built with vanilla HTML, CSS and JavaScript.",
    backToTop: "Back to top"
  },

  theme: {
    lightLabel: "Switch to dark mode",
    darkLabel: "Switch to light mode"
  },

  debug: {
    // The design lab is a floating preview tool, not part of the content.
    // Set this to false before sharing the site. You can still open it with
    // ?debug=1 (or the Alt+Shift+D shortcut) while the flag is false.
    enabled: true,
    label: "Lab",
    title: "Design lab",
    note:
      "Preview palettes, type, texture and accent colour. Settings stay in this browser."
  }
};
