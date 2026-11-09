/* ============================================================================
   MAX ALZAMORA — PORTFOLIO CONTENT
   ----------------------------------------------------------------------------
   This is the only file you need to edit for day-to-day changes.

   Tips:
   • Text fields accept normal HTML, so <strong>bold</strong> works.
   • Add a project by copying an object inside `projects.categories[].projects`.
   • Add a skill by adding a string to `skills.categories[].items`.
   • Leave a link as "" to hide that button.
   • The contact form uses a mailto: fallback while `contact.form.action` is "".
     Paste a Formspree endpoint there if you want AJAX form submissions.
   ============================================================================ */

window.PORTFOLIO = {
  meta: {
    title: "Max Alzamora | Junior Backend Developer",
    description:
      "Max Alzamora — Junior Backend Developer in Barcelona. Python, Django, SQL and clean, tested backend systems.",
    keywords:
      "Max Alzamora, Junior Backend Developer, Python, Django, SQL, Barcelona, Portfolio",
    author: "Max Alzamora",
    themeColor: "#0a0b0d"
  },

  identity: {
    name: "Max Alzamora",
    logo: "<MA/>",
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
    greeting: ">> Hello world, I'm",
    name: "Max Alzamora",
    roles: [
      "Junior Backend Developer",
      "Python & Django",
      "SQL & data modelling",
      "Testing what I ship"
    ],
    description:
      "I build server-rendered Django applications, design relational data models and write tests that keep things honest. Looking for my first backend role.",
    buttons: [
      { label: "View Projects", href: "#projects", style: "primary" },
      { label: "Contact Me", href: "#contact", style: "secondary" }
    ],
    image: "src/assets/profile.webp",
    imageAlt: "Max Alzamora — Junior Backend Developer",
    status: {
      prompt: "STATUS",
      value: "OPEN TO WORK"
    }
  },

  about: {
    title: "About Me",
    paragraphs: [
      "I'm a backend developer based in <strong>Barcelona</strong>, focused on Python and Django. I enjoy turning fuzzy requirements into clear data models, predictable endpoints and pages that load fast.",
      "My main project is <strong>SongTrove</strong>, a private chord-sheet library built with Django, MySQL and server-rendered templates. It covers authentication, per-user data, CRUD, search, a ChordPro parser, on-the-fly transposition and a print view. The test suite runs in CI on every push.",
      "Right now I'm deepening my knowledge of <strong>SQL, testing, Docker and API design</strong>. I care about readable code, small commits and shipping things that work end to end."
    ],
    terminalTitle: "songtrove.sh",
    terminalLines: [
      { type: "command", text: "python manage.py check" },
      { type: "output", text: "System check identified no issues (0 silenced)." },
      { type: "command", text: "pytest --cov=songs --cov=accounts" },
      { type: "output", text: "........................................................ [100%]" },
      { type: "output", text: "98% coverage — 112 passed in 4.21s" },
      { type: "command", text: "python manage.py makemigrations --check --dry-run" },
      { type: "output", text: "No changes detected" },
      { type: "command", text: "python manage.py seed_songs --user max" },
      { type: "output", text: "Seeded 8 public-domain songs." },
      { type: "command", text: "curl -s localhost:8000/healthz" },
      { type: "output", text: "ok" },
      { type: "command", text: "git log --oneline -3" },
      { type: "output", text: "a1b2c3d feat: full-width full view" },
      { type: "output", text: "d4e5f6a test: close the gaps in the test suite" },
      { type: "output", text: "9f8e7d6 docs: add a README with screenshots" }
    ]
  },

  skills: {
    title: "Skills",
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
        title: "Testing & Tooling",
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
        title: "Currently Learning",
        items: ["Docker", "PostgreSQL", "REST API design", "CI/CD"]
      }
    ]
  },

  projects: {
    title: "Projects",
    categories: [
      {
        title: "Backend & Full-Stack",
        projects: [
          {
            name: "SongTrove",
            description:
              "A private chord-sheet library for the songs you actually play. Built with Django and MySQL, it handles sign-up and login, per-user libraries, CRUD, search and filters, ChordPro and plain-text imports, on-the-fly transposition, capo arithmetic and a clean print view. The test suite covers the parser, views and permissions, runs at 98% coverage, and is checked in CI on every push.",
            image: "src/assets/projects/songtrove.webp",
            imageAlt: "SongTrove — chord sheet library in dark mode",
            repo: "https://github.com/maxalzamora/songtrove",
            live: "",
            private: false,
            featured: true,
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
            description:
              "This site. A static portfolio built with vanilla HTML, CSS and JavaScript, with every piece of content in a single editable data file. No framework, no build step, and it deploys straight to GitHub Pages.",
            image: "src/assets/projects/portfolio.webp",
            imageAlt: "Max Alzamora — portfolio website",
            repo: "https://github.com/maxalzamora/portfolio",
            live: "https://maxalzamora.github.io/portfolio/",
            private: false,
            featured: true,
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
            description:
              "A small boxing round timer that calls punch combinations out loud while you train. Three 3-minute rounds, voice cues in English and Catalan, a synthesized bell, fullscreen, wake lock and offline support. Installable as a PWA with no dependencies or build step.",
            image: "src/assets/projects/six-count.webp",
            imageAlt: "Six Count — boxing round timer app",
            repo: "https://github.com/maxalzamora/boxingapp",
            live: "",
            private: false,
            featured: true,
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
    title: "Contact",
    form: {
      // Leave empty to open the visitor's email app (mailto fallback).
      // Paste a Formspree endpoint such as https://formspree.io/f/xxxxxxx
      // here to use AJAX submission instead.
      action: "",
      submitLabel: "Send Message"
    },
    links: [
      {
        label: "Email",
        href: "mailto:37882827+maxalzamora@users.noreply.github.com",
        icon: "email"
      },
      {
        label: "GitHub",
        href: "https://github.com/maxalzamora",
        icon: "github"
      }
      // Add LinkedIn (or any other link) when you have one:
      // { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle/", icon: "linkedin" }
    ]
  },

  footer: {
    copyright: "© 2026 Max Alzamora.",
    location: "Barcelona, Spain",
    handle: "# maxalzamora",
    tagline: "Built with vanilla HTML, CSS and JavaScript."
  },

  theme: {
    initialTooltip: "// Safety Protocol Active",
    messages: [
      "// Safety Protocol Active",
      "// My eyes! It's way too bright!",
      "// Dark mode is the only way, sorry!",
      "// Once you go dark, you never go back.",
      "// Who actually uses light mode?",
      "// Eyes haven't seen the sun in years.",
      "// Keeping things easy on the eyes.",
      "// Light Mode = Eye Burn. Staying in the dark.",
      "// The dark side has better code.",
      "// Retinal safety protocol active.",
      "// Nice try! But we stay in the shadows.",
      "// Error: Sun is too bright. Stay in the room.",
      "// Light mode is for lightbulbs.",
      "// We don't do that here.",
      "// Is it morning already? No thanks.",
      "// My eyes are happier this way.",
      "// Save your eyes, stay in the dark.",
      "// Too bright! Switching back...",
      "// Dark mode: 100%, Light mode: 0%.",
      "// Light mode not found. Did you mean: dark?",
      "// 404: sunlight not available in this region"
    ]
  }
};
