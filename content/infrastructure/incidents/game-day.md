---
title: "Game Day"
summary: "Practicing incident response with simulated failures."
levels: { backend: staff, data-engineer: staff }
aliases: ["game day", "chaos day", "failure drill"]
prereqs: ["incident-response", "monitoring"]
related: ["chaos-engineering", "runbook", "on-call", "postmortem", "disaster-recovery"]
---

A **game day** is a planned exercise where a team deliberately creates failures to practice responding to them. You might kill a service, disconnect a dependency, or simulate a failed region, and then work the problem as if it were real — declaring an incident, coordinating through an [incident commander](/t/incident-commander), using the [runbooks](/t/runbook). The goal is to find gaps and build muscle memory in a controlled setting, before a real outage.

```text
hypothesis: "if the primary DB fails, we fail over within 10 minutes"
exercise:   stop the primary in a scoped window
observe:    does monitoring fire? do the docs work? who knew what to do?
follow-up:  fix the gaps found (docs, alerts, automation)
```

It's the deliberate-practice counterpart to [chaos engineering](/t/chaos-engineering): chaos experiments test the system's resilience continuously and often automatically; a game day tests the *people and process* in a one-off exercise. They overlap and complement each other.

The classic mistakes:

- No hypothesis or success criteria. "Let's break something and see" produces anecdotes, not learning. Decide what you're testing and what a good outcome looks like.
- Surprising real users. A drill that runs without scoping can cause a real outage. Set boundaries, announce to the teams involved, and start small.
- Too big the first time. Teams often plan an elaborate multi-service failure and create chaos they can't manage. Start with one component in a safe window.
- No follow-up. The value is in fixing what the exercise exposed — stale runbooks, missing alerts, unclear ownership. Without action items, it's just stress.
- Skipping the review. Treat the exercise like an incident: a short [postmortem](/t/postmortem) of what worked and what didn't.

**When to run one:** regularly enough to stay sharp, and especially before big events — a launch, a migration, peak season. They're also the best way to test [disaster recovery](/t/disaster-recovery) plans, which are otherwise assumptions until exercised. A team that has practice recovering is a team that recovers faster when it counts.
