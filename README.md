# ඇය (Eya) — AI-Powered Menstrual Health & Cycle Tracking Platform

A modern, full-stack reproductive wellness and menstrual cycle tracking platform built with **Next.js (App Router)**, **Express.js**, **Supabase (PostgreSQL & Auth)**, and **Claude AI**.

---

## Architecture Overview

```
                      ┌─────────────────────────────┐
                      │    Next.js 14 Web Portal    │
                      │  (App Router, RSC, Client)  │
                      └──────────────┬──────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    ┌─────────────────────────┐             ┌─────────────────────────┐
    │     Supabase Cloud      │             │   Express.js REST API   │
    │  (PostgreSQL Auth & DB) │             │ (Predictions & Claude)  │
    └─────────────────────────┘             └────────────┬────────────┘
                                                         │
                                                         ▼
                                            ┌─────────────────────────┐
                                            │     Anthropic Claude    │
                                            │      (Health Chatbot)   │
                                            └─────────────────────────┘
```

- **`frontend/`**: Next.js 14 application utilizing App Router, Server Components for fast data loading, Client Components for interactive cycle calendar and symptom tracking, and Supabase Auth.
- **`backend/`**: Node.js & Express REST API managing the weighted mathematical cycle prediction algorithm, statistical standard deviation variance, and the Claude AI conversational service with medical safety guardrails.

---

## Getting Started

### 1. Backend Setup
```bash
cd backend
cp .env.example .env
# Configure SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY
npm install
npm run dev
# Running on http://localhost:4000
```

### 2. Frontend Setup
```bash
cd frontend
cp .env.example .env.local
# Configure NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_API_URL
npm install
npm run dev
# Running on http://localhost:3000
```
