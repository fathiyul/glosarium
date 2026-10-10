---
title: "Actionable Alerts"
summary: "Alerting only on symptoms that need a human to act."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["actionable alerts", "actionable alerting", "alert on symptoms"]
prereqs: ["alerting", "monitoring"]
related: ["alert-fatigue", "on-call-paging", "runbook", "slo", "golden-signals"]
---

An **actionable alert** is one that a human should act on, and can. It fires when something user-visible is wrong, points at what to do next, and stops once the problem is gone. If receiving it doesn't change what you'd do, it isn't an alert — it's a dashboard line or a ticket, and treating it as a page erodes trust in every page.

The test is a short sentence: "When this fires, I will ______." If the blank is "do nothing", "wait", or "hope it clears", it shouldn't be waking anyone.

```text
actionable:   "checkout errors > 5% for 5m → see runbook: /checkout-errors"
not:          "disk usage 71%"            → dashboard
not:          "one request failed"         → log, not a page
```

Good alerts share a few traits:

- **Symptom-based.** They fire on what users experience (errors, latency), not on every underlying cause. Causes go on dashboards.
- Owned and documented. Someone is responsible, and a [runbook](/t/runbook) gives the first step.
- Bounded. Conditions must persist before firing, so brief blips don't page.

The classic mistakes:

- Alerting on causes. High CPU, a full cache, a noisy log line — interesting, but usually not worth waking a person. Alert on the effect that matters (see [golden signals](/t/golden-signals)).
- Alerts that resolve themselves. A page that clears before anyone looks trains people to ignore pages. Require the condition to hold.
- No next step. An alert with no owner and no runbook can't be resolved, so it just adds [alert fatigue](/t/alert-fatigue).
- Everything is critical. If all alerts are urgent, none are. Reserve paging for real user impact.

The discipline is to tie paging to things you genuinely care about — often framed as [SLOs](/t/slo): if the error budget is burning, page; otherwise, look tomorrow. Pair actionable alerts with [paging](/t/on-call-paging) for the urgent cases and dashboards for everything else. Removing bad alerts is as valuable as adding good ones.
