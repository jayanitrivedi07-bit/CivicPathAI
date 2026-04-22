# 🗳️ VoteSathi

> **Understand Democracy. Step by Step.**

**VoteSathi** is an intelligent, highly interactive single-page application (SPA) designed to demystify India's election process. Targeted at first-time voters and general citizens, VoteSathi transforms complex civic information into an engaging, visual, and personalized digital journey.

---

## ✨ Core Features

- **👤 Personalized Onboarding:** Adapts content based on the user's age, state, and whether they are a first-time voter.
- **🗺️ Interactive Timeline Engine:** A visual, horizontal-scrolling timeline that guides users through all 7 phases of the Indian election process (from Announcement to Results), complete with key facts and expanding detail cards.
- **🚶‍♂️ Voter Journey Wizard:** A 5-step guided simulation that walks a citizen through checking eligibility, getting a Voter ID, finding a booth, the voting experience, and post-vote expectations.
- **🎮 EVM Simulator:** A mock, interactive Electronic Voting Machine (EVM) complete with button interactions and a 7-second VVPAT slip confirmation animation.
- **🤖 AI Chat Assistant:** A built-in floating chat widget powered by a rule-based NLP engine that provides instant answers to common election queries. Includes typing indicators and quick-reply chips.
- **🏆 Gamification & Quiz:** A 10-question dynamic quiz engine that tests civic knowledge and awards visual badges ("First-time Voter", "Democracy Explorer", "Civic Expert"). Progress tracking monitors how much of the app the user has explored.
- **🔍 Myth vs. Fact:** Interactive 3D flip-cards designed to combat common election misinformation.
- **🌐 Accessibility-First:**
  - **Bilingual:** Instant toggle between English and Hindi.
  - **Theming:** Full Dark Mode and Light Mode support.
  - **Typography:** Large Text mode for improved readability.

---

## 🛠️ Technology Stack

VoteSathi is built with zero external dependencies to ensure lightning-fast load times, making it a perfect drop-in asset for government platforms.

- **HTML5:** Semantic structuring and accessibility.
- **Vanilla CSS3:** Custom design system using CSS Variables (`main.css`, `components.css`), Glassmorphism, and complex keyframe animations (`animations.css`).
- **Vanilla JavaScript (ES6+):** Modular, structured state and logic engines (Timeline, Quiz, Chatbot, Simulator, Gamification).

---

## 📂 Project Structure

```text
CivicPathAI/
├── index.html               # Main application shell
├── css/
│   ├── main.css             # Design tokens, grid layouts, and typography
│   ├── components.css       # Styles for cards, widgets, timeline, and simulator
│   └── animations.css       # Keyframes for confetti, loading, and transitions
└── js/
    ├── data.js              # Election knowledge base, translations, and quiz DB
    ├── app.js               # Core routing, theme toggles, and gamification
    ├── personalization.js   # Onboarding modal and profile state
    ├── timeline.js          # Interactive 7-phase timeline renderer
    ├── journey.js           # Voter journey wizard and FAQ accordion
    ├── quiz.js              # Quiz engine and scoring mechanics
    ├── chat.js              # Conversational NLP chatbot interface
    └── simulator.js         # EVM and VVPAT mock voting simulator
```

---

## 🚀 How to Run Locally

Since this project uses no build tools, bundlers, or heavy frameworks, getting it to run requires absolutely no setup.

### Option 1: Direct File Access
Simply double-click the `index.html` file to open it in any modern web browser.

### Option 2: Local Web Server (Recommended)
Running through a local web server is recommended for the best experience (to avoid strict cross-origin policies on local files if you expand the app later).

Using Python:
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your browser.

---

## 🤝 Designing for Trust

The UI is built to emulate a modern, trustworthy digital government platform:
- **Colors:** Deep Navy, Saffron, India Green, and Government Blue.
- **Clarity:** Elimination of jargon in favor of simplified, step-by-step explanations.
- **Privacy:** State is handled entirely on the client-side. No user data is transmitted or collected.

---
*Built to strengthen India's democracy.* 🇮🇳
