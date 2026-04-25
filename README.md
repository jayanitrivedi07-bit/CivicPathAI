# 🗳️ CivicPathAI

**Live Demo:** [https://civicpathai-1041121658831.asia-south1.run.app/](https://civicpathai-1041121658831.asia-south1.run.app/)

CivicPathAI is a government-grade, mobile-first civic utility application that acts as an intelligent, installable Progressive Web App (PWA) to guide Indian citizens through the voting process instantly and without confusion.

---

## 1. Chosen Vertical
**Civic Technology / Voting Assistance**
We identified a massive information fragmentation problem for Indian voters (especially first-time, relocated, or NRI voters) who struggle to navigate complex bureaucratic portals. Our vertical focuses on consolidating and simplifying the electoral journey into a single, centralized, and highly accessible utility. 

## 2. Approach and Logic
Our core architecture is built entirely around a **Strict Decision Engine Model**.
- **Rule-Based Over Conversational:** Instead of using an open-ended conversational AI chatbot (which is prone to hallucinations or vague advice), the system utilizes strict conditional logic (`IF age < 18 -> Not Eligible`, `IF moved -> Form 8 Required`). 
- **Action-Oriented Workflows:** Every interaction is designed to result in a definitive next step. We stripped away large blocks of informational text in favor of actionable outputs—like generating a custom document checklist, geolocating a polling booth, or surfacing a direct portal link.
- **Progressive Web App (PWA) Strategy:** We engineered the platform to be fully responsive. On a desktop, it behaves as a centered web dashboard. On a mobile device, it morphs into a full-screen, native-feeling app without borders, complete with an "Install App" capability and offline caching.

## 3. How the Solution Works
The system translates raw user data into structured UI flows via a modular backend pipeline:
`User Input -> API Gateway -> Service Layer (Classification / Geocoding / Rules) -> DB/Cache -> UI Action Flow`

- **Polling Booth Finder:** A user inputs their EPIC number or PIN. The backend normalizes the input, simulates Google Maps Geocoding, queries a spatial database (like PostGIS), and returns the booth's exact location alongside a Google Maps navigation URL.
- **Document Rule Engine:** Users input their age and current status (e.g., NRI, Recently Moved). The engine evaluates the parameters against hardcoded electoral rules and instantly generates a structured JSON payload detailing required proofs and forms.
- **Voter Status Checker:** Users provide their EPIC number. The system first checks a fast Redis cache layer. On a cache miss, it queries the main voter database (e.g., Firestore/PostgreSQL) and securely returns the registration status.
- **Election Timeline & Reminders:** An interactive stepper tracks live election phases, while users can subscribe their phone numbers to an automated cron-job scheduler for SMS reminders prior to voting day.
- **NRI Voting Guide:** A fully static, structured step-by-step card UI for Form 6A outlining embassy limitations and deadlines without overwhelming the user.

## 4. Any Assumptions Made
- **Data Mocks:** Election Commission of India (ECI) voter data, booth locations, and status returns are currently mocked within the backend database layer. The system is built to ingest real API data but does not have a live dependency on a government endpoint at this stage.
- **Geolocation Integration:** Google Maps API logic is utilized for frontend navigation linking and simulated within the backend for geocoding purposes.
- **Caching & Scalability:** The backend architecture is modeled under the assumption that Redis handles high-frequency EPIC queries, while PostGIS/MongoDB GeoJSON manages spatial polling booth queries.
- **Deployment & Containerization:** The project assumes a serverless, scalable container deployment model using Docker. It is actively configured and optimized to run seamlessly on Google Cloud Run.

---

## 🚀 Running the Project Locally

**Prerequisites:** Node.js (v14+)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the application:**
   ```bash
   npm start
   ```
4. **Access the application:**
   Open your browser and navigate to `http://localhost:3005`.

---

## ☁️ Deploying to Google Cloud Run

This project includes a `Dockerfile` optimized for deploying as a single container on Google Cloud Run.

1. **Authenticate with Google Cloud:**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```
2. **Submit the build and deploy to Cloud Run:**
   ```bash
   gcloud run deploy civicpathai \
     --source . \
     --region us-central1 \
     --allow-unauthenticated
   ```
