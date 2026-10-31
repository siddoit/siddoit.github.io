/**
 * Sidharth Sajith — Portfolio
 * Main JavaScript: Theme, Mobile Nav, Progress Bar, Form Handling, Code Copy & Filtering
 */

// ─── Theme Management ─────────────────────────────────────────────────────────
const themeBtn = document.getElementById('theme-btn');
const root = document.documentElement;

function getTheme() {
  return localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function updateThemeToggleUI(theme) {
  if (!themeBtn) return;
  const isDark = theme === 'dark';
  themeBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeBtn.innerHTML = isDark
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

function applyTheme(t) {
  root.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  updateThemeToggleUI(t);
}

// Initial theme icon setup (theme attribute is set early in <head>)
updateThemeToggleUI(getTheme());

themeBtn?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || getTheme();
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Sync with OS theme changes if user has not explicitly set a manual preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// ─── Mobile Navigation ────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

function setMobileNav(open) {
  navLinks?.classList.toggle('open', open);
  hamburger?.classList.toggle('open', open);
  hamburger?.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
}

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.contains('open');
  setMobileNav(!isOpen);
});

document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('open') &&
      !hamburger?.contains(e.target) &&
      !navLinks?.contains(e.target)) {
    setMobileNav(false);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
    setMobileNav(false);
  }
});

// Close mobile nav when clicking a link
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    setMobileNav(false);
  });
});

// Reset mobile nav state on window resize beyond mobile breakpoint
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks?.classList.contains('open')) {
    setMobileNav(false);
  }
});

// ─── Active Nav Link Highlighting ─────────────────────────────────────────────
(function () {
  const full = window.location.pathname;
  const file = full.split('/').pop() || 'index.html';
  const inProjects = full.includes('/projects/');
  const inBlog     = full.includes('/blog/');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = (link.getAttribute('href') || '').split('/').pop();

    let active = false;
    if (inProjects && href === 'projects.html') active = true;
    else if (inBlog && href === 'blog.html') active = true;
    else if (!inProjects && !inBlog && href === file) active = true;

    if (active) link.classList.add('active');
  });
})();

// ─── Reading Progress Bar ─────────────────────────────────────────────────────
const progressBar = document.getElementById('reading-progress');

if (progressBar) {
  function updateProgress() {
    const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    progressBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ─── Code Snippet "Copy" Buttons ──────────────────────────────────────────────
document.querySelectorAll('article.post-body pre').forEach(pre => {
  const code = pre.querySelector('code');
  if (!code) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'code-block-wrapper';
  pre.parentNode.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);

  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-code-btn';
  copyBtn.type = 'button';
  copyBtn.setAttribute('aria-label', 'Copy code snippet');
  copyBtn.textContent = 'Copy';

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.innerText.trim());
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    } catch {
      copyBtn.textContent = 'Failed';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    }
  });

  wrapper.appendChild(copyBtn);
});

// ─── Project Filter Tabs (on projects.html) ───────────────────────────────────
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.projects-grid .project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase();

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase();
        let matches = false;
        if (filter === 'all') {
          matches = true;
        } else if (filter === 'robotics') {
          matches = categories.includes('robotics');
        } else if (filter === 'iot') {
          matches = categories.includes('iot') || categories.includes('embedded');
        } else if (filter === 'ai') {
          matches = categories.split(/\s+/).includes('ai') || categories.includes('computer vision') || categories.includes('edge-ai');
        } else {
          matches = categories.includes(filter);
        }

        if (matches) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ─── Contact Form (Formspree with inline feedback) ────────────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError   = document.getElementById('form-error');
const submitBtn   = document.getElementById('submit-btn');
const sendBtnHtml = submitBtn?.innerHTML || 'Send Message';

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
  }
  if (formError) formError.style.display = 'none';

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    } else {
      if (submitBtn) {
        submitBtn.disabled  = false;
        submitBtn.innerHTML = sendBtnHtml;
      }
      if (formError) {
        formError.textContent = 'Something went wrong submitting the form. Please email sidharthsajith005@gmail.com directly.';
        formError.style.display = 'block';
      }
    }
  } catch {
    if (submitBtn) {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = sendBtnHtml;
    }
    if (formError) {
      formError.textContent = 'Network error. Please email me directly at sidharthsajith005@gmail.com.';
      formError.style.display = 'block';
    }
  }
});

// ─── Footer Dynamic Year ──────────────────────────────────────────────────────
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
