# 🗳️ CivicPathAI

🌐 **Live Demo:** [https://civicpathai-1041121658831.asia-south1.run.app/](https://civicpathai-1041121658831.asia-south1.run.app/)

📦 **GitHub:** [https://github.com/jayanitrivedi07-bit/CivicPathAI.git](https://github.com/jayanitrivedi07-bit/CivicPathAI.git)

CivicPathAI is a mobile-first, installable civic utility (PWA) designed to simplify the voting journey for Indian citizens by converting complex electoral processes into clear, structured, action-based workflows.

It removes confusion, reduces friction, and guides users step-by-step through voting eligibility, registration, polling booth discovery, and required documentation.

---

## 🎯 1. Chosen Vertical
**Civic Technology / Voting Assistance**

India’s voting ecosystem is highly fragmented across portals, documents, and offline processes. CivicPathAI solves this by:
- Centralizing voting-related information
- Converting information into actionable workflows
- Supporting first-time voters, relocated citizens, and NRIs
- Reducing dependency on manual navigation of government portals

The focus is usability, clarity, and execution — not information overload.

---

## 🧠 2. Approach and Core Logic
CivicPathAI is built as a **Decision Engine System**, not a chatbot or informational website.

### 🧩 Core Principles

#### 1. Rule-Based Decision System
Instead of conversational AI:
- IF conditions determine user flow
- Example:
  - `IF age < 18` → Not eligible
  - `IF relocated` → Address update flow
  - `IF registered` → Booth + status flow

#### 2. Action-Oriented Design
Every interaction produces a next step, not just information:
- **Find booth** → Navigate
- **Check status** → Register link if missing
- **Documents** → Checklist generation

#### 3. Structured Outputs
All backend responses are returned as structured JSON to ensure:
- Predictable UI rendering
- No ambiguity
- Easy scaling

#### 4. Progressive Web App (PWA)
The system dynamically adapts:
- 📱 **Mobile** → Full-screen native app experience
- 💻 **Desktop** → Centered dashboard web UI
- 📲 Installable as an app from browser

---

## ⚙️ 3. How the Solution Works
CivicPathAI follows a modular backend pipeline:
`User Input → API Gateway → Service Layer → Data Layer → UI Action Flow`

### 📍 Polling Booth Finder
**Flow:**
1. User enters EPIC / PIN / Address
2. Input is normalized
3. Geocoding service converts location → lat/lng
4. Geo-database query finds nearest booth
5. Response includes navigation-ready output

**Output:** Booth name, Address, Distance, Google Maps link

### 🔍 Voter Registration Status Checker
**Flow:**
1. User enters EPIC or Name + DOB
2. Redis cache checked first (fast lookup)
3. On miss → main voter database queried

**Output:** Registered / Not Registered status, Constituency details (if found), Direct registration link (if not found)

### 🧾 Document Checklist Engine
A rule-based system that generates requirements based on user profile.
**Inputs:** Age, Voter status (first-time / moved / registered)
**Output:** Required documents, Missing document warnings, Eligibility status

### ⏰ Election Timeline & Reminder System
- Interactive timeline of election phases
- Users can enable reminders
- Scheduler triggers alerts before key dates

### 🇮🇳 NRI Voting Guide
A structured step-by-step flow covering:
- Eligibility rules
- Form 6A process
- Embassy limitations
- Deadlines and instructions

### 📄 One-Click Action Hub
Central navigation dashboard:
- Register to Vote
- Check Status
- Find Booth
- Document Checklist
- Election Timeline
- Official Links

---

## 🧱 4. System Architecture
```text
Frontend (PWA Web App)
        ↓
API Gateway (Node.js / Express)
        ↓
Service Layer
  ├── Booth Finder Service (Geo + Maps)
  ├── Voter Status Service (Cache + DB)
  ├── Document Engine (Rule System)
  ├── Reminder Scheduler (Cron Jobs)
        ↓
Data Layer
  ├── Redis Cache (Fast lookup)
  ├── Voter DB (Firestore / PostgreSQL)
  ├── Booth Geo DB (PostGIS / GeoJSON)
        ↓
External Services
  ├── Google Maps API (Geocoding + Navigation)
```

---

## ☁️ 5. Google Cloud Integration
CivicPathAI is designed for cloud-native deployment using:
- 🚀 **Google Cloud Run** (containerized backend)
- 🗺️ **Google Maps API** (location services)
- ⚡ Serverless architecture for scalability
- 📦 Docker-based deployment

---

## 🧪 6. Engineering Quality
- **✔ Code Quality:** Modular service-based backend, Separation of concerns, Reusable rule engine design
- **✔ Security:** Input validation, No sensitive data exposure, Stateless API design
- **✔ Efficiency:** Redis caching for frequent queries, Geo-indexed booth lookup for fast search
- **✔ Accessibility:** Mobile-first UI, Large interactive buttons, Simple, non-technical language

---

## 🚫 7. Key Design Decisions
- ❌ No chatbot or conversational AI
- ❌ No unstructured text responses
- ❌ No information-heavy UI
- ✔ Strict decision-based flows
- ✔ Action-first design philosophy

---

## 🏁 8. Final Outcome
CivicPathAI behaves like:
> *“A government-grade intelligent civic assistant that converts confusion into clear, structured actions instantly.”*

---

## 🚀 9. Running Locally
```bash
cd backend
npm install
npm start
```
Open: `http://localhost:3005`

---

## ☁️ 10. Deployment (Google Cloud Run)
```bash
gcloud run deploy civicpathai \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```
