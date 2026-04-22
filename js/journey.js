// ============================================================
// VoteSathi — Voter Journey Engine
// ============================================================

const JourneyEngine = (() => {
  let currentStep = 0;
  const TOTAL_STEPS = VOTESATHI_DATA.journey.length;

  function render() {
    const sidebar = document.querySelector('.journey-step-nav');
    const main = document.querySelector('.journey-main');
    if (!sidebar || !main) return;

    const lang = App.getLang();

    // Render sidebar nav
    sidebar.innerHTML = VOTESATHI_DATA.journey.map((step, idx) => `
      <li class="journey-step-nav-item ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}"
          data-step="${idx}" role="button" tabindex="0"
          aria-label="Step ${step.step}: ${step.title}">
        <div class="journey-step-num">${idx < currentStep ? '✓' : step.step}</div>
        <span class="journey-step-nav-label">${lang === 'hi' ? step.titleHi : step.title}</span>
      </li>
    `).join('');

    sidebar.querySelectorAll('.journey-step-nav-item').forEach(item => {
      item.addEventListener('click', () => goTo(parseInt(item.dataset.step)));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter') goTo(parseInt(item.dataset.step));
      });
    });

    // Render all step contents
    main.innerHTML = VOTESATHI_DATA.journey.map((step, idx) => `
      <div class="journey-step-content ${idx === currentStep ? 'active' : ''}" data-step="${idx}">
        <div class="journey-step-header">
          <div class="journey-step-icon">${step.icon}</div>
          <div>
            <div class="journey-step-badge">Step ${step.step} of ${TOTAL_STEPS}</div>
            <h3 class="journey-step-title">${lang === 'hi' ? step.titleHi : step.title}</h3>
            <p class="journey-step-subtitle">${lang === 'hi' ? step.subtitleHi : step.subtitle}</p>
          </div>
        </div>
        <p class="journey-step-desc">${lang === 'hi' ? step.descriptionHi : step.description}</p>
        <div class="journey-step-tip">${lang === 'hi' ? step.tipHi : step.tip}</div>
        <div class="journey-step-action">🔗 ${step.action}</div>
        <div class="journey-nav-btns">
          <button class="btn-secondary" id="journey-prev-${idx}" ${idx === 0 ? 'disabled style="opacity:0.4;cursor:default"' : ''}>
            ← Previous
          </button>
          <div class="journey-progress-track">
            <div class="journey-progress-fill" style="width: ${((idx + 1) / TOTAL_STEPS) * 100}%"></div>
          </div>
          <button class="btn-primary" id="journey-next-${idx}">
            ${idx === TOTAL_STEPS - 1 ? '🎉 Complete Journey' : 'Next →'}
          </button>
        </div>
      </div>
    `).join('');

    // Wire nav buttons
    VOTESATHI_DATA.journey.forEach((_, idx) => {
      document.getElementById(`journey-prev-${idx}`)?.addEventListener('click', () => goTo(idx - 1));
      document.getElementById(`journey-next-${idx}`)?.addEventListener('click', () => {
        if (idx === TOTAL_STEPS - 1) {
          completedJourney();
        } else {
          goTo(idx + 1);
        }
      });
    });
  }

  function goTo(idx) {
    if (idx < 0 || idx >= TOTAL_STEPS) return;
    currentStep = idx;

    // Update sidebar
    document.querySelectorAll('.journey-step-nav-item').forEach((item, i) => {
      item.classList.toggle('active', i === currentStep);
      item.classList.toggle('completed', i < currentStep);
      const numEl = item.querySelector('.journey-step-num');
      if (numEl) numEl.textContent = i < currentStep ? '✓' : (i + 1);
    });

    // Update content
    document.querySelectorAll('.journey-step-content').forEach((el, i) => {
      el.classList.toggle('active', i === currentStep);
    });

    // Scroll to top of journey section
    document.querySelector('.journey-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function completedJourney() {
    const main = document.querySelector('.journey-main');
    if (!main) return;

    main.innerHTML = `
      <div style="text-align:center; padding: 80px 40px;">
        <div style="font-size:80px; margin-bottom:24px; animation: bounceIn 0.6s ease;">🎉</div>
        <h2 style="font-size:2rem; font-weight:800; margin-bottom:12px; color:var(--color-primary);">
          Journey Complete!
        </h2>
        <p style="color:var(--text-secondary); margin-bottom:32px; font-size:1rem; max-width:480px; margin-left:auto; margin-right:auto; line-height:1.8;">
          You've completed the full voter journey! You now know everything it takes to be an informed, confident voter. 🇮🇳
        </p>
        <div style="background:var(--color-primary-glow); border:2px solid var(--border-accent); border-radius:50px; display:inline-flex; align-items:center; gap:12px; padding:16px 32px; font-weight:700; color:var(--color-primary); font-size:1.1rem; margin-bottom:32px;">
          🟢 First-time Voter Badge Earned!
        </div>
        <br>
        <button class="btn-primary" onclick="JourneyEngine.init()">
          ↩️ Restart Journey
        </button>
      </div>
    `;

    App.launchConfetti();
    Gamification.awardBadge({ id: 'badge-first', emoji: '🟢', name: 'First-time Voter' });
  }

  function init() {
    currentStep = 0;
    render();
  }

  return { init, render, goTo };
})();

// ── FAQ ENGINE ────────────────────────────────────────────
const FAQEngine = (() => {
  function render() {
    const list = document.querySelector('.faq-list');
    if (!list) return;

    const lang = App.getLang();
    list.innerHTML = VOTESATHI_DATA.faqs.map((faq, idx) => `
      <div class="faq-item" data-idx="${idx}" role="article">
        <div class="faq-question" role="button" tabindex="0" aria-expanded="false"
             aria-controls="faq-answer-${idx}">
          <span class="faq-q-text">${lang === 'hi' ? faq.qHi : faq.q}</span>
          <span class="faq-category">${faq.category}</span>
          <span class="faq-chevron">⌄</span>
        </div>
        <div class="faq-answer" id="faq-answer-${idx}" role="region">
          <div class="faq-answer-inner">${lang === 'hi' ? faq.aHi : faq.a}</div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => toggleFAQ(q.closest('.faq-item')));
      q.addEventListener('keydown', e => {
        if (e.key === 'Enter') toggleFAQ(q.closest('.faq-item'));
      });
    });
  }

  function toggleFAQ(item) {
    const wasOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });
    // If wasn't open, open it
    if (!wasOpen) {
      item.classList.add('open');
      item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'true');
    }
  }

  function initSearch() {
    const searchInput = document.querySelector('.faq-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.faq-item').forEach((item, idx) => {
        const faq = VOTESATHI_DATA.faqs[idx];
        const text = (faq.q + ' ' + faq.a + ' ' + (faq.qHi || '') + ' ' + (faq.aHi || '')).toLowerCase();
        item.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

  function init() {
    render();
    initSearch();
  }

  return { init, render };
})();

// ── MYTH ENGINE ───────────────────────────────────────────
const MythEngine = (() => {
  function render() {
    const grid = document.querySelector('.myths-grid');
    if (!grid) return;

    const lang = App.getLang();
    grid.innerHTML = VOTESATHI_DATA.myths.map((myth, idx) => `
      <div class="myth-card" data-idx="${idx}" role="button" tabindex="0"
           aria-label="Click to reveal fact" title="Click to reveal the truth!">
        <div class="myth-card-inner">
          <div class="myth-front">
            <div class="myth-label">❌ Myth</div>
            <div class="myth-icon">${myth.icon}</div>
            <p class="myth-text">"${lang === 'hi' ? myth.mythHi : myth.myth}"</p>
            <p class="myth-hint">👆 Click to reveal the fact</p>
          </div>
          <div class="myth-back">
            <div class="myth-label">✅ Fact</div>
            <div class="myth-icon">💡</div>
            <p class="myth-fact-text">${lang === 'hi' ? myth.factHi : myth.fact}</p>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.myth-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('flipped'));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter') card.classList.toggle('flipped');
      });
    });
  }

  function init() { render(); }
  return { init, render };
})();

document.addEventListener('DOMContentLoaded', () => {
  JourneyEngine.init();
  FAQEngine.init();
  MythEngine.init();
});
