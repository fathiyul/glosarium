---
title: "Recurring Events"
summary: "Repeating schedules, RRULE, and their time zone edge cases."
levels: { backend: senior, frontend: senior }
aliases: ["recurring events", "recurrence", "repeating events"]
prereqs: ["scheduled-jobs", "timezone"]
related: ["scheduled-jobs", "cron", "timezone"]
---

**Recurring events** are things that happen repeatedly on a rule — a weekly stand-up, a monthly bill, an event "every second Tuesday" — rather than once. Modelling recurrence correctly is surprisingly tricky, because rules have exceptions, end conditions, and time-zone/DST complications.

The standard approach is a **recurrence rule** (the iCalendar RRULE format is the common standard): a start, a frequency (daily/weekly/monthly/yearly), an interval, days of week/month, and an end (count or until date). Store the *rule*, not a materialised list of every occurrence.

```text
RRULE: FREQ=WEEKLY;BYDAY=TU;INTERVAL=2;UNTIL=20261231
  → every second Tuesday until the end of 2026
```

You then *expand* occurrences as needed (for a calendar view or to schedule the next run), applying exceptions (a cancelled instance, a moved one).

The classic mistakes:

- Storing every occurrence instead of the rule. Materialising years of occurrences is wasteful and breaks when the rule changes. Store the rule and expand on demand (or materialise a bounded window).
- Ignoring time zones and DST. "9:00 every day" in a user's zone shifts across daylight-saving changes; a naive UTC-only model fires at the wrong local time (see [timezone](/t/timezone)). Store the local time and zone.
- Month-end edge cases. "Monthly on the 31st" has no 31st in February; rules must define what happens (skip, or use the last day). Undefined behaviour here causes missing or duplicate events.
- Exceptions not modelled. Real series have cancellations and one-off modifications ("this week it's at 10"); without an exception model, you can't represent reality.
- Endless recurrence. An infinite rule needs a bound when expanding (a window), or you loop forever.
- Overlapping with reminders. Reminder *notifications* for an event are separate scheduled jobs; don't confuse the recurrence rule with the notification schedule (see [scheduled jobs](/t/scheduled-jobs)).
- Recomputing the rule differently in each place. If the calendar view, the reminder job and the report each interpret the rule, they disagree. Centralise expansion.

**How to model it:** store a recurrence rule (start, frequency, interval, end) plus exceptions, keeping the local time and zone; expand occurrences over a bounded window for display and scheduling; and centralise the expansion logic. It's a case where the "obvious" model (a list of dates) fails as soon as rules change or time zones and DST intervene — the rule-plus-exceptions model handles reality. See [cron](/t/cron).
