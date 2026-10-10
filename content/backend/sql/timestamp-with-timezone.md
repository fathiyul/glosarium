---
title: "Timestamp With vs Without Time Zone"
summary: "Storing moments in time correctly in the database."
levels: { backend: mid-level, data-engineer: mid-level , data-analyst: mid-level }
aliases: ["timestamp with time zone", "timestamptz", "timestamp vs timestamptz"]
prereqs: ["date-time-handling", "timezone"]
related: ["schema", "timezone"]
---

Columns storing time come in two kinds, and the difference causes real bugs:

- Timestamp with time zone (`timestamptz` in PostgreSQL) — stores a specific **instant** in time. Internally it's kept in **UTC**; the time zone you see is just how it's displayed. `2026-01-15 12:00 UTC` and `2026-01-15 13:00 CET` are the same moment.
- Timestamp without time zone (`timestamp`) — stores a **wall-clock** reading with no zone: "12:00", no more. It's ambiguous until you know what zone it was meant in.

```text
timestamptz: '2026-01-15 12:00:00Z'   → an instant, unambiguous
timestamp:   '2026-01-15 12:00:00'    → a local clock reading, ambiguous
```

The rule of thumb: **store instants as `timestamptz` (UTC)**, and convert to a local zone only for display. Events, `created_at`, expiry times — all instants — should be zone-aware.

The classic mistakes:

- Using `timestamp` for instants. A `timestamp` column that's "really UTC" works only as long as everyone remembers. One developer writes local time, another reads it as UTC, and times are off by hours with no way to tell. `timestamptz` removes the ambiguity.
- Assuming `timestamptz` stores the zone. It stores an instant; the zone is presentation. Two rows that look different in different sessions are the same instant.
- Storing the client's local time. The database shouldn't hold a wall clock tied to one user's zone. Convert client input to an instant on the way in.
- Wall-clock cases need `timestamp`. *Future* recurring events ("09:00 in the user's own zone", "the meeting on the 1st at 14:00 local") are genuinely zone-relative; forcing them into `timestamptz` can be wrong. Distinguish "an instant" from "a local time in a named zone", and store the zone separately if needed.
- DST across the boundary. Converting a wall-clock time on a DST-change day to an instant is ambiguous or invalid; handle those cases explicitly (see [recurring events](/t/recurring-events)).
- Mixing columns. Half your tables zone-aware, half not, is a bug factory. Standardise on `timestamptz` for instants.

How to decide: if it's a moment that happened or will happen at one point in time, use `timestamptz` in UTC. If it's a recurring or zone-relative wall clock, store the local time plus the zone. Making this choice explicitly prevents a whole class of off-by-hours bugs. See [timezone](/t/timezone).
