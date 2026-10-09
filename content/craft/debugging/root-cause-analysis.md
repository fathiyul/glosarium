---
title: "Root Cause Analysis"
summary: "Finding the underlying reason, not just the symptom."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["RCA", "root cause", "finding the root cause", "five whys", "cause analysis"]
prereqs: ["debugging"]
related: ["five-whys", "blameless-postmortem", "postmortem", "debugging", "incident", "heisenbug"]
core: [backend, frontend]
---

**Root cause analysis** is working out **why** a problem happened at a deep enough level that fixing it prevents a repeat, instead of treating only the visible symptom.

A symptom is "the site returned errors". A shallow fix is "restart the server". The root cause is whatever made the errors happen in the first place, which keeps being true until it's fixed.

## Ask "why?" repeatedly

The [five whys](/t/five-whys) technique:

```
The checkout failed for 20 minutes.
 Why? The database ran out of connections.
 Why? Each request opened a connection and some never released it.
 Why? An error path in the new coupon code returned early without closing it.
 Why wasn't this caught? No test covers the error path, and review didn't spot it.
 Why can it take down the whole site? There's no limit on connections per service, and no alert until it hit 100%.
```

Each answer reveals another layer: the code bug, the missing test, the missing alert. "Five" is just a guide. Stop when you reach causes you can **act on**.

## Principles

- **Evidence over theory.** Check each "because" against logs, metrics, code and timelines. Don't accept a plausible story.
- **There's rarely a single cause.** Incidents usually need several things to go wrong together: a bug, a missing safeguard and a late alert. Listing contributing factors is more
  accurate than naming one culprit.
- **Look at the system, not the person.** "Human error" is a starting point. Ask why the system made that error easy and why nothing caught it
  ([blameless postmortems](/t/blameless-postmortem)).
- **Separate trigger from cause**: the trigger (a deploy at 14:00) is not necessarily the underlying cause (a latent bug that any traffic could have revealed).
- **Stop at causes in your control.** "Users are unpredictable" isn't actionable. "Our API accepts a 2 GB upload with no limit" is.

## What to do with the result

Turn findings into **specific follow-ups** with owners: fix the bug, add the test, add a guardrail, add an alert, update the runbook. Prioritize what prevents recurrence or limits the
damage. See [postmortems](/t/postmortem).

In debugging, this means: don't stop when the symptom disappears. If a fix is "added a retry", ask why the first call failed ([debugging](/t/debugging)).
