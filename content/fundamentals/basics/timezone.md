---
title: "Time Zone"
summary: "Offsets from UTC that change with location and daylight saving."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: [TZ, time zones, IANA time zone, tz database]
prereqs: [date-time-handling]
related: [date-time-handling, iso-8601, unix-timestamp]
core: [backend]
---

A **time zone** is a region's rule for what its clocks say relative to UTC. It's more than a
fixed number: the offset can change during the year (daylight saving time), and governments
change the rules.

## Offset vs zone name

| | Example | Knows about daylight saving? |
|---|---|---|
| Offset | `+01:00` | No. It's just the difference right now |
| Zone name (IANA) | `Europe/Berlin` | Yes, including past and future rule changes |

Prefer **IANA names** (`America/New_York`, `Asia/Tokyo`) when you need to *remember where*
someone is. An offset only describes one instant.

Avoid abbreviations like `CST`: the same letters are used for different zones in different
countries, so they're ambiguous. Not every zone is a whole hour away from UTC either; India
is `+05:30` and Nepal `+05:45`.

## Converting

Keep the stored moment in UTC and convert when displaying:

```python
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

t = datetime(2024, 6, 1, 12, 0, tzinfo=timezone.utc)
t.astimezone(ZoneInfo("Asia/Tokyo"))     # 2024-06-01 21:00:00+09:00
t.astimezone(ZoneInfo("Europe/Berlin"))  # 2024-06-01 14:00:00+02:00
```

## Daylight saving oddities

When clocks go forward, some local times **don't exist** (nothing happens between 02:00 and
03:00 that night in many places). When they go back, some local times happen **twice**. A
job scheduled "at 02:30 local time" can be skipped or run twice, so schedule recurring
server work in UTC.

Practical defaults: run servers in UTC, store timestamps in UTC, keep each user's zone as a
setting (or take it from their browser), and convert only to display. See
[dates and times](/t/date-time-handling) for the full picture.
