// ============================================================
// VoteSathi — Election Simulator (Mock EVM Voting Experience)
// ============================================================

const SimulatorEngine = (() => {
  let currentStep = 0;
  let selectedCandidate = null;
  let hasVoted = false;

  const CANDIDATES = [
    { name: 'Priya Sharma', party: 'Progressive Party', symbol: '🌺' },
    { name: 'Rajesh Kumar', party: 'United Front', symbol: '🌟' },
    { name: 'Anita Patel', party: 'People\'s Alliance', symbol: '🦅' },
    { name: 'NOTA', party: 'None of the Above', symbol: '🚫' }
  ];

  const STEPS = [
    {
      id: 'arrive',
      title: 'Step 1: Arrive at Polling Booth',
      titleHi: 'चरण 1: मतदान केंद्र पर पहुंचें',
      desc: 'You arrive at your designated polling booth. The queue is orderly. You show your Voter ID to the polling officer who verifies your name in the voter roll.',
      descHi: 'आप अपने निर्धारित मतदान केंद्र पर पहुंचते हैं। कतार व्यवस्थित है। आप मतदान अधिकारी को अपना वोटर आईडी दिखाते हैं जो मतदाता सूची में आपके नाम की पुष्टि करता है।',
      icon: '🏫',
      btn: 'Proceed to Verification →',
      btnHi: 'सत्यापन के लिए आगे बढ़ें →'
    },
    {
      id: 'verify',
      title: 'Step 2: Identity Verification',
      titleHi: 'चरण 2: पहचान सत्यापन',
      desc: 'The Polling Officer verifies your identity, checks your name in the electoral roll, and applies indelible (permanent) ink on your left index finger. You sign the register.',
      descHi: 'मतदान अधिकारी आपकी पहचान सत्यापित करता है और आपकी बाईं तर्जनी पर अमिट (स्थायी) स्याही लगाता है। आप रजिस्टर पर हस्ताक्षर करते हैं।',
      icon: '✍️',
      btn: 'Enter Voting Compartment →',
      btnHi: 'मतदान कक्ष में प्रवेश करें →'
    },
    {
      id: 'vote',
      title: 'Step 3: Cast Your Vote on EVM',
      titleHi: 'चरण 3: EVM पर अपना वोट डालें',
      desc: 'You enter the private voting compartment ALONE. The EVM awaits. Press the button next to your chosen candidate. Remember — this is completely secret!',
      descHi: 'आप अकेले निजी मतदान कक्ष में प्रवेश करते हैं। EVM तैयार है। अपने चुने हुए उम्मीदवार के बगल का बटन दबाएं। याद रखें — यह पूरी तरह गुप्त है!',
      icon: '🗳️',
      btn: null,
      btnHi: null
    },
    {
      id: 'vvpat',
      title: 'Step 4: VVPAT Confirmation',
      titleHi: 'चरण 4: VVPAT पुष्टि',
      desc: 'After pressing the EVM button, a paper slip appears in the VVPAT window for 7 seconds showing your candidate\'s name and party symbol. This confirms your vote.',
      descHi: 'EVM बटन दबाने के बाद, VVPAT विंडो में 7 सेकंड के लिए एक पेपर स्लिप दिखाई देती है जो आपके उम्मीदवार का नाम और पार्टी का प्रतीक दिखाती है। यह आपके वोट की पुष्टि करता है।',
      icon: '🧾',
      btn: 'Exit Booth →',
      btnHi: 'बूथ से बाहर निकलें →'
    },
    {
      id: 'done',
      title: '🎉 You\'ve Voted!',
      titleHi: '🎉 आपने वोट दे दिया!',
      desc: 'Congratulations! You have successfully exercised your democratic right. Your vote is safely stored in the EVM. Show your inked finger proudly — you are a voter! 🇮🇳',
      descHi: 'बधाई हो! आपने सफलतापूर्वक अपने लोकतांत्रिक अधिकार का प्रयोग किया है। आपका वोट EVM में सुरक्षित रूप से दर्ज हो गया है। अपनी स्याही लगी उंगली गर्व से दिखाएं — आप एक मतदाता हैं! 🇮🇳',
      icon: '🎊',
      btn: 'Restart Simulation ↺',
      btnHi: 'सिमुलेशन पुनः आरंभ करें ↺'
    }
  ];

  function init() {
    currentStep = 0;
    selectedCandidate = null;
    hasVoted = false;
    updateStepIndicators();
    renderStep();
  }

  function updateStepIndicators() {
    const container = document.querySelector('.simulator-step-indicator');
    if (!container) return;

    container.innerHTML = STEPS.map((_, idx) => `
      <div class="sim-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'done' : ''}"></div>
    `).join('');
  }

  function renderStep() {
    const step = STEPS[currentStep];

    // Hide all steps
    document.querySelectorAll('.simulator-step').forEach(el => el.classList.remove('active'));

    // Show current step
    const stepEl = document.getElementById(`sim-step-${currentStep}`);
    if (!stepEl) {
      buildStep();
    } else {
      stepEl.classList.add('active');
    }
  }

  function buildStep() {
    const body = document.querySelector('.simulator-body');
    if (!body) return;

    // Clear and rebuild
    // Keep indicator
    const indicator = body.querySelector('.simulator-step-indicator');

    body.innerHTML = '';
    if (indicator) body.appendChild(indicator);

    // Rebuild all steps
    const lang = App.getLang();
    STEPS.forEach((step, idx) => {
      const div = document.createElement('div');
      div.className = `simulator-step ${idx === currentStep ? 'active' : ''}`;
      div.id = `sim-step-${idx}`;

      const title = lang === 'hi' ? step.titleHi : step.title;
      const desc = lang === 'hi' ? step.descHi : step.desc;
      const btn = lang === 'hi' ? step.btnHi : step.btn;

      if (step.id === 'vote') {
        // EVM step — render interactive EVM
        div.innerHTML = buildEVMStep(title, desc);
      } else if (step.id === 'vvpat') {
        div.innerHTML = buildVVPATStep(title, desc, btn);
      } else if (step.id === 'done') {
        div.innerHTML = buildDoneStep(title, desc, btn);
      } else {
        div.innerHTML = `
          <div class="simulator-scene">
            <span class="simulator-scene-icon">${step.icon}</span>
            <h3 class="simulator-scene-title">${title}</h3>
            <p class="simulator-scene-desc">${desc}</p>
            <button class="btn-primary" onclick="SimulatorEngine.nextStep()">${btn}</button>
          </div>
        `;
      }

      body.appendChild(div);
    });

    updateStepIndicators();
  }

  function buildEVMStep(title, desc) {
    const lang = App.getLang();
    const ballotText = lang === 'hi' ? 'बैलेट यूनिट — एक उम्मीदवार चुनें' : 'BALLOT UNIT — SELECT ONE CANDIDATE';
    const pressHint = lang === 'hi' ? '👆 अपने पसंदीदा उम्मीदवार के बगल में नीला बटन दबाएं' : '👆 Press the blue button next to your preferred candidate';
    
    return `
      <div class="simulator-scene">
        <h3 class="simulator-scene-title">${title}</h3>
        <p class="simulator-scene-desc">${desc}</p>
        <div class="evm-machine">
          <div class="evm-screen">${ballotText}</div>
          <div class="evm-candidates" id="evm-candidates">
            ${CANDIDATES.map((c, idx) => `
              <div class="evm-candidate" id="evm-c-${idx}" onclick="SimulatorEngine.pressEVM(${idx})">
                <div class="evm-btn" id="evm-btn-${idx}" title="Press to vote for ${c.name}"></div>
                <span class="evm-party-symbol">${c.symbol}</span>
                <span class="evm-candidate-name">${c.name}<br><small style="opacity:0.6;font-size:9px">${c.party}</small></span>
              </div>
            `).join('')}
          </div>
        </div>
        <p style="font-size:12px;color:var(--text-muted);margin-top:16px;">${pressHint}</p>
      </div>
    `;
  }

  function buildVVPATStep(title, desc, btn) {
    const candidate = selectedCandidate !== null ? CANDIDATES[selectedCandidate] : CANDIDATES[0];
    const lang = App.getLang();
    const windowLabel = lang === 'hi' ? 'VVPAT विंडो' : 'VVPAT WINDOW';
    const timerText = lang === 'hi' ? 'पर्ची 7 सेकंड के लिए दिखाई देगी...' : 'Slip visible for 7 seconds...';
    return `
      <div class="simulator-scene">
        <h3 class="simulator-scene-title">${title}</h3>
        <p class="simulator-scene-desc">${desc}</p>
        <div class="vvpat-machine">
          <div class="vvpat-label">${windowLabel}</div>
          <div class="vvpat-window">
            <div class="vvpat-slip show" id="vvpat-slip">
              <div class="vvpat-slip-symbol">${candidate.symbol}</div>
              <div class="vvpat-slip-name">${candidate.name}</div>
              <div style="font-size:10px;color:#888;margin-top:4px;">${candidate.party}</div>
            </div>
          </div>
          <div id="vvpat-timer" style="color:#88ff88;font-family:monospace;font-size:12px;text-align:center;margin-top:8px;">
            ${timerText}
          </div>
        </div>
        <button class="btn-primary" onclick="SimulatorEngine.nextStep()" style="margin-top:24px;">${btn}</button>
      </div>
    `;
  }

  function buildDoneStep(title, desc, btn) {
    const lang = App.getLang();
    const inkMsg = lang === 'hi' ? '☝️ आपकी स्याही भारत के लोकतंत्र का प्रतीक है!' : '☝️ Your ink marks India\'s democracy!';
    return `
      <div class="simulator-scene">
        <span class="simulator-scene-icon">🎊</span>
        <h3 class="simulator-scene-title">${title}</h3>
        <p class="simulator-scene-desc">${desc}</p>
        <div style="background:rgba(19,136,8,0.15);border:2px solid rgba(19,136,8,0.3);display:inline-flex;align-items:center;gap:12px;padding:16px 28px;border-radius:50px;font-weight:700;color:#4caf50;margin:24px 0;font-size:1rem;">
          ${inkMsg}
        </div>
        <br>
        <button class="btn-primary" onclick="SimulatorEngine.init()">${btn}</button>
      </div>
    `;
  }

  function pressEVM(idx) {
    if (hasVoted) return;
    selectedCandidate = idx;
    hasVoted = true;

    // Visual feedback
    document.querySelectorAll('.evm-candidate').forEach((el, i) => {
      if (i === idx) {
        el.classList.add('voted');
        document.getElementById(`evm-btn-${i}`)?.classList.add('pressed');
      }
    });

    // Show confirmation message
    const evm = document.querySelector('.evm-machine');
    if (evm) {
      const screen = evm.querySelector('.evm-screen');
      if (screen) {
        screen.textContent = '✓ VOTE RECORDED — THANK YOU';
        screen.style.color = '#88ff88';
      }
    }

    // Auto-advance after 1.5 seconds
    setTimeout(() => nextStep(), 1500);
  }

  function nextStep() {
    if (currentStep >= STEPS.length - 1) {
      // Last step — restart
      init();
      return;
    }
    currentStep++;
    updateStepIndicators();
    buildStep();

    // VVPAT countdown
    if (STEPS[currentStep].id === 'vvpat') {
      startVVPATCountdown();
    }

    // Done step — confetti
    if (STEPS[currentStep].id === 'done') {
      App.launchConfetti();
    }
  }

  function startVVPATCountdown() {
    let seconds = 7;
    const timer = document.getElementById('vvpat-timer');
    const lang = App.getLang();
    const interval = setInterval(() => {
      seconds--;
      if (timer) timer.textContent = lang === 'hi' ? `पर्ची ${seconds} सेकंड के लिए दिखाई देगी...` : `Slip visible for ${seconds} seconds...`;
      if (seconds <= 0) {
        clearInterval(interval);
        const slip = document.getElementById('vvpat-slip');
        if (slip) slip.style.opacity = '0';
        if (timer) timer.textContent = lang === 'hi' ? 'पर्ची सीलबंद बॉक्स में गिर गई ✓' : 'Slip dropped into sealed box ✓';
      }
    }, 1000);
  }

  return { init, nextStep, pressEVM };
})();

document.addEventListener('DOMContentLoaded', () => {
  SimulatorEngine.init();
});
