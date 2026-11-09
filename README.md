# Max Alzamora — Portfolio

A static portfolio for **Max Alzamora**, a junior backend developer based in
Barcelona. Built with vanilla HTML, CSS and JavaScript — no framework and no
build step — so it can be hosted directly on GitHub Pages.

**Live site:** <https://maxalzamora.github.io/portfolio/>

## What is inside

- Hero with animated typing and a terminal-style status bar
- About section with an animated terminal
- Skills grouped by category
- Project cards with screenshots, links and optional live GitHub stats
- Contact form and contact links
- Dark terminal aesthetic, glitch effects, scroll progress and a lightbox
- Fully responsive, with a mobile navigation drawer

The **Contribution & Research** section from the original design has been
intentionally left out.

## Edit the site

Almost everything lives in one file:

```text
src/data/content.js
```

Open it and change the object at the top of the file. You can edit:

- the page title, description and keywords
- your name, logo, location and availability
- the hero greeting, roles, description and buttons
- the about paragraphs and terminal animation lines
- skill categories and tags
- project categories, projects, screenshots, links and tech tags
- contact links and the contact form
- the footer text
- the theme-toggle easter-egg messages

Text fields accept normal HTML, so you can use `<strong>bold</strong>` or
`<code>inline code</code>` where it helps.

### Add a project

Copy an object inside `projects.categories[].projects` and edit it:

```js
{
  name: "My New Project",
  description: "What it does and what you learned.",
  image: "src/assets/projects/my-project.webp",
  imageAlt: "My New Project screenshot",
  repo: "https://github.com/maxalzamora/my-project",
  live: "",
  private: false,
  featured: true,
  showStats: false,
  statsRepo: "maxalzamora/my-project",
  tech: ["Python", "Django", "SQLite"]
}
```

Leave `live` empty to hide the Live Demo button. Set `showStats` to `true` if
you want the card to fetch live star and fork counts from GitHub.

### Add or replace images

Put images in `src/assets/` or `src/assets/projects/` and point the matching
`image` field at them. WebP or PNG both work. The project cards use a 16:9 crop,
so screenshots at roughly 1200 × 675 look best.

## Preview locally

No dependencies are needed. From the project folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

> Use a local server rather than opening `index.html` directly. The browser
> needs to load `content.js` and the local fonts and images.

## Contact form

The form has two modes:

1. **Default (no backend):** the visitor's email app opens with the subject and
   message already filled in. This works on GitHub Pages.
2. **Formspree:** paste your endpoint into `contact.form.action` in
   `src/data/content.js` and the form submits over AJAX instead:

```js
form: {
  action: "https://formspree.io/f/your-id",
  submitLabel: "Send Message"
}
```

## Deploy to GitHub Pages

This repository is already set up to publish from the `main` branch at the
repository root. After editing:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Pages rebuilds automatically. The published URL is:

```text
https://maxalzamora.github.io/portfolio/
```

If you ever move the files to a new repository, enable **Settings → Pages →
Build and deployment → Deploy from a branch → main / (root)**. For a clean
`https://maxalzamora.github.io/` URL, name the repository
`maxalzamora.github.io`.

The `.nojekyll` file tells GitHub Pages to serve the files exactly as they are,
without Jekyll processing.

## Project structure

```text
.
├── index.html                  # Page shell and section mount points
├── .nojekyll                   # Skip Jekyll on GitHub Pages
├── README.md
└── src/
    ├── data/
    │   └── content.js          # ← edit this for content changes
    ├── scripts/
    │   └── main.js             # Rendering and interactions
    ├── styles/
    │   └── main.css            # Design tokens, layout and animations
    └── assets/
        ├── favicon.svg
        ├── profile.webp
        ├── fonts/
        └── projects/
```

## Notes

- The email address in `content.js` is a GitHub noreply address. Replace it with
  your real contact email before sharing the site widely.
- To add LinkedIn, uncomment the example in `contact.links` and add your URL.
- The original visual direction was inspired by
  [KrAsH-CoD3/krash-cod3.github.io](https://github.com/KrAsH-CoD3/krash-cod3.github.io).
  The content, projects and copy here are specific to Max Alzamora.
