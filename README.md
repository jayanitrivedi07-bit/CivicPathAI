# 🗳️ CivicPathAI

CivicPathAI is a mobile-first civic utility application for Indian voters that guides users through the voting process using structured decision-based flows.

It acts as a government-grade intelligent voting assistant that converts user confusion into clear, step-by-step actions instantly. This is a pure rule-based decision engine, **not a conversational chatbot**.

---

## 1. Chosen Vertical
**Civic Technology / Voting Assistance**
Solving the information fragmentation problem for Indian voters (first-time, relocated, or NRI) by providing a centralized, structured, and action-oriented utility.

## 2. Approach & Logic
The core architecture is built around a **Decision Engine Model**.
- **Rule-Based Flows:** Instead of open-ended conversational AI, the system uses strict conditional logic (e.g., `IF age < 18 -> Not Eligible`, `IF moved -> Requires Form 8 and Address Proof`).
- **Action-Oriented Outputs:** Every interaction results in a specific outcome, such as a personalized document checklist, polling booth geolocation, or a direct link to the Election Commission portal.
- **Structured State:** By stripping away conversational free-text, the app forces structured input (dropdowns, EPIC numbers, PIN codes), guaranteeing deterministic, high-accuracy guidance.

## 3. How It Works
The system follows a strict pipeline for all its features:
`User Input -> API Gateway -> Service Layer (Classification / Geocoding / Rules) -> DB/Cache -> UI Action Flow`

- **Polling Booth Finder:** User inputs EPIC/PIN -> Backend Normalizes & Geocodes -> Geo-spatial DB Lookup (e.g., PostGIS) -> Returns Booth Details & Google Maps Navigation Link.
- **Document Rule Engine:** User inputs Age & Status -> Rule Engine evaluates -> Generates structured JSON checklist and next steps.
- **Voter Status Checker:** User inputs EPIC -> Redis Cache checked first -> On miss, queries main Voter DB -> Returns exact registration status and booth ID.
- **Reminder Scheduler:** User inputs Phone & State -> Backend stores preferences -> Cron job triggers SMS notifications prior to election day.
- **NRI Voting Guide:** A fully static, structured step-by-step card UI for Form 6A and embassy limitations.

## 4. Assumptions
- **Data Sources:** ECI (Election Commission of India) data is currently cached/mocked via the backend database mock layer. There is no live dependency on an actual government API.
- **Geolocation:** Google Maps API logic is utilized for frontend navigation linking and simulated backend geocoding.
- **Caching & DB:** The architecture assumes Redis is used for high-frequency queries (like EPIC status) and PostGIS/MongoDB GeoJSON for spatial polling booth queries.
- **Deployment:** The system is designed to be containerized and deployed to Google Cloud Run, utilizing Firebase/Firestore for scalable data storage.

---

## Running the Project Locally

### Prerequisites
- Node.js (v14+)

### Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Access the web app at `http://localhost:3005`.
