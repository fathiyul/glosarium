---
title: "Reliability"
summary: "A system doing what it should, even when things fail."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["reliability", "reliable systems", "dependability"]
prereqs: ["availability", "fault-tolerance"]
related: ["availability", "slo", "chaos-engineering"]
---
**Reliability** is the probability a system performs correctly over time — availability plus correctness, durability and predictable latency, sustained across failures and change. Where availability asks "is it up?", reliability asks "does it do the right thing, every time, even when parts break and code ships?"

```text
reliability = availability (serves) × correctness (right answers)
             × durability (keeps data) × latency (in time)
```

Engineering reliability means designing for failure (redundancy, degradation, fast recovery), shipping safely (progressive delivery, fast rollback), measuring honestly (SLOs on user-visible outcomes), and learning systematically (blameless postmortems that fix systems, not people).

The classic mistakes:

- Equating reliability with uptime. A system serving wrong answers 100% of the time is "available." Measure correctness and latency alongside serving.
- Reliability as a team instead of a property. A reliability team without product-team ownership becomes advisory theatre. Reliability is built by everyone shipping; specialists enable and audit.
- 100% as a goal. Perfection costs infinitely and slows everything; error budgets make reliability-vs-velocity an explicit, managed trade.
- Learning from outages without fixing. Postmortems producing action items nobody tracks repeat the outage on schedule. Track fixes like features, with owners and deadlines.
- Fragile speed. Shipping fast without progressive delivery and rollback makes every deploy a reliability gamble. Velocity needs safety machinery, not courage.
- Measuring machines, not users. Server CPU dashboards while checkout fails miss the point. SLOs on user journeys; alerts on symptoms users feel.
- Heroics rewarded. All-night saves celebrated more than prevented incidents incentivise firefighting over fire prevention. Reward the boring reliability work.

**How to build it:** user-measured SLOs, error budgets governing velocity, safe shipping, designed degradation, blameless learning with tracked fixes. Reliability is what users experience compounded over time — engineer the compound, not the moment.
