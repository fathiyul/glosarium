---
title: "Paging"
summary: "Alerts that wake someone up."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["paging", "on-call alerts", "pager"]
prereqs: ["on-call", "alerting"]
related: ["actionable-alerts", "alert-fatigue", "runbook", "escalation", "incident-response"]
---

**Paging** is alerting that demands a human *now*: it interrupts someone off-hours to get attention on something urgent. It's the loudest rung of the notification ladder, and it should be reserved for problems that are urgent, user-impacting and actionable. Everything else is an email, a ticket or a dashboard — not a page.

A page is a small contract. It should answer: what's wrong, how bad, and what to do first. An alert without that is a wake-up with no next step.

```text
page:   "Checkout error rate > 5% for 5m — runbook: /checkout-errors"
not:    "CPU over 80%"           (a dashboard, unless it's causing harm)
```

The classic mistakes:

- **Paging on non-urgent things.** If it can wait until morning, it shouldn't wake anyone. Paging on thresholds that don't reflect user impact is the main cause of [alert fatigue](/t/alert-fatigue).
- **No runbook or owner.** The person woken at 3am needs a first step and someone to hand to (see [runbook](/t/runbook)). Without them, the page can't be resolved.
- Paging a whole team. One primary on-call owns the page; use [escalation](/t/escalation) if they can't resolve it, rather than blasting everyone.
- **Alerting on causes rather than symptoms.** A brief resource spike isn't worth waking someone; a sustained user-visible failure is.

Good paging depends on good [alerting](/t/alerting): page on things that are worth interrupting a person for, make each page [actionable](/t/actionable-alerts), and route the rest elsewhere. Frontend (a broken checkout flow) and data (a stalled pipeline) pages follow the same rule. Every page should lead to an [incident](/t/incident-response) review if it repeats, because a page that fires and resolves on its own is telling you the alert is wrong.
