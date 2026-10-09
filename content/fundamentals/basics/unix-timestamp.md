---
title: "Unix Timestamp"
summary: "Seconds since 1970-01-01 UTC; a simple, unambiguous point in time."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["epoch time", "POSIX time", "Unix time"]
prereqs: ["date-time-handling"]
related: ["iso-8601", "timezone", "date-time-handling", "integer-overflow"]
---

A Unix timestamp counts the seconds since the Unix epoch: 00:00:00 UTC on 1 January 1970. It's one number that identifies a single moment, with no time zone to worry about.

```python
import time
time.time()                  # e.g. 1791624000.5 (seconds, as a float)
```

```js
Date.now()                   // e.g. 1791624000500 (milliseconds!)
Math.floor(Date.now() / 1000)
```

Anyone, anywhere, with the same timestamp means the same instant. The local clock reading is only a way to display it ([time zones](/t/timezone)).

## Handy because

- **Math is easy.** The difference between two timestamps is a duration in seconds.
- **It sorts and compares as a plain number.**
- **It's compact** and language-neutral.

## Pitfalls

- **Seconds vs milliseconds.** JavaScript and Java often use milliseconds, many other systems use seconds. A value like `1791624000000` is almost certainly milliseconds. Confusing the two puts dates around 1970 or in the year 50,000.
- **Not human-readable.** For APIs and logs people read, prefer [ISO 8601](/t/iso-8601).
- **Leap seconds are ignored.** A day is always 86,400 in Unix time.
- **32-bit overflow.** A signed 32-bit counter runs out on 19 January 2038, so use 64-bit ([integer overflow](/t/integer-overflow)).
- **Negative values** are dates before 1970.
- **Don't use it for future local events** ("9:00 in Berlin next month"). The offset rules might change ([dates and times](/t/date-time-handling)).

To show it to a person, convert to the user's zone at the last moment.
