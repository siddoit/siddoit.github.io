# Sidharth Sajith — Portfolio

A minimal, modern engineering portfolio website for a **Robotics & Automation Engineer** specializing in Embedded Systems, Edge AI, and Autonomous Systems. Built with vanilla HTML5, modern CSS3, and JavaScript — zero frameworks or heavy runtime dependencies.

**[Live Website](https://siddoit.github.io/)**

---

## Features

- **Theme Toggle with Zero FOUC** — early execution script prevents dark/light mode flashing, respecting user preference and system settings (`prefers-color-scheme`).
- **Idempotent Safe Build Pipeline** — `build.js` generates standard `sitemap.xml`, RSS `feed.xml`, and static blog previews while treating authored articles as immutable source material.
- **Accessible & Responsive** — WCAG AA contrast compliance, keyboard focus rings (`:focus-visible`), skip links (`#main`), and mobile navigation scroll locking.
- **Project Filter & Companion Stories** — interactive category filtering on projects, bidirectional cross-linking between deep-dive engineering projects and companion articles.
- **Print & Performance Optimized** — clean print stylesheets for resumes and detail pages, system-font fallbacks, and zero layout-shift styling.
- **SEO & Metadata Complete** — OpenGraph, Twitter Cards, Schema.org `Person` JSON-LD, standard XML sitemaps, and robots directives configured for `https://siddoit.github.io/`.

---

## Tech Stack

| Layer       | Technology                                                        |
| ----------- | ----------------------------------------------------------------- |
| Structure   | Semantic HTML5                                                    |
| Styling     | Modern CSS3 (Custom properties, CSS Grid, Flexbox, media queries) |
| Logic       | Vanilla JavaScript (ES6+)                                         |
| Build & SEO | Node.js generator (`build.js`) for Sitemaps, Feeds & Hydration    |
| Typography  | [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |

---

## Project Structure

```
portfolio/
├── index.html              # Homepage (Hero, About, Featured Projects, Recent Posts)
├── projects.html           # Projects grid with category filters
├── blog.html               # Blog listing page
├── cv.html                 # Comprehensive curriculum vitae
├── contact.html            # Contact form with honeypot protection & direct links
├── style.css               # Shared CSS design system & responsive layout rules
├── script.js               # Global UI interactivity (theme, menu, filters, copy buttons)
├── build.js                # Build script for static blog previews, sitemap & RSS feed
├── sitemap.xml             # Search engine sitemap
├── feed.xml                # RSS 2.0 blog feed
├── robots.txt              # Search crawler directives
├── README.md               # Documentation
│
├── blog/
│   ├── post-template.html  # Standard template for authoring new posts
│   └── <slug>.html         # Authored deep-dive technical articles
├── projects/
│   └── <project>.html      # Detailed project engineering pages
│
└── assets/
    ├── js/
    │   ├── posts.js        # Blog metadata database
    │   └── blog.js         # Client-side fallback renderer
    ├── icons/
    │   ├── favicon.svg     # Initials favicon
    │   └── profile-placeholder.svg
    ├── images/
    │   ├── pic1.jpeg       # High-contrast portrait
    │   └── pic2.jpeg       # Primary portfolio portrait (natural background)
    └── resume/
        └── Sidharth_Sajith_Resume.pdf  # Canonical resume PDF
```

---

## Writing a Blog Post

1. Copy `blog/post-template.html` to `blog/<your-slug>.html` and author your article.
2. Add your post metadata to `assets/js/posts.js`:
   ```javascript
   {
     slug: "your-slug",
     title: "Your Post Title",
     date: "2026-07-20",
     excerpt: "One-line summary for cards and search feeds.",
     tags: ["Edge AI", "Robotics"]
   }
   ```
3. Run the safe build generator:
   ```bash
   node build.js
   ```
   This generates static card previews for `index.html` and `blog.html`, updates `sitemap.xml`, and regenerates `feed.xml` without touching your authored article files.

---

## Local Development

No compiler or bundler required:

```bash
# Option 1: Serve locally (recommended for fonts and assets)
npx serve .
# or
python -m http.server 8080
```

---

## Deploy to GitHub Pages

The repository `siddoit.github.io` automatically deploys directly to the root domain `https://siddoit.github.io/`:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

---

## License

MIT &copy; Sidharth Sajith
