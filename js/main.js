/* ============================================================
   CONSTRUCTION GROUP — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll state ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
    backTop?.classList.toggle('show', window.scrollY > 400);
  });

  /* ── Back to top ── */
  const backTop = document.getElementById('backTop');
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Mobile nav ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');

  hamburger?.addEventListener('click', () => mobileNav?.classList.add('open'));
  mobileClose?.addEventListener('click', () => mobileNav?.classList.remove('open'));
  mobileNav?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileNav.classList.remove('open'))
  );

  /* ── Dark mode ── */
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark-mode');

  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
  if (saved === 'dark' && themeBtn) themeBtn.textContent = '☀️';

  /* ── Language toggle ── */
  const langBtn = document.getElementById('langBtn');
  const translations = {
    en: {
      'data-nav-about': 'About',
      'data-nav-approach': 'Approach',
      'data-nav-sectors': 'Sectors',
      'data-nav-projects': 'Projects',
      'data-nav-contact': 'Contact',
      'data-hero-eyebrow': 'Building the Future',
      'data-hero-cta-primary': 'View Our Projects',
      'data-hero-cta-secondary': 'Get In Touch',
    },
    bn: {
      'data-nav-about': 'আমাদের সম্পর্কে',
      'data-nav-approach': 'পদ্ধতি',
      'data-nav-sectors': 'সেক্টর',
      'data-nav-projects': 'প্রকল্প',
      'data-nav-contact': 'যোগাযোগ',
      'data-hero-eyebrow': 'ভবিষ্যৎ নির্মাণ',
      'data-hero-cta-primary': 'প্রকল্প দেখুন',
      'data-hero-cta-secondary': 'যোগাযোগ করুন',
    }
  };
  let currentLang = 'en';

  langBtn?.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'bn' : 'en';
    langBtn.textContent = currentLang === 'en' ? 'EN | বাং' : 'বাং | EN';
    const t = translations[currentLang];
    Object.entries(t).forEach(([attr, value]) => {
      document.querySelectorAll(`[${attr}]`).forEach(el => {
        el.textContent = value;
      });
    });
  });

  /* ── Reveal on scroll ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  /* ── Counter animation ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count-up').forEach(el => counterObserver.observe(el));

  /* ── Project filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projItems   = document.querySelectorAll('.proj-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.opacity = show ? '1' : '0.25';
        item.style.transform = show ? 'scale(1)' : 'scale(0.96)';
        item.style.pointerEvents = show ? 'auto' : 'none';
        item.style.transition = 'all 0.4s ease';
      });
    });
  });

  /* ── Smooth active nav link ── */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });

});
