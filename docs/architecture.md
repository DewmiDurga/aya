# Architecture Overview — Eya

## High level
```
React Native (Expo)  --anon key-->  Supabase (Postgres + Auth + RLS)
        |
        --JWT-->  Express API (service role key) --> Supabase (bypasses RLS, server-only)
                                                  --> Claude API (chatbot)
```

## Why split this way
- The mobile app talks to Supabase directly for simple auth/session handling, but all
  reads/writes of user health data go through the Express API so business logic
  (prediction algorithm, chatbot context-building, red-flag detection) lives in one place.
- RLS policies protect the database even if a client bug tried to query another user's rows —
  defense in depth, not just reliance on API-layer checks.
- The service role key (which bypasses RLS) never leaves the server.

## Data flow: cycle prediction
1. User logs a period start date (mobile → Express → Supabase).
2. `GET /predictions` pulls the last 6 period start dates, runs
   `predictNextPeriod()` (weighted average + std-dev), and caches the result in
   `cycle_predictions`.
3. Mobile app displays the predicted date/range and schedules a local reminder
   notification `daysBefore` the predicted date.

## Data flow: chatbot
1. User sends a message in the chat screen.
2. Express pulls recent profile flags, period logs, and daily logs for that user.
3. Context + message sent to Claude with a system prompt that forbids diagnosis and
   requires flagging red-flag symptoms.
4. Reply (with disclaimer appended if red-flagged) returned to the app.
