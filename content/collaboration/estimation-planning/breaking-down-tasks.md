---
title: "Breaking Down Tasks"
summary: "Splitting work into pieces small enough to finish and estimate."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["task breakdown", "splitting work", "work breakdown", "decomposing tasks", "slicing work"]
prereqs: ["user-story"]
related: ["estimation", "small-prs", "vertical-slice", "spike", "ticket", "timeboxing"]
core: [backend, frontend, data-engineer]
---

Big tasks hide uncertainty. "Build the notifications feature" can't be estimated, started or reviewed meaningfully. **Breaking it down** means splitting it
into pieces small enough to finish, estimate and ship, ideally each taking a day or two.

## How to split

Instead of splitting by technical layer ("do the database, then the API, then the UI"), prefer **thin vertical slices** that each deliver
something that works end to end ([vertical slice](/t/vertical-slice)):

```
Too big:  Build notifications

Slices:
  1. Send a single email notification when an order ships (hard-coded template)
  2. User can turn email notifications off in settings
  3. Add notification history page
  4. Add push notifications on mobile
  5. Group notifications that arrive close together
```

Each slice is usable, testable and can be shipped. You get feedback earlier, and can stop when the value runs out.

## Techniques

- **Ask "what's the smallest thing that's useful?"** and start there.
- **Split by user steps, rules or data variations**: one payment method first, then the others.
- **Separate the risky or unknown parts** and investigate them first with a time-boxed [spike](/t/spike).
- **List what you don't know** as questions to answer before committing to an estimate.
- **Peel off non-functional work**: tests, migrations, monitoring, documentation, as explicit items instead of an afterthought.
- **Use the Definition of Done** as a checklist for each piece ([definition of done](/t/definition-of-done)).

## Signs a task is still too big

- You can't describe it in a sentence, or can't say when it's finished.
- Estimating it feels like a guess ("a week... maybe two?").
- It would produce a huge pull request ([small PRs](/t/small-prs)).
- It depends on several other things being finished first.

## Good habits

Write the breakdown down in the ticket, review it with a teammate, and adjust as you learn. A breakdown is a plan, not a contract. Better to discover a missing
piece on day one than on day nine. See [estimation](/t/estimation).
