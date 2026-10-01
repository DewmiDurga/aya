# API Contract — Eya Backend

Base URL: `/api`
All routes (except `/health`) require `Authorization: Bearer <supabase_jwt>`.

## Profile
- `GET /profile` → Profile object
- `PATCH /profile` → body: partial profile fields → updated Profile

## Periods
- `GET /periods?limit=12` → PeriodLog[]
- `POST /periods` → body: `{ start_date, end_date?, flow_intensity? }` → PeriodLog
- `DELETE /periods/:id` → 204

## Daily logs
- `GET /logs?from=YYYY-MM-DD&to=YYYY-MM-DD` → DailyLog[]
- `POST /logs` → body: `{ log_date, mood?, symptoms?, notes? }` → DailyLog (upsert by user+date)

## Predictions
- `GET /predictions` → `{ available: false, message }` OR
  `{ available: true, predictedStart, rangeLow, rangeHigh, confidence, avgCycleLength, stdDevDays, cycleType }`

## Chat
- `POST /chat` → body: `{ message }` → `{ reply, wasRedFlagged }`

## Notes
- Dates are `YYYY-MM-DD` strings throughout.
- `confidence`: `high | medium | low`. `cycleType`: `regular | irregular | unknown`.
- Prediction needs at least 2 period logs; 3+ gives a cycle-type classification.
