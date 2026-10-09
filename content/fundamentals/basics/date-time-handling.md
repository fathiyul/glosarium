---
title: "Dates and Times"
summary: "Time zones, UTC, ISO 8601, and why date bugs are everywhere."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["datetime", "date and time handling"]
prereqs: []
related: ["timezone", "iso-8601", "unix-timestamp", "money-precision"]
core: [backend]
---

A moment in time is not the same as what a wall clock says. "3 pm" means nothing until you
know *where*, and a date like "March 10" means different moments to different people. Most
date bugs come from mixing those two ideas up.

## The rule that prevents most bugs

**Store and pass around moments in UTC. Convert to a [time zone](/t/timezone) only at the
edges**, when showing something to a person or reading what they typed.

```python
from datetime import datetime, timezone

created_at = datetime.now(timezone.utc)   # timezone-aware, in UTC
created_at.isoformat()                    # e.g. '2024-06-01T12:00:00+00:00'
```

Use a machine-friendly format between systems: [ISO 8601](/t/iso-8601) strings (with an
offset or `Z`) or a [Unix timestamp](/t/unix-timestamp). Don't send `"06/01/24"`: is that
June 1st or January 6th?

## Common mistakes

- **Naive datetimes.** A datetime with no zone attached is just numbers. Two servers in
  different zones will read it differently. Prefer timezone-aware values.
- **Adding 24 hours to mean "tomorrow".** On a day when clocks change, a local day is
  23 or 25 hours long. Do calendar math with a date library, not with seconds.
- **Storing a future local event as UTC.** "Meeting at 9:00 in Berlin next month" should be
  stored as local time plus the zone name (`Europe/Berlin`). If the zone's rules change,
  the meeting should still be at 9:00 there.
- **Using a time for a date.** A birthday has no time and no zone. Store it as a plain date.
- **Comparing strings.** ISO 8601 strings in the same offset sort correctly; mixed offsets
  don't. Parse them first.

Rule of thumb: before writing any date code, ask whether you mean an *instant* (store UTC),
a *calendar date* (store a date), or a *local schedule* (store local time plus zone).
