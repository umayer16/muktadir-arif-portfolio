/* =====================================================
   MUKTADIR ARIF — PORTFOLIO v2  |  main.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- INJECT NAVBAR ---- */
  const navEl = document.getElementById('navbar');
  if (navEl) {
    navEl.innerHTML = `
      <div class="nav-container">
        <a href="/" class="nav-logo">Muktadir <span>Arif</span></a>
        <ul class="nav-menu" id="nav-menu">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="/about.html" class="nav-link">About</a></li>
          <li><a href="/experience.html" class="nav-link">Experience</a></li>
          <li><a href="/projects.html" class="nav-link">Projects</a></li>
          <li><a href="/publications.html" class="nav-link">Research</a></li>
          <li><a href="/skills.html" class="nav-link">Skills</a></li>
          <li class="dropdown">
            <span class="nav-link dropdown-toggle" tabindex="0">
              More
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <div class="dropdown-menu">
              <a href="/awards.html">Awards</a>
              <a href="/academics.html">Academics</a>
              <a href="/volunteering.html">Volunteering</a>
              <a href="/contact.html">Contact</a>
            </div>
          </li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;
  }

  /* ---- ACTIVE LINK ---- */
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link, .dropdown-menu a').forEach(link => {
    const href = link.getAttribute('href');
    const normalized = href === '/' ? '/' : href.replace(/\/$/, '');
    const isHome = normalized === '/' && path === '';
    const isMatch = path === normalized || path.endsWith(normalized);
    if (isMatch || isHome) {
      link.classList.add('active');
      const parent = link.closest('.dropdown');
      if (parent) parent.querySelector('.dropdown-toggle').classList.add('active');
    }
  });

  /* ---- NAVBAR SCROLL STATE ---- */
  const scrollNav = () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', scrollNav, { passive: true });
  scrollNav();

  /* ---- MOBILE MENU ---- */
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  ham?.addEventListener('click', () => {
    menu?.classList.toggle('open');
    ham.classList.toggle('active');
  });

  /* ---- SCROLL REVEAL ---- */
  // Use threshold:0 so elements at top of viewport always fire.
  // Double-rAF ensures layout is complete before first observation.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
  });

});

/* =====================================================
   PROJECT MODAL DATA
   ===================================================== */
const projects = {
  hostel: {
    tag: 'Live App',
    title: 'Hostel Expense Tracker (SpendWise)',
    desc: 'A complete financial management suite built after experiencing firsthand the chaos of managing finances among 300+ hostel students. Features Firebase Auth, real-time Firestore database, spending analytics via Chart.js, and dark mode. Currently used by 70+ students daily. An ML spending prediction module using Scikit-Learn is under active development.',
    tech: ['Firebase', 'JavaScript', 'Firestore', 'Chart.js', 'CSS3'],
    links: [
      { label: 'Live Demo →', url: 'https://spendwise-cd1c9.web.app/' },
      { label: 'GitHub →', url: 'https://github.com/umayer16/hostel-expense-tracker' },
    ]
  },
  vibebench: {
    tag: 'Research',
    title: 'VibeBench — LLM Evaluation Framework',
    desc: 'An open-source benchmarking framework for holistic evaluation of large language models. VibeBench features curated datasets spanning diverse tasks, a multi-model evaluation pipeline, a live leaderboard, and an accompanying research paper. Released as v1.0.0 in February 2026.',
    tech: ['Python', 'LLM Evaluation', 'Benchmarking', 'Open Source'],
    links: [
      { label: 'GitHub →', url: 'https://github.com/umayer16/VIBEBENCH' },
    ]
  },
  ats: {
    tag: 'IEEE Submission',
    title: 'Beyond Severity Scores: ATS Vulnerability Triage',
    desc: 'A research paper proposing an Adjusted Triage Score (ATS) framework that integrates CVSS authentication context, CISA KEV exploit data, and EPSS probabilistic scores. Validated against the NVD REST API v2.0 with a time-stratified train/test split at 2023-01-01. Submitted to IEEE TDSC (Impact Factor ~7.3).',
    tech: ['Python', 'Scikit-Learn', 'CVSS', 'NVD API', 'EPSS', 'CISA KEV'],
    links: [
      { label: 'View Paper (Preprint) →', url: '#' },
    ]
  },
  circuit: {
    tag: 'Award Winner',
    title: 'Circuit Crusaders — Firefighting Robot',
    desc: 'An autonomous firefighting robot designed and built with teammate Mushrat Salehin Nibir for the International Robotics Olympiad 2026. Features multi-directional flame sensors for 360° detection and an automated extinguishing mechanism for hands-free fire suppression. Won the Orwell Award for clearest technical communication.',
    tech: ['Embedded Systems', 'Sensor Fusion', 'Autonomous Systems', 'Arduino'],
    links: []
  },
  flappy: {
    tag: 'Code',
    title: 'Flappy Sparrow',
    desc: 'A Python/Pygame clone of the classic arcade game built as part of CS50 coursework. Implements physics simulation, collision detection, score tracking, and smooth frame-rate optimization — all from scratch in pure Python.',
    tech: ['Python', 'Pygame', 'OOP', 'Physics Simulation'],
    links: [
      { label: 'Play on Scratch →', url: 'https://scratch.mit.edu/projects/1233387521' },
    ]
  }
};

function openModal(id) {
  const data = projects[id];
  if (!data) return;
  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modalBody');
  const tagColor = { 'Live App': 'live', 'Research': 'research', 'IEEE Submission': 'research', 'Award Winner': 'award', 'Code': 'code' }[data.tag] || 'code';
  const linksHTML = data.links.map(l =>
    `<a href="${l.url}" target="_blank" class="btn btn-accent" style="font-size:0.82rem;padding:0.6rem 1.25rem;">${l.label}</a>`
  ).join('');
  const techHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
  body.innerHTML = `
    <div style="margin-bottom:1.5rem;"><span class="card-tag ${tagColor}">${data.tag}</span></div>
    <h2 style="font-family:var(--font-body);font-size:1.2rem;font-weight:600;color:var(--ivory);margin-bottom:1rem;line-height:1.4;">${data.title}</h2>
    <p style="font-size:0.92rem;color:var(--ivory-dim);line-height:1.8;margin-bottom:1.5rem;">${data.desc}</p>
    <div class="tech-stack" style="margin-top:0;padding-top:0;border:none;margin-bottom:1.5rem;">${techHTML}</div>
    ${linksHTML ? `<div style="display:flex;gap:0.75rem;flex-wrap:wrap;">${linksHTML}</div>` : ''}
  `;
  modal.classList.add('open');
}

function closeModal() {
  document.getElementById('projectModal')?.classList.remove('open');
}

window.addEventListener('click', e => {
  if (e.target.id === 'projectModal') closeModal();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});