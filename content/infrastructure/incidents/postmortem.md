---
title: "Postmortem"
summary: "A written review of an incident: what happened and how to prevent it."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["post-mortem", "incident review", "incident postmortem", "after-action review", "retrospective for incidents"]
prereqs: ["incident"]
related: ["blameless-postmortem", "root-cause-analysis", "five-whys", "incident-response", "mttr", "on-call"]
core: [backend]
---

A **postmortem** (or incident review) is a **written analysis of an incident** after it's resolved: what happened, why, how it was handled and what will change to prevent a repeat or reduce its impact. Its purpose is **learning**, not blame.

## What goes in it

1. **Summary**: a few sentences on what happened and its impact.
2. **Impact**: who was affected, for how long, with measurable numbers (failed requests, users, revenue, data affected).
3. **Timeline**: the key events with timestamps in one time zone: when the change was made, when it started failing, when it was detected, who responded, what was tried, when it was fixed.
4. **Root cause and contributing factors**: not only the trigger, but why the system allowed it and why detection or recovery took as long as it did ([root cause analysis](/t/root-cause-analysis), [five whys](/t/five-whys)).
5. **What went well** (the alert worked, rollback was quick) and **what went badly**.
6. **Where we got lucky.**
7. **Action items**, each with an **owner and a due date**, prioritized by how much they reduce risk: fix, detect sooner, mitigate faster.
8. **Lessons learned.**

```
Impact: 38 minutes of failed checkouts for ~12% of users (est. 1,400 orders delayed).
Detection: customer support reported it 14 minutes after it began; no alert covered the checkout success rate.
Action: add checkout-success SLO alert (owner: Maya, due 6/14); load-test connection limits (owner: Ken, 6/21).
```

## Make it blameless

A [blameless postmortem](/t/blameless-postmortem) focuses on **how the system and process allowed the failure**, not on who made the mistake. People who fear punishment hide information, and you lose the truth you need. Someone typed the wrong command because the system made that easy and didn't catch it.

## Habits that make them useful

- **Write it soon**, while memory is fresh, and share it widely, so other teams learn.
- **Hold a discussion**, not only a document.
- **Do it for near misses** and significant events, not just outages.
- **Follow through on action items.** A postmortem with no completed actions is theater. Track them like any other work.
- **Keep a library** of past ones. Patterns across incidents show the real weaknesses.
- **Be factual and specific**: what happened, not opinions or "human error" as a conclusion.

Related practices measure and improve response over time ([MTTR](/t/mttr), [incident response](/t/incident-response)).
