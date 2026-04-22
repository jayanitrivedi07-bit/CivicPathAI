// ============================================================
// VoteSathi — Personalization Engine (Onboarding Modal)
// ============================================================

const PersonalizationEngine = (() => {
  const profile = {
    age: null,
    firstTime: null,
    state: null,
    loaded: false
  };

  function loadProfile() {
    // Disabling localStorage read so the modal shows on every page reload for presentation
    profile.loaded = false;
  }

  function saveProfile() {
    // Disabling localStorage write so the modal resets on page reload
  }

  function showModal() {
    const overlay = document.getElementById('onboarding-modal');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    const overlay = document.getElementById('onboarding-modal');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function init() {
    loadProfile();

    // Show modal after brief delay if not onboarded
    if (!profile.loaded) {
      setTimeout(showModal, 1200);
    } else {
      applyPersonalization();
    }

    // Radio button visual selection
    document.querySelectorAll('.modal-radio-label').forEach(label => {
      label.addEventListener('click', () => {
        const group = label.closest('.modal-radio-group');
        group?.querySelectorAll('.modal-radio-label').forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
      });
    });

    // Form submit
    document.getElementById('onboarding-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = parseInt(document.getElementById('user-age')?.value);
      const stateVal = document.getElementById('user-state')?.value;
      const firstTimeRadio = document.querySelector('input[name="first-time"]:checked');

      if (!age || age < 1 || age > 110) {
        showFieldError('user-age', 'Please enter a valid age');
        return;
      }

      profile.age = age;
      profile.state = stateVal || 'Not specified';
      profile.firstTime = firstTimeRadio?.value === 'yes';
      profile.loaded = true;
      saveProfile();

      hideModal();
      applyPersonalization();
      showWelcomeMessage();
    });

    // Skip button
    document.getElementById('skip-onboarding')?.addEventListener('click', () => {
      profile.age = 25;
      profile.firstTime = false;
      profile.state = 'General';
      profile.loaded = true;
      saveProfile();
      hideModal();
    });
  }

  function showFieldError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
    setTimeout(() => {
      field.style.borderColor = '';
      field.style.boxShadow = '';
    }, 2000);
  }

  function applyPersonalization() {
    if (!profile.loaded) return;

    // Update greeting in hero
    const heroGreeting = document.getElementById('hero-greeting');
    if (heroGreeting) {
      if (profile.firstTime && profile.age >= 18) {
        heroGreeting.textContent = "🎉 Welcome, First-Time Voter! Let's get you started.";
      } else if (profile.age > 0 && profile.age < 18) {
        heroGreeting.textContent = `📚 Hi! You're ${profile.age}. Learn about elections now so you're ready to vote at 18!`;
      } else if (profile.state && profile.state !== 'General') {
        heroGreeting.textContent = `🗳️ Welcome, voter from ${profile.state}! Your journey to informed voting starts here.`;
      }
      heroGreeting.style.display = 'block';
    }

    // Eligibility markers
    const isEligible = profile.age >= 18;
    document.querySelectorAll('[data-eligible-only]').forEach(el => {
      el.style.display = isEligible ? '' : 'none';
    });

    document.querySelectorAll('[data-underage-only]').forEach(el => {
      el.style.display = !isEligible ? '' : 'none';
    });

    // Profile display
    const profileDisplay = document.getElementById('profile-display');
    if (profileDisplay && profile.age) {
      profileDisplay.innerHTML = `
        <span>👤 Age: ${profile.age}</span>
        <span>📍 ${profile.state || 'India'}</span>
        <span>${profile.firstTime ? '🆕 First-time voter' : '🗳️ Experienced voter'}</span>
      `;
    }
  }

  function showWelcomeMessage() {
    const msg = profile.firstTime
      ? "Welcome aboard! 🎉 We've customized your journey for first-time voters."
      : `Welcome back! 🗳️ Let's explore India's election process together.`;

    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; top: 90px; right: 24px;
      background: var(--bg-surface); border: 1px solid var(--border-accent);
      border-radius: var(--radius-md); padding: 16px 20px;
      max-width: 320px; z-index: 9999; font-size: 14px;
      color: var(--text-primary); box-shadow: var(--shadow-md);
      animation: fadeSlideDown 0.4s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  function getProfile() { return { ...profile }; }

  return { init, getProfile, showModal, hideModal };
})();

document.addEventListener('DOMContentLoaded', () => {
  PersonalizationEngine.init();
});
