// ============================================================
// VoteSathi — Chat Widget (AI Assistant)
// ============================================================

const ChatEngine = (() => {
  let isOpen = false;
  let messageCount = 0;

  const SUGGESTIONS = {
    en: [
      "How do I vote?",
      "What is EVM?",
      "Can I vote without Voter ID?",
      "What is NOTA?",
      "Is voting secret?",
      "How to register?"
    ],
    hi: [
      "मैं वोट कैसे दूं?",
      "EVM क्या है?",
      "आईडी के बिना वोट दे सकते हैं?",
      "NOTA क्या है?",
      "क्या मतदान गुप्त है?",
      "पंजीकरण कैसे करें?"
    ]
  };

  const FALLBACK_RESPONSES = {
    en: [
      "Sorry, I can only help with election-related questions. 🇮🇳\n\nFor general information, you can:\n• Call the Voter Helpline: **1950**\n• Visit: **voters.eci.gov.in**",
      "I specialize in India's election process! 🗳️\n\nPlease ask me about:\n• Voting steps\n• EVM & VVPAT\n• Voter eligibility\n• Election timeline",
      "Sorry, I can only help with election-related questions. 😊\n\nIf you have a query about the voting process or your rights, feel free to ask!"
    ],
    hi: [
      "क्षमा करें, मैं केवल चुनाव संबंधी सवालों में मदद कर सकता हूँ। 🇮🇳\n\nसामान्य जानकारी के लिए:\n• वोटर हेल्पलाइन पर कॉल करें: **1950**\n• जाएं: **voters.eci.gov.in**",
      "मैं भारत की चुनाव प्रक्रिया का विशेषज्ञ हूँ! 🗳️\n\nकृपया इन बारे में पूछें:\n• मतदान के कदम\n• EVM और VVPAT\n• मतदाता पात्रता\n• चुनाव की समयरेखा",
      "क्षमा करें, मैं केवल चुनाव संबंधी सवालों में मदद कर सकता हूँ। 😊\n\nयदि आपके पास मतदान के बारे में कोई सवाल है, तो बेझिझक पूछें!"
    ]
  };

  const GREETING = {
    en: "👋 Namaste! I'm **VoteSathi Bot** — your election guide!\n\nAsk me anything about Indian elections, voting process, EVMs, or your rights as a voter. I'm here to help! 🗳️",
    hi: "👋 नमस्ते! मैं **VoteSathi Bot** हूँ — आपका चुनाव मार्गदर्शक!\n\nमुझसे भारतीय चुनाव, मतदान प्रक्रिया, EVM या मतदाता अधिकारों के बारे में कुछ भी पूछें। मैं मदद के लिए यहाँ हूँ! 🗳️"
  };

  function init() {
    const toggleBtn = document.getElementById('chat-toggle');
    const closeBtn = document.getElementById('chat-close');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    toggleBtn?.addEventListener('click', toggleChat);
    closeBtn?.addEventListener('click', () => setOpen(false));

    sendBtn?.addEventListener('click', sendMessage);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Render suggestion chips
    renderSuggestions();

    // Show initial bot message after delay
    setTimeout(() => {
      const lang = App.getLang();
      addBotMessage(GREETING[lang] || GREETING.en);
    }, 500);
  }

  function toggleChat() {
    setOpen(!isOpen);
  }

  function setOpen(open) {
    isOpen = open;
    const panel = document.getElementById('chat-panel');
    const notif = document.querySelector('.chat-notification');
    const toggleIcon = document.querySelector('.chat-toggle-icon');
    const toggleClose = document.querySelector('.chat-toggle-close');
    
    if (panel) panel.classList.toggle('open', open);
    if (notif && open) notif.style.display = 'none';
    if (toggleIcon) toggleIcon.style.display = open ? 'none' : 'block';
    if (toggleClose) toggleClose.style.display = open ? 'block' : 'none';
    
    if (open) {
      setTimeout(() => document.getElementById('chat-input')?.focus(), 300);
    }
  }

  function renderSuggestions() {
    const container = document.getElementById('chat-suggestions');
    if (!container) return;
    const lang = App.getLang();
    const suggestions = SUGGESTIONS[lang] || SUGGESTIONS.en;
    container.innerHTML = suggestions.map(s => `
      <button class="chat-suggestion-chip" onclick="ChatEngine.quickReply('${s}')">${s}</button>
    `).join('');
  }

  function quickReply(text) {
    const input = document.getElementById('chat-input');
    if (input) {
      input.value = text;
      sendMessage();
    }
  }

  function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input?.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';

    // Show typing indicator
    const typingEl = addTypingIndicator();

    setTimeout(() => {
      typingEl.remove();
      const response = getResponse(text);
      addBotMessage(response);
      messageCount++;
    }, 800 + Math.random() * 600);
  }

  function getResponse(text) {
    const query = text.toLowerCase();

    // Search through knowledge base
    for (const entry of VOTESATHI_DATA.chatResponses) {
      for (const keyword of entry.keywords) {
        if (query.includes(keyword.toLowerCase())) {
          return entry.response;
        }
      }
    }

    // Check FAQ data as fallback
    for (const faq of VOTESATHI_DATA.faqs) {
      const keywords = (faq.q + " " + (faq.qHi||"")).toLowerCase().split(' ').filter(w => w.length > 3);
      if (keywords.some(kw => query.includes(kw))) {
        const lang = App.getLang();
        const ans = lang === 'hi' ? faq.aHi : faq.a;
        const q = lang === 'hi' ? faq.qHi : faq.q;
        return `**${q}**\n\n${ans}`;
      }
    }

    // Random fallback
    const lang = App.getLang();
    const fallbacks = FALLBACK_RESPONSES[lang] || FALLBACK_RESPONSES.en;
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  function addUserMessage(text) {
    const messages = document.getElementById('chat-messages');
    if (!messages) return;

    const div = document.createElement('div');
    div.className = 'chat-message user';
    div.innerHTML = `
      <div class="chat-message-avatar">👤</div>
      <div class="chat-bubble">${escapeHtml(text)}</div>
    `;
    messages.appendChild(div);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const messages = document.getElementById('chat-messages');
    if (!messages) return;

    const div = document.createElement('div');
    div.className = 'chat-message bot';
    div.innerHTML = `
      <div class="chat-message-avatar">🤖</div>
      <div class="chat-bubble">${formatMessage(text)}</div>
    `;
    messages.appendChild(div);
    scrollToBottom();
    return div;
  }

  function addTypingIndicator() {
    const messages = document.getElementById('chat-messages');
    if (!messages) return document.createElement('div');

    const div = document.createElement('div');
    div.className = 'chat-message bot';
    div.innerHTML = `
      <div class="chat-message-avatar">🤖</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messages.appendChild(div);
    scrollToBottom();
    return div;
  }

  function formatMessage(text) {
    // Bold **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Newlines
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  function scrollToBottom() {
    const messages = document.getElementById('chat-messages');
    if (messages) {
      setTimeout(() => {
        messages.scrollTop = messages.scrollHeight;
      }, 50);
    }
  }

  return { init, quickReply, setOpen, toggleChat, renderSuggestions };
})();

document.addEventListener('DOMContentLoaded', () => {
  ChatEngine.init();
});
