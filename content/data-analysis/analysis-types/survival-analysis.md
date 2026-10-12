---
title: "Survival Analysis"
summary: "Modelling time until an event: churn, failure, conversion."
core: [data-scientist]
levels: { data-analyst: senior , data-scientist: junior }
aliases: ["survival analysis", "time-to-event analysis", "churn modelling"]
prereqs: ["regression-analysis", "cohort-analysis"]
related: ["cohort-analysis", "retention-analysis", "regression-analysis", "survivorship-bias"]
---

**Survival analysis** models *time until something happens*: how long customers stay, when machines fail, how quickly leads convert. Its defining problem is **censoring** — most subjects have not had the event yet when you look. A customer active today is not "retained forever"; they are retained *so far*, and throwing them out (or counting them as successes) biases everything.

```text
customer A: churned month 3  (event observed)
customer B: active month 9   (censored: survived ≥ 9 months, future unknown)
wrong: drop B, or call B "retained" → both bias the curve
```

The survival curve — share surviving past each time — handles censoring honestly and reads directly: median lifetime, 12-month retention, the shape of risk over time. Comparing curves between cohorts or arms (with proper tests, not eyeballing) is the core churn/retention analysis.

The classic mistakes:

- Dropping censored observations. Keeping only completed lifetimes selects for short ones — the dead tell you everyone dies young. This is [survivorship bias](/t/survivorship-bias) wearing a lab coat.
- Calling active users "retained". Retention at month 12 can only be computed over users *old enough* to be 12 months in. Recent cohorts contribute only to early months — align by tenure ([cohort analysis](/t/cohort-analysis)), never by calendar date.
- Ignoring competing events. Users who are deleted for fraud did not "churn normally"; machines retired early did not "fail". Lumping competing outcomes distorts the curve for the event you care about.
- Proportional-hazards autopilot. The standard regression assumes each factor multiplies risk constantly over time. A feature whose effect fades (onboarding emails matter in week 1, not month 6) violates it — check, do not assume.
- Reading causation off curves. The enterprise curve outlives self-serve — because of the segment or the sales process? Curves describe; [causal inference](/t/causal-inference) explains.

**When to use it:** any duration question with incomplete follow-up — retention, tenure, lifetime value horizons, failure times. If every subject's outcome is already known, ordinary regression suffices; survival machinery exists for the censored middle where most real data lives.
