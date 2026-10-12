---
title: "Manual / Exploratory Testing"
summary: "A human exploring the product to find what automation misses."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["exploratory testing", "manual QA", "ad hoc testing"]
prereqs: ["software-testing"]
related: ["end-to-end-test", "functional-testing", "bug-report", "testing-your-own-work", "test-in-production"]
---

Manual testing is a person using the software to see whether it works, instead of a script doing it. Exploratory testing is the thoughtful version: the tester learns the product while testing, and follows hunches to find problems nobody thought to write a test for.

## What humans are good at

- **Noticing what feels wrong**: confusing wording, awkward flows, ugly layouts, slow interactions.
- **Trying the unexpected**: pasting emoji, rapid clicking, back button mid-flow, tiny screens, odd data.
- **Judging usability and visual quality.**
- **Testing new features before automation exists.**
- **Checking things hard to automate**: hardware, real devices, third-party redirects.

Automated tests catch what you predicted. People find what you didn't.

## How to explore well

- **Start with a goal** (a "charter"): "explore checkout with expired cards", for 30 minutes.
- **Vary things**: roles, devices, browsers, data sizes, languages, slow networks.
- **Try to break it**: empty fields, huge input, special characters, double clicks ([double submit](/t/double-submit)).
- **Take notes** as you go: what you tried, what happened.
- **Report clearly** with steps to reproduce ([bug reports](/t/bug-report)).
- **Retest after the fix.**

## For developers

Manual testing of your own work is part of being done ([testing your own work](/t/testing-your-own-work)): run the feature in a browser or with real requests, not just the unit tests.

## Limits

- **Slow, expensive and not repeatable.** Don't rely on it for regression checks. Automate what you do every release.
- **Human error and fatigue.**
- **Doesn't scale.**

The healthy balance: automate the repetitive checks, and spend human time on exploration ([end-to-end tests](/t/end-to-end-test), [functional testing](/t/functional-testing)).
