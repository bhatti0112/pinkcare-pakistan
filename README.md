# PinkCare Pakistan — Breast Health Awareness & Hospital Discovery Platform

PinkCare is a production-oriented, evidence-based breast cancer awareness, education, and nationwide hospital-discovery platform designed specifically for Pakistan.

---

## 1. Clinical Mission & Safety Boundaries

- **Educational & Care Navigation Only**: PinkCare is not a diagnostic medical device. It does not issue medical diagnoses, evaluate mammogram images, or calculate personal cancer risk percentages.
- **Immediate Escalation**: Visitors with persistent symptoms are directed to verified healthcare facilities and emergency helplines in Pakistan (Rescue 1122, Edhi 115).
- **Verified Provenance**: Hospital records and educational articles cite peer-reviewed clinical authorities (WHO Global Breast Cancer Initiative, Shaukat Khanum Memorial Cancer Hospital & Research Centre, AKUH, and NCCN).

---

## 2. Architecture & Technology Stack

- **Frontend**: React 19, Vite, React Router, Three.js (3D Awareness Ribbon), Anime.js, Tailwind CSS with full Urdu (`Noto Nastaliq Urdu`) and English (`Plus Jakarta Sans`) typography and bidirectional RTL layout support.
- **Backend**: Node.js, Express, Cookie-Parser, Helmet security headers, rate limiting, and an in-memory database with GeoJSON coordinates and full MongoDB/Mongoose compatibility.
- **AI Assistant ("Ask PinkCare")**: RAG pipeline retrieving verified excerpts from clinical guidelines and hospital registries, backed by Gemini (`gemini-3.8-flash`) with a deterministic, safe local fallback.

---

## 3. Quickstart & Local Development

### Prerequisites
- Node.js 20+
- npm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/pinkcare.git
cd pinkcare

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### Running Locally
```bash
# Starts the fullstack Express + Vite development server on http://localhost:3000
npm run dev
```

### Running Automated Tests
```bash
# Executes the security and API verification test suite
npm test
```

### Production Build & Deployment
```bash
# Build the production frontend bundle
npm run build

# Start the production Node.js Express server
NODE_ENV=production npm start
```

---

## 4. API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Health check probe |
| `GET` | `/api/v1/facilities` | Filterable nationwide facility registry |
| `GET` | `/api/v1/facilities/nearby` | Proximity search by latitude and longitude |
| `GET` | `/api/v1/facilities/:id` | Detailed hospital record |
| `POST` | `/api/v1/facilities/report` | Submit community correction reports |
| `GET` | `/api/v1/articles` | Bilingual clinical educational articles |
| `GET` | `/api/v1/sources` | Academic & institutional reference registry |
| `POST` | `/api/v1/ask-pinkcare` | Evidence-grounded RAG AI assistant |
| `POST` | `/api/v1/auth/login` | Secure staff authentication |
| `POST` | `/api/v1/auth/logout` | Session invalidation |
| `GET` | `/api/v1/admin/audit-logs` | Tamper-evident admin audit history |

---

## 5. Medical Governance & Verification

All healthcare facility records in `server/src/data/db.ts` and `src/data/facilitiesData.ts` represent verified, accredited cancer care hospitals in Pakistan (including Shaukat Khanum Lahore & Peshawar, AKUH Karachi, PIMS Islamabad, JPMC, INMOL, KIRAN, and CENAR Quetta).
