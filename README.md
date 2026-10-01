# ඇය (Eya) — AI-Powered Menstrual Health & Cycle Tracking App

A period tracking app built for Sri Lankan users, with support for both regular and
irregular cycles, mood-pattern insights, reminders, and a context-aware AI chatbot.

## Structure

- `mobile/` — React Native app (Expo)
- `server/` — Node.js/Express backend + Supabase + Claude AI integration
- `supabase/` — Database migrations and RLS policies
- `docs/` — API contract and architecture notes

## Team split

- **Frontend (mobile/)**: screens, navigation, local notifications, UI/UX
- **Backend (server/, supabase/)**: schema, RLS, prediction algorithm, chatbot,
  security, deployment

## Getting started

### Backend
```bash
cd server
cp .env.example .env   # fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY
npm install
npm run dev
```

### Mobile
```bash
cd mobile
cp .env.example .env   # fill in EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, EXPO_PUBLIC_API_URL
npm install
npx expo start
```

### Database
Run the SQL files in `supabase/migrations/` in order (via Supabase SQL editor or CLI):
```bash
supabase db push
```
