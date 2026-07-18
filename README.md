# Sidharth Sajith — Portfolio

A minimal, modern **dark-themed** portfolio website for a **Robotics & Automation Engineer**. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools.

🔗 **[Live Demo](https://siddoit.github.io/portfolio/)**

---

## ✨ Features

- **Single-page layout** — clean, distraction-free navigation
- **Dark theme** — easy on the eyes with blue accent highlights
- **Fully responsive** — adapts seamlessly from mobile to ultrawide
- **Smooth scroll-triggered animations** — elements fade in as you scroll
- **Sticky navbar** with active-section highlighting
- **Mobile hamburger menu** with accessibility (Escape key, outside-click close)
- **SEO-optimized** — semantic HTML, meta tags, Open Graph, structured data
- **Zero frameworks** — pure HTML, CSS, JavaScript
- **Fast load times** — no heavy dependencies

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Structure | HTML5 (semantic)                    |
| Styling   | CSS3 (custom properties, grid, flex)|
| Logic     | Vanilla JavaScript (ES6+)           |
| Fonts     | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML page
├── style.css               # All styles (variables, layout, components)
├── script.js               # Interactivity (scroll, menu, animations, active nav)
├── README.md               # This file
│
├── blog.html               # Blog index (cards render automatically)
├── blog/
│   ├── post-template.html  # Copy this for each new post
│   └── <slug>.html         # Individual post pages
├── projects.html           # Projects grid
└── projects/
    └── <project>.html      # Individual project detail pages
│
└── assets/
    ├── js/
    │   ├── posts.js         # Blog post metadata (add an entry per post)
    │   └── blog.js          # Renders blog cards from posts.js
    ├── icons/
    │   ├── favicon.svg         # SS initials favicon
    │   └── profile-placeholder.svg  # Circuit-style profile avatar
    ├── images/
    │   └── (optional profile.jpg / project thumbnails)
    └── resume/
        └── Sidharth_Sajith_Resume.pdf  # Canonical resume PDF
```

---

## ✍️ Writing a Blog Post

The blog is JSON-driven — you never hand-edit cards.

1. Copy `blog/post-template.html` to `blog/<your-slug>.html` and write your content.
2. Open `assets/js/posts.js` and add an entry:
   ```javascript
   {
     slug: "your-slug",
     title: "Your Post Title",
     date: "2026-07-20",
     excerpt: "One-line summary.",
     tags: ["Edge AI", "Jetson"]
   }
   ```
3. That's it. `blog.html` and the "Recent Posts" list on `index.html` update automatically.
   Newest posts sort to the top. Posts are linked as `blog/<slug>.html`.

---

## 🛠️ Adding a Project

1. Copy an existing `projects/<project>.html` and fill in the content.
2. Add a card to `projects.html` pointing to it.
3. Give it a consistent footer: a `.project-footer` with GitHub/Demo links and tech tags.

---

## 🚀 Local Development

No build step needed — just open the file:

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve locally (recommended for fonts/assets)
npx serve .
# or
python -m http.server 8080
```

---

## 🌐 Deploy to GitHub Pages

1. Create a repository named `portfolio` on GitHub
2. Push your local files:
   ```bash
   git init && git add . && git commit -m 'Initial commit'
   git remote add origin https://github.com/siddoit/portfolio.git
   git push -u origin main
   ```
3. Go to Repo **Settings** → **Pages** → Source: `main` branch → **Save**
4. Your site will be live at `https://siddoit.github.io/portfolio/`

---

## 🎨 Customization

- **Colors**: Edit CSS variables in `:root` in `style.css`
- **Content**: Update text directly in `index.html`
- **Projects**: Add/remove `.project-card` blocks in `projects.html`
- **Resume**: Replace `assets/resume/Sidharth_Sajith_Resume.pdf`
- **Profile photo**: Add `assets/images/profile.jpg` (or keep the placeholder SVG)
- **Blog posts**: See "Writing a Blog Post" above

---

## 📄 License

MIT

## 📬 Contact

Sidharth Sajith — sidharthsajith005@gmail.com