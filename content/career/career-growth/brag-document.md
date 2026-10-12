---
title: "Brag Document"
summary: "A running record of your accomplishments."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["brag doc", "brag sheet", "accomplishments log", "work log", "achievements document"]
prereqs: ["engineering-journal"]
related: ["engineering-journal", "impostor-syndrome", "one-on-one", "first-weeks", "finding-a-mentor", "giving-feedback"]
core: [backend, frontend, data-engineer]
---

A **brag document** is a running list of **what you've accomplished**, kept just for you. You add to it every week or two, in plain words, with evidence. It
sounds self-indulgent, but it solves real problems.

## Why keep one

- **Memory is bad.** At review time, you won't remember what you did in March. Your manager won't either.
- **Fair credit for your work**, especially work that's invisible: unblocking others, fixing flaky tests, writing docs, reviewing code, mentoring.
- **Promotions and raises** need evidence of impact ("here's what I did and what changed"), not just effort.
- **Confidence.** On days when you feel you aren't making progress, or with [impostor syndrome](/t/impostor-syndrome), the list proves otherwise.
- **Easier résumé and interview answers.**
- **Self-awareness**: patterns in what you enjoy, and where you're growing.

## What to put in

For each item: **what you did, why it mattered, and the result**, with a link where possible.

```markdown
## June
- Fixed the checkout timeout that caused ~2% of payment failures (PR #412).
  Added retries with backoff and a regression test. Failures dropped to near zero the next week.
- Wrote the on-call runbook for the payments service; used successfully in last week's incident.
- Reviewed 18 PRs, mostly for the new onboarding team.
- Presented the caching proposal at the architecture sync; the team adopted it.
- Learned: first time leading a deployment; wrote up what I'd do differently.
```

Include:

- **Shipped work** and measurable results (latency, errors, hours saved, users affected).
- **Collaboration**: reviews, mentoring, helping other teams.
- **Things you led or improved**: processes, tests, docs, tooling.
- **Learning**: new skills and what you'd do next.
- **Feedback you received**, including kind words from colleagues.
- **Problems you handled** (incidents, tough debugging).

## Habits

- **Update it regularly**, for example every Friday. Five minutes beats a panic reconstruction.
- **Save links and numbers** while they're fresh.
- **Be specific and honest.** "Improved performance" says nothing. "Cut the report query from 12 s to 1.5 s by adding an index" says plenty.
- **Include setbacks you learned from**, but keep the document mostly accomplishments.
- **Use it** for [one-on-ones](/t/one-on-one), reviews and career conversations.

Related to, but different from, an [engineering journal](/t/engineering-journal), which is for thinking and learning. A brag document is the highlights reel.
