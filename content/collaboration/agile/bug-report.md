---
title: "Writing a Bug Report"
summary: "Steps to reproduce, expected vs actual behavior, and environment."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["bug reports", "writing a bug report", "defect report", "issue report", "steps to reproduce"]
prereqs: ["ticket"]
related: ["reproduce-bug", "minimal-reproducible-example", "triage", "ticket", "reading-error-messages", "severity-levels"]
core: [backend, frontend, data-engineer]
---

A good bug report lets someone else **reproduce and understand the problem without asking you anything**. A bad one ("checkout is broken!") starts a long back-and-forth
before work can begin.

## What to include

1. **A specific title**: "Checkout fails with 500 when the cart contains a discontinued item" beats "Checkout bug".
2. **Steps to reproduce**, numbered, from a clean starting point:
   ```
   1. Log in as any user
   2. Add "Kettle (discontinued)" to the cart
   3. Click "Checkout"
   ```
3. **Expected behavior**: what should happen ("The order page loads with a message about the item").
4. **Actual behavior**: what happened ("White page; browser console shows a 500 from `POST /checkout`"). Include the exact error text.
5. **Environment**: browser and version, OS, device, app version, which environment (production, staging), account or role used.
6. **Evidence**: a screenshot or short recording, console output and request IDs ([reading error messages](/t/reading-error-messages)).
7. **Impact and frequency**: always or sometimes? How many users? Is there a workaround? This helps prioritize
   ([severity levels](/t/severity-levels)).

## Habits

- **One bug per report.** A mixed report is hard to assign and close.
- **Check for duplicates** before filing.
- **Reproduce it yourself first** ([reproducing a bug](/t/reproduce-bug)). If it's intermittent, say how often and what you tried.
- **Shrink it** if possible ([minimal reproducible example](/t/minimal-reproducible-example)).
- **Don't include secrets or personal data** in screenshots and logs.
- **Describe facts, not blame.** "The page shows X" rather than "the developers broke Y".
- **Stay available** to answer questions, and update the report if you learn more.

## When it's your bug

Writing the report for yourself still pays off: the act of writing steps and expected vs actual behavior often reveals the cause, and the ticket
becomes the record of what you found ([tickets](/t/ticket)).
