/**
 * Sidharth Sajith — Portfolio
 * Main JavaScript: theme, nav, progress bar, forms
 */

// ─── Theme ────────────────────────────────────────────────────────────────────
const themeBtn = document.getElementById('theme-btn');
const root     = document.documentElement;

function getTheme() {
  return localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(t) {
  root.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  if (themeBtn) {
    themeBtn.innerHTML = t === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

applyTheme(getTheme());
themeBtn?.addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));

// ─── Mobile Nav ───────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('open') &&
      !hamburger?.contains(e.target) &&
      !navLinks?.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }
});

// Close nav on link click (mobile)
navLinks?.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

// ─── Active Nav Link ──────────────────────────────────────────────────────────
(function () {
  const full = window.location.pathname;            // e.g. /portfolio/projects/adas.html
  const file = full.split('/').pop() || 'index.html'; // adas.html / index.html
  const inProjects = full.includes('/projects/');
  const inBlog     = full.includes('/blog/');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = (link.getAttribute('href') || '').split('/').pop();

    let active = false;
    if (inProjects && href === 'projects.html') active = true;
    else if (inBlog && href === 'blog.html')     active = true;
    else if (!inProjects && !inBlog && href === file) active = true;

    if (active) link.classList.add('active');
  });
})();

// ─── Reading Progress Bar ─────────────────────────────────────────────────────
const progressBar = document.getElementById('reading-progress');

if (progressBar) {
  function updateProgress() {
    const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct   = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ─── Contact Form (Formspree) ─────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn   = document.getElementById('submit-btn');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

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
      submitBtn.disabled  = false;
      submitBtn.innerHTML = sendBtnHtml;
      alert('Something went wrong. Please try emailing me directly.');
    }
  } catch {
    submitBtn.disabled  = false;
    submitBtn.innerHTML = sendBtnHtml;
    alert('Network error. Please email me directly at sidharthsajith005@gmail.com');
  }
});

const sendBtnHtml = submitBtn?.innerHTML;

// ─── Footer year ──────────────────────────────────────────────────────────────
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
