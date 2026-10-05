# Project Task Separation & CV Guide — ඇය (Eya)

This guide cleanly separates the project into distinct roles for team members, provides professional CV / resume descriptions, and details the exact Git workflow to ensure clean, individual contribution histories on GitHub.

---

## 1. Why Did the Project "Collapse"?

1. **Commit Collapsing**: The initial commit (`4515e71`) merged both the `mobile/` app and `server/` backend together into `dev-backend` and `main`.
2. **Missing Remote Branch History**: `origin/frontend-dev` and `origin/dev` were left sitting at the empty initial commit (`591cea7`), meaning the Frontend developer had no visible branch or commit footprint on GitHub.
3. **Ghost Folders**: Unused empty skeleton directories (`mobile/assets/icons/`, `mobile/src/components/*/`) remained in the workspace.
4. **Lack of Clear Task Boundaries**: Without explicit ownership, developers were unsure who configures what, leading to confusion over code ownership and CV claims.

---

## 2. Team Task Separation & Ownership Matrix

| Feature / Area | Frontend Engineer (`mobile/`) | Backend & AI Engineer (`server/`, `supabase/`) |
| :--- | :--- | :--- |
| **Authentication** | Mobile UI (Login, OTP screens), Supabase client session state | JWT Auth middleware, token verification, session protection |
| **Database & Schema** | Consumes API responses, handles local offline/loading states | PostgreSQL schema migrations (`0001`-`0005`), Supabase RLS policies |
| **Cycle Prediction** | Displays predicted dates, confidence tags, uncertainty ranges | Mathematical algorithm (`predictNextPeriod`), weighted averages, std-dev |
| **Daily Logging** | UI forms for mood, symptoms, flow intensity, notes | Upsert API endpoint (`/api/logs`), Zod payload validation |
| **AI Chatbot** | Interactive chat bubble UI, keyboard handling, disclaimers | Claude API integration, context aggregator, red-flag symptom safety detection |
| **Notifications** | Local scheduled push notifications (`expo-notifications`) | Next period trigger calculation, alert thresholds (`daysBefore`) |
| **Testing & CI** | Mobile simulator testing, component unit tests | Jest unit tests (`prediction.service.test.ts`), API integration tests |

---

## 3. CV / Resume Breakdown

Use these exact, high-impact bullet points and skill summaries tailored for resumes, LinkedIn, and university vivas/evaluations.

### Role A: Mobile Application Engineer (Frontend)
- **Role Title**: Mobile Application Engineer / React Native Developer
- **Tech Stack**: React Native, TypeScript, Expo (SDK 51), React Navigation, Supabase Auth, Expo Notifications, Victory Native
- **Primary Directories**: `mobile/`
- **Key Deliverables**:
  - **Auth & Session Flow**: Designed and built OTP and email authentication flows using `@supabase/supabase-js` and React Context (`AuthContext`).
  - **Interactive Screens**: Created the Onboarding history, Calendar cycle overview, Daily Mood/Symptom tracker, and Settings screens.
  - **Health Assistant UI**: Built a real-time conversational interface (`ChatScreen`) with auto-scrolling, optimistic message updates, and clinical disclaimer banners.
  - **Push Notifications**: Implemented local reminder scheduling via `expo-notifications` to notify users before their next cycle window.
- **CV Ready Bullet Points**:
  - *Engineered an AI-powered menstrual health tracking mobile application for iOS and Android using React Native, TypeScript, and Expo SDK 51.*
  - *Architected modular client-side state and navigation flows with React Navigation and Context API, achieving seamless authentication and session persistence.*
  - *Implemented user-centric health tracking interfaces for logging mood, symptoms, and cycle history, integrated with Victory Native for data visualization.*
  - *Integrated a local push notification system with `expo-notifications` to dynamically deliver cycle reminders and self-care alerts.*
  - *Structured typed API clients with robust error handling and loading states to interface with a remote Node.js/Express REST backend.*

---

### Role B: Backend & AI Systems Engineer
- **Role Title**: Backend & AI Systems Engineer / Cloud & API Developer
- **Tech Stack**: Node.js, Express, TypeScript, Supabase (PostgreSQL), Row-Level Security (RLS), Anthropic Claude API, Zod, Jest
- **Primary Directories**: `server/`, `supabase/`
- **Key Deliverables**:
  - **RESTful API Service**: Built modular Express architecture with controllers, services, middleware, and Zod validators.
  - **Prediction Engine**: Designed and implemented the cycle forecasting algorithm (`prediction.service.ts`) using weighted moving averages and standard deviation to handle both regular and irregular menstrual cycles.
  - **Context-Aware AI Chatbot**: Built the Claude 3.5 Sonnet / Haiku integration (`claude.service.ts`), feeding user historical logs into dynamic system prompts with strict clinical guardrails.
  - **Safety & Guardrails**: Implemented the clinical red-flag detection service (`redFlag.service.ts`) to intercept abnormal symptoms (e.g., severe hemorrhage, fainting) and append medical advisory warnings.
  - **Database Security**: Configured PostgreSQL tables with Row-Level Security (RLS) ensuring strict tenant isolation, bypassable only by backend service role.
- **CV Ready Bullet Points**:
  - *Architected and deployed a secure, modular REST API using Node.js, Express, and TypeScript, backed by PostgreSQL on Supabase.*
  - *Engineered a proprietary cycle prediction algorithm utilizing weighted averages and statistical variance (std-dev) to accurately forecast regular and irregular cycle phases with adaptive confidence scores.*
  - *Integrated Anthropic's Claude API with context-augmented prompt engineering and an automated clinical red-flag detection pipeline to ensure safe medical information delivery.*
  - *Enforced multi-tenant data privacy and security using PostgreSQL Row-Level Security (RLS) policies and JWT authentication middleware.*
  - *Wrote automated unit test suites using Jest to validate edge cases in cycle calculations and API request validation.*

---

## 4. Git Branching Strategy & Recovery Steps

To ensure both developers receive full GitHub commit credit and clear pull requests:

### Step 1: Synchronize all remote branches to the base
Run the following commands from the project root:
```bash
# Push the codebase to origin/frontend-dev so the frontend developer starts from the current base
git push origin dev-backend:frontend-dev

# Push to origin/dev so integration can happen through PRs
git push origin dev-backend:dev
```

### Step 2: Developer Workflows

#### Frontend Developer:
```bash
git checkout -B dev-frontend origin/frontend-dev
# Work exclusively in the mobile/ directory
git add mobile/
git commit -m "feat(mobile): improve calendar UI and add custom cycle picker"
git push origin dev-frontend
# Open a Pull Request from dev-frontend into dev on GitHub
```

#### Backend Developer:
```bash
git checkout -B dev-backend origin/backend-dev
# Work exclusively in server/ and supabase/ directories
git add server/ supabase/
git commit -m "feat(api): add symptom correlation analysis endpoint"
git push origin dev-backend
# Open a Pull Request from dev-backend into dev on GitHub
```

---

## 5. How to Run Locally

### 1. Backend Server
```bash
cd server
cp .env.example .env
# Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY
npm install
npm test          # Run unit tests
npm run dev       # Starts server on http://localhost:4000
```

### 2. Mobile App
```bash
cd mobile
cp .env.example .env
# Fill in EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, EXPO_PUBLIC_API_URL
npm install
npx expo start    # Press 'a' for Android emulator, 'w' for web, or scan QR with Expo Go
```

### 3. Database Migrations
Run the migrations in `supabase/migrations/` sequentially via the Supabase SQL editor or Supabase CLI:
- `0001_create_profiles.sql`
- `0002_create_period_logs.sql`
- `0003_create_daily_logs.sql`
- `0004_create_cycle_predictions.sql`
- `0005_rls_policies.sql`
