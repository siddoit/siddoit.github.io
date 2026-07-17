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
  if (themeBtn) themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
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
  const path = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace(/\/$/, '').replace(/\.html$/, '');
    const isHome = (path === '' || path.endsWith('/index')) && (href === '/' || href === './index' || href === '');
    const isCurrent = !isHome && href && path.endsWith(href);
    if (isHome || isCurrent) link.classList.add('active');
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
