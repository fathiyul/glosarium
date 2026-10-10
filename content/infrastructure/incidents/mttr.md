---
title: "MTTR / MTTD"
summary: "Mean time to recover, and to detect."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["MTTR", "MTTD", "mean time to recover"]
prereqs: ["incident-response", "monitoring"]
related: ["dora-metrics", "alerting", "slo", "uptime-monitoring", "postmortem"]
---

**MTTR** is *mean time to recover* (sometimes *repair*): the average time from an incident starting to service being restored. **MTTD** is *mean time to detect*: the average time from the problem beginning to someone noticing. They're related — a fast fix doesn't help if detection is slow — and they're the stability half of the [DORA metrics](/t/dora-metrics).

```text
incident starts ──MTTD──▶ noticed ──(respond)──▶ recovered
└──────────────────── MTTR (from start) ────────┘
```

The useful insight is where the time actually goes. A breakdown usually shows detection, diagnosis and mitigation as distinct phases, and they're fixed by different things: better [alerting](/t/alerting) and [monitoring](/t/monitoring) shorten detection; good [runbooks](/t/runbook) and fast [rollback](/t/rollback) shorten mitigation.

The classic mistakes:

- Optimising only recovery. Teams focus on fixing faster and ignore that a problem ran undetected for an hour. Shorter MTTD often has the bigger payoff.
- Averages that hide the pain. "Mean" time to recover is dragged by one monster incident or flattered by many trivial ones. Look at the distribution, and at the worst cases, not just the mean.
- Measuring to compare people. These are system metrics. Used to judge individuals, they get gamed — incidents closed as "resolved" before they are.
- Not measuring detection at all. Many teams track recovery but never MTTD, so they can't see that their blind spot is noticing problems, not fixing them (see [uptime monitoring](/t/uptime-monitoring)).

**How to use it:** break incidents into phases and find the biggest one. If it's detection, invest in monitoring and [actionable alerts](/t/actionable-alerts). If it's diagnosis, improve [observability](/t/observability) and runbooks. If it's mitigation, make rollback and feature flags fast. Track the trend, not a single number — and remember that preventing the incident entirely beats recovering from it quickly.
