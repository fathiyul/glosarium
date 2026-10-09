---
title: "Estimation"
summary: "Predicting how long work will take, and communicating the uncertainty."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["software estimation", "estimating work", "time estimates", "effort estimation"]
prereqs: ["breaking-down-tasks"]
related: ["story-points", "planning-poker", "cone-of-uncertainty", "hofstadters-law", "estimate-buffers", "spike"]
core: [backend, frontend, data-engineer]
---

**Estimation** is predicting how long work will take. It's hard, and everyone is bad at it at first. The goal isn't a perfect number. It's a **useful
forecast with honest uncertainty**, so others can plan around it.

## Why estimates are usually wrong

- **Unknowns.** You discover problems while building: unclear requirements, tricky legacy code, surprises in a library.
- **Optimism.** We estimate the happy path and forget testing, review, meetings, deploys and bugs. [Hofstadter's law](/t/hofstadters-law): it always
  takes longer than you expect, even when you account for it.
- **Interruptions** and context switching.
- **Early estimates are the least informed** ([cone of uncertainty](/t/cone-of-uncertainty)).

## Practical habits

- **Break the work down first**, and estimate the small pieces ([breaking down tasks](/t/breaking-down-tasks)). Small tasks are far easier to
  estimate than big ones.
- **Give a range**, not a single number: "3 to 6 days, most likely 4". A range communicates uncertainty. A single number sounds like a promise.
- **Say what you assumed**, and what could blow it up ("assuming the API is as documented").
- **Include everything**: review, tests, deployment and waiting time. Don't estimate only typing time.
- **Compare with similar past work** ("last time a similar integration took 5 days"). Your own history is the best data.
- **Time-box investigation** of unknowns with a [spike](/t/spike), and estimate afterwards.
- **Estimate as a team** when possible, since different perspectives reveal hidden work ([planning poker](/t/planning-poker)).
- **Update when you learn.** Telling someone early that it'll take longer is far better than a surprise later
  ([status updates](/t/status-updates)).

## Estimates are not commitments

Don't let an estimate quietly turn into a deadline. If someone wants more certainty, discuss scope, options and risk, instead of squeezing the number. Padding
everything secretly isn't honest. Use visible [buffers](/t/estimate-buffers).

As a junior, you'll tend to underestimate. A useful trick: estimate, then ask a senior what they'd expect, and learn from the gap. Over time, you'll
calibrate.
