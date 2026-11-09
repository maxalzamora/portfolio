# Max Alzamora — Portfolio

A static portfolio for **Max Alzamora**, a junior backend developer based in
Barcelona. Built with vanilla HTML, CSS and JavaScript — no framework and no
build step — so it can be hosted directly on GitHub Pages.

**Live site:** <https://maxalzamora.github.io/portfolio/>

## What is inside

- An editorial hero with a profile card, availability status and quick facts
- About section with principles and a "currently learning" panel
- Skills grouped into readable rows
- Alternating project rows with screenshots, tech tags and links
- A dark contact panel with a form and direct contact links
- Light and dark themes, saved in `localStorage`
- Responsive navigation, subtle scroll reveals and reduced-motion support
- No Contribution & Research section

The design is original to this portfolio: warm paper tones, teal accents,
Fraunces display type and a content-first layout.

## Edit the site

Almost everything lives in one file:

```text
src/data/content.js
```

Open it and change the object at the top of the file. You can edit:

- the page title, description, keywords, canonical URL and social preview image
- your name, initials, role, location and availability
- the navigation links
- the hero eyebrow, headline, description, buttons, facts and profile card
- the about paragraphs, principles and "currently" panel
- skill categories and tags
- project categories, projects, screenshots, links and tech tags
- contact copy, links and the contact form
- footer text and theme labels

Paragraph fields accept normal HTML, so you can use `<strong>bold</strong>` or
`<code>inline code</code>` where it helps.

### Add a project

Copy an object inside `projects.categories[].projects` and edit it:

```js
{
  name: "My New Project",
  type: "Django application",
  year: "2026",
  description: "What it does and what you learned.",
  image: "src/assets/projects/my-project.webp",
  imageAlt: "My New Project screenshot",
  repo: "https://github.com/maxalzamora/my-project",
  live: "",
  private: false,
  showStats: false,
  statsRepo: "maxalzamora/my-project",
  tech: ["Python", "Django", "SQLite"]
}
```

Leave `live` empty to hide the live-site link. Set `showStats` to `true` if you
want the project to fetch live star and fork counts from GitHub.

### Add or replace images

Put images in `src/assets/` or `src/assets/projects/` and point the matching
`image` field at them. WebP or PNG both work. Project images use a 16:10 crop,
so screenshots at roughly 1200 × 750 look best.

### Change the theme

The light palette is in `:root` at the top of `src/styles/main.css`. The dark
palette is in the `[data-theme="dark"]` block directly below it. Both use the
same token names, so changing `--accent` in each block is usually enough to
retheme the site.

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
  submitLabel: "Send message"
}
```

## Deploy to GitHub Pages

The site is static, so it publishes directly from the `main` branch at the
repository root.

If Pages is not enabled yet, do this once:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and **/ (root)**, then click **Save**.

After that, every push updates the site:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

The published URL is:

```text
https://maxalzamora.github.io/portfolio/
```

If you ever move the files to a new repository, enable Pages there in the same
way. For a clean `https://maxalzamora.github.io/` URL, name the repository
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
    │   └── main.js             # Rendering, theme, navigation and form
    ├── styles/
    │   └── main.css            # Design tokens, layout and responsive styles
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
- The contact form and project images work without any third-party services.
