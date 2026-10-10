---
title: "Alert Fatigue"
summary: "So many alerts that people start ignoring them."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["alert fatigue", "alert noise", "pager fatigue"]
prereqs: ["alerting", "monitoring"]
related: ["actionable-alerts", "on-call", "incident-response", "slo", "error-budget"]
---

**Alert fatigue** is what happens when a system sends so many alerts — or so many false ones — that people stop taking them seriously. On-call engineers learn that most pages are noise, so a real incident gets the same shrug as the rest, and response gets slower exactly when it matters.

The root cause is usually bad alert design: alerting on every symptom and every threshold rather than on conditions a human needs to act on. If a page doesn't tell you something is wrong *and* what to do, it's training people to ignore the pager.

The classic mistakes:

- **Alerting on causes instead of symptoms.** A brief CPU spike, or one failed request, isn't worth waking someone. Alert on user-visible pain — high error rate, slow responses — and let dashboards show the causes.
- **Too-sensitive thresholds.** A short blip pages immediately, then resolves before anyone looks. Require condition to persist before alerting.
- **No owner or runbook.** An alert nobody owns, with no [runbook](/t/runbook), can't be resolved and shouldn't page.
- Noisy alerts that auto-resolve. Flapping trains people to wait it out.

Fixing it is as much culture as tooling: review pages regularly, delete or downgrade alerts that don't lead to action, and track how many pages were noise. Tie alerts to things you actually care about — [SLOs](/t/slo) and [error budgets](/t/error-budget) give a principled line between "page" and "look at the dashboard tomorrow" (see [actionable alerts](/t/actionable-alerts)). A healthy on-call rotation ([on-call](/t/on-call)) depends on every page meaning something.
