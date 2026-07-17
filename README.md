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
├── script.js               # Interactivity (scroll, menu, animations)
├── README.md               # This file
│
└── assets/
    ├── icons/
    │   ├── favicon.svg         # SS initials favicon
    │   └── profile-placeholder.svg  # Circuit-style profile avatar
    ├── images/
    │   └── (project thumbnails go here)
    └── resume/
        └── Sidharth_Resume.pdf  # Your resume PDF (add manually)
```

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
- **Projects**: Add/remove `.project-card` blocks in the Projects section
- **Resume**: Place your PDF at `assets/resume/Sidharth_Resume.pdf`
- **Profile photo**: Replace `assets/icons/profile-placeholder.svg` with a real image

---

## 📄 License

MIT

## 📬 Contact

Sidharth Sajith — sidharthsajith005@gmail.com


> umm can u make an wasier way for me to make blog posts..., avoid using emojies, also make it less ai like, i dont want it to seems generic, also in
  projects, when u open some, the text is hot cohesive and aligned, looks out fo place, CV is okay, but dont it need to have some of my biodata as well, no
  need to add to much buzzwords as well