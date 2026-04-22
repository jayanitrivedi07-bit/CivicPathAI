// ============================================================
// VoteSathi — Interactive Timeline Engine
// ============================================================

const TimelineEngine = (() => {
  let activeNodeId = null;

  function render() {
    const track = document.querySelector('.timeline-track');
    const detail = document.querySelector('.timeline-detail');
    if (!track) return;

    const lang = App.getLang();
    track.innerHTML = '';

    VOTESATHI_DATA.timeline.forEach((phase, idx) => {
      const node = document.createElement('div');
      node.className = 'timeline-node reveal reveal-delay-' + (idx + 1);
      node.style.setProperty('--node-color', phase.color);
      node.setAttribute('data-id', phase.id);
      node.setAttribute('aria-label', phase.title);
      node.setAttribute('role', 'button');
      node.setAttribute('tabindex', '0');

      node.innerHTML = `
        <div class="timeline-node-icon">
          <span style="filter: drop-shadow(0 0 8px ${phase.color}40)">${phase.icon}</span>
        </div>
        <span class="timeline-node-phase">${phase.phase}</span>
        <span class="timeline-node-title">${lang === 'hi' ? phase.titleHi : phase.title}</span>
        <span class="timeline-node-date">${lang === 'hi' ? phase.dateHi : phase.date}</span>
      `;

      node.addEventListener('click', () => toggleDetail(phase.id));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') toggleDetail(phase.id);
      });
      track.appendChild(node);
    });

    // Re-init scroll reveal for new elements
    document.querySelectorAll('.timeline-node.reveal').forEach(el => {
      setTimeout(() => el.classList.add('revealed'), 100);
    });

    // If there was an active node, re-open it
    if (activeNodeId) {
      openDetail(activeNodeId);
    }
  }

  function toggleDetail(phaseId) {
    if (activeNodeId === phaseId) {
      closeDetail();
    } else {
      openDetail(phaseId);
    }
  }

  function openDetail(phaseId) {
    activeNodeId = phaseId;
    const phase = VOTESATHI_DATA.timeline.find(p => p.id === phaseId);
    if (!phase) return;

    const lang = App.getLang();
    const detail = document.querySelector('.timeline-detail');
    if (!detail) return;

    // Update active node styling
    document.querySelectorAll('.timeline-node').forEach(n => {
      n.classList.toggle('active', n.getAttribute('data-id') === phaseId);
    });

    // Render detail content
    detail.style.setProperty('--detail-color', phase.color);
    detail.innerHTML = `
      <div class="timeline-detail-header">
        <div class="timeline-detail-icon" style="background: ${phase.color}20; border: 1px solid ${phase.color}40;">
          ${phase.icon}
        </div>
        <div>
          <div class="timeline-detail-badge" style="background: ${phase.color}20; color: ${phase.color}; border: 1px solid ${phase.color}40;">
            ${phase.phase}
          </div>
          <h3 class="timeline-detail-title">${lang === 'hi' ? phase.titleHi : phase.title}</h3>
          <p class="timeline-detail-date">⏱️ ${lang === 'hi' ? phase.dateHi : phase.date}</p>
        </div>
      </div>
      <p class="timeline-detail-desc">${lang === 'hi' ? phase.descriptionHi : phase.description}</p>
      <div class="timeline-key-facts">
        ${phase.keyFacts.map(fact => `<div class="timeline-fact-item">${fact}</div>`).join('')}
      </div>
    `;

    detail.classList.add('open');

    // Scroll detail into view
    setTimeout(() => {
      detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  function closeDetail() {
    activeNodeId = null;
    const detail = document.querySelector('.timeline-detail');
    if (detail) detail.classList.remove('open');
    document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
  }

  function init() {
    render();
  }

  return { init, render };
})();

document.addEventListener('DOMContentLoaded', () => {
  TimelineEngine.init();
});
