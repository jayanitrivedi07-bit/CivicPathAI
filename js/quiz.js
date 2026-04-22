// ============================================================
// VoteSathi — Quiz Engine
// ============================================================

const QuizEngine = (() => {
  let currentQ = 0;
  let score = 0;
  let answered = false;
  const TOTAL = VOTESATHI_DATA.quiz.length;

  function start() {
    currentQ = 0;
    score = 0;
    answered = false;
    renderQuestion();
    document.querySelector('.quiz-result')?.classList.remove('show');
    document.querySelector('.quiz-card')?.style.removeProperty('display');
    document.querySelector('.quiz-progress-header')?.style.removeProperty('display');
    document.querySelector('.quiz-progress-track')?.style.removeProperty('display');
  }

  function renderQuestion() {
    const q = VOTESATHI_DATA.quiz[currentQ];
    const lang = App.getLang();
    answered = false;

    // Progress
    const fill = document.querySelector('.quiz-progress-fill');
    const qnum = document.querySelector('.quiz-qnum');
    const scoreEl = document.querySelector('.quiz-score');
    if (fill) fill.style.width = `${(currentQ / TOTAL) * 100}%`;
    if (qnum) qnum.textContent = `Question ${currentQ + 1} of ${TOTAL}`;
    if (scoreEl) scoreEl.textContent = `Score: ${score}/${currentQ}`;

    // Question text
    const qText = document.querySelector('.quiz-question-text');
    if (qText) qText.textContent = lang === 'hi' ? q.qHi : q.q;

    // Options
    const optContainer = document.querySelector('.quiz-options');
    if (!optContainer) return;

    const options = lang === 'hi' ? q.optionsHi : q.options;
    const letters = ['A', 'B', 'C', 'D'];

    optContainer.innerHTML = options.map((opt, idx) => `
      <button class="quiz-option" data-idx="${idx}" id="quiz-opt-${idx}">
        <span class="quiz-option-letter">${letters[idx]}</span>
        ${opt}
      </button>
    `).join('');

    optContainer.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.idx)));
    });

    // Explanation
    const explanation = document.querySelector('.quiz-explanation');
    if (explanation) {
      explanation.classList.remove('show');
      explanation.textContent = '';
    }

    // Next button
    const nextBtn = document.querySelector('.quiz-next-btn');
    if (nextBtn) nextBtn.classList.remove('show');
  }

  function selectAnswer(idx) {
    if (answered) return;
    answered = true;

    const q = VOTESATHI_DATA.quiz[currentQ];
    const lang = App.getLang();
    const correct = q.answer;
    const isCorrect = idx === correct;

    if (isCorrect) score++;

    // Highlight options
    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) btn.classList.add('correct');
      if (i === idx && !isCorrect) btn.classList.add('wrong');
    });

    // Show explanation
    const explanation = document.querySelector('.quiz-explanation');
    if (explanation) {
      explanation.textContent = (lang === 'hi' ? q.explanationHi : q.explanation);
      explanation.classList.add('show');
    }

    // Show next button
    const nextBtn = document.querySelector('.quiz-next-btn');
    if (nextBtn) {
      nextBtn.classList.add('show');
      nextBtn.textContent = currentQ === TOTAL - 1 ? '🏆 See Results' : 'Next Question →';
      nextBtn.onclick = () => {
        currentQ++;
        if (currentQ >= TOTAL) {
          showResult();
        } else {
          renderQuestion();
        }
      };
    }

    // Update score display
    const scoreEl = document.querySelector('.quiz-score');
    if (scoreEl) scoreEl.textContent = `Score: ${score}/${currentQ + 1}`;
  }

  function showResult() {
    const card = document.querySelector('.quiz-card');
    const result = document.querySelector('.quiz-result');
    const progHeader = document.querySelector('.quiz-progress-header');
    const progTrack = document.querySelector('.quiz-progress-track');

    if (card) card.style.display = 'none';
    if (progHeader) progHeader.style.display = 'none';
    if (progTrack) progTrack.style.display = 'none';

    if (!result) return;

    const pct = Math.round((score / TOTAL) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '🌟' : '📚';
    const title = pct >= 80 ? 'Civic Expert!' : pct >= 50 ? 'Democracy Explorer!' : 'Keep Learning!';
    const msg = pct >= 80
      ? "Outstanding! You're a true civic champion. Your knowledge of the election process is excellent!"
      : pct >= 50
      ? "Great job! You have a good understanding of elections. Explore more sections to become an expert!"
      : "Good effort! Every voter starts somewhere. Read through the sections and try again!";

    const badge = pct >= 80 ? '🔵 Civic Expert' : pct >= 50 ? '🟡 Democracy Explorer' : '🟢 First-time Voter';

    result.innerHTML = `
      <div class="quiz-result-icon">${emoji}</div>
      <div class="quiz-result-score">${score}/${TOTAL}</div>
      <h3 class="quiz-result-title">${title}</h3>
      <p class="quiz-result-msg">${msg}</p>
      <div class="quiz-badge-earned">${badge}</div>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button class="btn-primary" onclick="QuizEngine.start()">🔄 Try Again</button>
        <button class="btn-secondary" onclick="document.getElementById('home').scrollIntoView({behavior:'smooth'})">🏠 Back to Home</button>
      </div>
    `;

    result.classList.add('show');
    App.launchConfetti();
    Gamification.awardQuizBadge(score);

    // Update fill to 100%
    const fill = document.querySelector('.quiz-progress-fill');
    if (fill) fill.style.width = '100%';
  }

  function applyLang() {
    // Re-render current question in new language
    if (document.querySelector('.quiz-card')?.style.display !== 'none') {
      renderQuestion();
    }
  }

  function init() {
    start();
  }

  return { init, start, applyLang };
})();

document.addEventListener('DOMContentLoaded', () => {
  QuizEngine.init();
});
