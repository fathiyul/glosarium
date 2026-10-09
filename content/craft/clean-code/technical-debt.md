---
title: "Technical Debt"
summary: "The future cost of shortcuts taken now."
levels: { backend: junior, frontend: junior }
aliases: ["tech debt", "code debt"]
prereqs: ["clean-code"]
related: ["refactoring", "code-smell", "legacy-code", "yagni", "broken-windows"]
core: [backend, frontend]
---

**Technical debt** is the future cost of shortcuts taken today. Like financial debt, it lets
you move faster now, and you pay **interest** later: every change in the messy area takes
longer, and bugs are likelier. The metaphor is usually credited to Ward Cunningham.

```python
# Shortcut taken to ship by Friday
if country == "US" or country == "CA" or country == "MX":    # copied in 9 places
    ...
```

Adding a fourth country now means finding all nine places. Each extra change pays the interest.

## Kinds of debt

| Type | Example |
|---|---|
| Deliberate | "Hard-code this for the demo; we'll clean up after launch" |
| Accidental | We didn't know a better design when we wrote it |
| Outdated | The design fit last year's needs, not this year's |
| Neglect | Old libraries and unmaintained code that accumulate risk |

Not all of it is bad. Taking on debt on purpose, with a plan, can be the right call to meet a
deadline or test an idea. The problem is **unmanaged** debt: nobody knows it exists, and it never gets paid.

## Handling it

- **Make it visible.** Leave a clear `TODO` with context, or add a ticket. Don't pretend it isn't there.
- **Pay it down in small steps**, near the code you're already changing (see
  [refactoring](/t/refactoring)).
- **Prioritize by interest**: fix the debt in the code you touch often. Stable, ignored code
  can wait.
- **Talk about cost**, not cleanliness, when you explain it to non-engineers: "this slows every
  checkout change by a day".
- **Avoid creating it carelessly.** "We'll fix it later" often means never.

Not every ugly piece of code is debt. It only counts if it costs you something.
