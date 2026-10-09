---
title: "Alerting"
summary: "Notifying people when something needs attention."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["alerts", "monitoring alerts", "paging", "alert rules", "alert thresholds"]
prereqs: ["metrics", "observability"]
related: ["actionable-alerts", "alert-fatigue", "slo", "on-call", "golden-signals", "uptime-monitoring", "runbook-automation"]
core: [backend]
---

**Alerting** means automatically notifying people when something needs attention. Dashboards are for looking, and alerts are for **being interrupted**. Because an interruption costs sleep and focus, an alert must earn it.

## What makes a good alert

- **Actionable**: someone must be able to do something about it **now**. If the answer is "nothing, it'll fix itself" or "look at it tomorrow", it isn't a page ([actionable alerts](/t/actionable-alerts)).
- **Symptom-based**: alert on what **users experience** (error rate, latency, failed checkouts, "the site is down"), rather than on every possible cause (CPU at 80%, one pod restarted). Causes are for dashboards and for finding the problem once alerted.
- **Clear**: the message says what's wrong, how bad, and where to start (a link to a dashboard and a [runbook](/t/runbook-automation)).
- **Reliable**: rarely wrong. False alarms teach people to ignore alerts ([alert fatigue](/t/alert-fatigue)).

```yaml
# Prometheus-style rule (illustrative)
- alert: HighErrorRate
  expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.02
  for: 10m                     # must persist for 10 minutes: avoids flapping on blips
  labels: { severity: page }
  annotations:
    summary: "More than 2% of requests are failing"
    runbook: "https://wiki.example.com/runbooks/high-error-rate"
```

## Design choices

| Question | Guidance |
|---|---|
| **Page or ticket?** | Page (wake someone) only when users are being harmed now. Otherwise create a ticket or a chat message to handle in working hours |
| **Threshold or trend?** | Static thresholds are simple. Alerting on [SLO](/t/slo) **burn rate** (how fast you're using up your error budget) ties alerts to what matters |
| **How long must it persist?** | Add a `for` duration to ignore short blips |
| **Missing data?** | Alert on "no data" or "no heartbeat": a dead service sends no errors |
| **Who gets it?** | Route to the owning team's [on-call](/t/on-call), with an escalation path |

## Habits

- **Review alerts regularly.** Delete or fix noisy ones, and add alerts after incidents that were detected late.
- **Every page should be investigated, and each recurring one should lead to a fix**, or the removal of the alert.
- **Test them**: confirm that an alert fires when it should, and reaches someone.
- **Avoid alert storms**: group related alerts, and suppress dependent ones when the root cause is known.
- **Watch the watchers**: alert when the monitoring itself stops working.
- Use the [four golden signals](/t/golden-signals) (latency, traffic, errors, saturation) as a starting set.
