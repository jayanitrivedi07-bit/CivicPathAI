// ============================================================
// VoteSathi — App Core (Theme, Nav, Progress, Language)
// ============================================================

const App = (() => {
  // ── STATE ───────────────────────────────────────────────
  const state = {
    theme: localStorage.getItem('vs-theme') || 'dark',
    lang: localStorage.getItem('vs-lang') || 'hi',
    textSize: localStorage.getItem('vs-textsize') || 'normal',
    sectionsVisited: JSON.parse(localStorage.getItem('vs-visited') || '[]'),
    navOpen: false
  };

  const SECTIONS = ['home', 'overview', 'timeline', 'journey', 'sim', 'faq', 'myth', 'quiz'];

  // ── THEME ───────────────────────────────────────────────
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('vs-theme', state.theme);
    applyTheme();
  }

  // ── LANGUAGE ────────────────────────────────────────────
  function applyLanguage() {
    const t = VOTESATHI_DATA.translations[state.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) el.placeholder = t[key];
    });
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = state.lang === 'en' ? 'हिंदी' : 'English';
    document.documentElement.lang = state.lang === 'hi' ? 'hi' : 'en';
  }

  function toggleLanguage() {
    state.lang = state.lang === 'en' ? 'hi' : 'en';
    localStorage.setItem('vs-lang', state.lang);
    applyLanguage();
    // Re-render dynamic content
    if (window.TimelineEngine) TimelineEngine.render();
    if (window.QuizEngine) QuizEngine.applyLang();
    if (window.JourneyEngine) JourneyEngine.render();
    if (window.FAQEngine) FAQEngine.render();
    if (window.MythEngine) MythEngine.render();
    if (window.ChatEngine) ChatEngine.renderSuggestions();
    if (window.SimulatorEngine) SimulatorEngine.init();
  }

  // ── TEXT SIZE ───────────────────────────────────────────
  function applyTextSize() {
    document.documentElement.setAttribute('data-textsize', state.textSize);
    const btn = document.getElementById('textsize-toggle');
    if (btn) btn.textContent = state.textSize === 'large' ? '🔡' : '🔠';
  }

  function toggleTextSize() {
    state.textSize = state.textSize === 'normal' ? 'large' : 'normal';
    localStorage.setItem('vs-textsize', state.textSize);
    applyTextSize();
  }

  // ── NAVIGATION ──────────────────────────────────────────
  function initNav() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
      updateActiveNav();
      updateProgress();
    }, { passive: true });

    // Hamburger menu
    hamburger?.addEventListener('click', () => {
      state.navOpen = !state.navOpen;
      navLinks?.classList.toggle('open', state.navOpen);
    });

    // Close on link click
    navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        state.navOpen = false;
        navLinks.classList.remove('open');
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
  }

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < bottom);
      }
    });
  }

  // ── PROGRESS TRACKING ───────────────────────────────────
  function updateProgress() {
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6 && !state.sectionsVisited.includes(id)) {
        state.sectionsVisited.push(id);
        localStorage.setItem('vs-visited', JSON.stringify(state.sectionsVisited));
        updateProgressUI();
        Gamification.checkBadges();
      }
    });

    // Show progress bar after scrolling
    const progressBar = document.querySelector('.progress-bar-container');
    if (progressBar) {
      progressBar.classList.toggle('visible', window.scrollY > 200);
    }
  }

  function updateProgressUI() {
    const pct = Math.round((state.sectionsVisited.length / SECTIONS.length) * 100);
    const fill = document.querySelector('.progress-bar-fill');
    const pctEl = document.querySelector('.progress-pct');
    if (fill) fill.style.width = `${pct}%`;
    if (pctEl) pctEl.textContent = `${pct}%`;
  }

  function getVisitedCount() {
    return state.sectionsVisited.length;
  }

  // ── SCROLL REVEAL ────────────────────────────────────────
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ── CONFETTI ─────────────────────────────────────────────
  function launchConfetti() {
    const colors = ['#FF9933', '#138808', '#4F8EF7', '#FFD700', '#ff6b6b', '#4ecdc4'];
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = (Math.random() * 10 + 6) + 'px';
        piece.style.height = (Math.random() * 6 + 4) + 'px';
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
      }, i * 30);
    }
  }

  // ── INIT ────────────────────────────────────────────────
  function init() {
    applyTheme();
    applyTextSize();
    applyLanguage();
    initNav();
    initScrollReveal();
    updateProgressUI();

    // Wire up controls
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('lang-toggle')?.addEventListener('click', toggleLanguage);
    document.getElementById('textsize-toggle')?.addEventListener('click', toggleTextSize);

    // Animate hero stats
    animateCounters();
  }

  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString() + (el.getAttribute('data-suffix') || '');
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }

  return {
    init, toggleTheme, toggleLanguage, toggleTextSize,
    getVisitedCount, updateProgressUI, launchConfetti,
    getLang: () => state.lang,
    getTheme: () => state.theme
  };
})();

// ── GAMIFICATION ─────────────────────────────────────────
const Gamification = (() => {
  const badges = {
    firstVoter: { id: 'badge-first', emoji: '🟢', name: 'First-time Voter', threshold: 1, earned: false },
    explorer: { id: 'badge-explorer', emoji: '🟡', name: 'Democracy Explorer', threshold: 5, earned: false },
    expert: { id: 'badge-expert', emoji: '🔵', name: 'Civic Expert', threshold: 8, earned: false }
  };

  function checkBadges() {
    const visited = App.getVisitedCount();
    Object.values(badges).forEach(badge => {
      if (!badge.earned && visited >= badge.threshold) {
        badge.earned = true;
        awardBadge(badge);
      }
    });
  }

  function awardBadge(badge) {
    const el = document.getElementById(badge.id);
    if (el) el.classList.add('earned');
    showBadgeNotification(badge);
  }

  function showBadgeNotification(badge) {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
      background: var(--bg-surface); border: 2px solid var(--color-primary);
      border-radius: 50px; padding: 12px 24px; display: flex; align-items: center;
      gap: 10px; z-index: 9999; font-family: var(--font-heading); font-weight: 700;
      font-size: 14px; color: var(--color-primary); box-shadow: 0 8px 40px rgba(255,153,51,0.3);
      animation: fadeSlideUp 0.5s ease;
    `;
    notif.innerHTML = `${badge.emoji} <strong>Badge Earned!</strong> ${badge.name}`;
    document.body.appendChild(notif);
    App.launchConfetti();
    setTimeout(() => notif.remove(), 4000);
  }

  function awardQuizBadge(score) {
    if (score >= 8) awardBadge(badges.expert);
    else if (score >= 5) awardBadge(badges.explorer);
    else awardBadge(badges.firstVoter);
  }

  return { checkBadges, awardBadge, awardQuizBadge };
})();

// ── START ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
