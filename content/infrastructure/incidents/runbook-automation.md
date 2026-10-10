---
title: "Runbook Automation"
summary: "Turning manual runbook steps into scripts."
levels: { backend: senior, data-engineer: senior }
aliases: ["runbook automation", "automated remediation", "self-healing"]
prereqs: ["runbook", "toil"]
related: ["incident-response", "monitoring", "scheduled-jobs", "break-glass-access", "sre"]
---

A [runbook](/t/runbook) tells a human how to handle a known problem. **Runbook automation** takes the repeatable steps and makes them executable — a script, a job, or an automatic action — so remediation is faster, consistent, and doesn't depend on someone reading correctly at 3am.

The progression is usually: **document → script → automate**.

```text
document: "restart the worker and clear the queue (careful: check X first)"
script:   run ./restart-worker.sh --check-first
automate: alert fires → action runs → post to the incident channel
```

Each step reduces toil. A script removes typos and forgotten steps; an automatic action removes the wait for a human entirely. But each step also removes a human judgement, which is exactly where the danger lies.

The classic mistakes:

- Automating a process nobody understood. If the manual runbook is wrong or incomplete, automating it makes the failure faster and more frequent. Fix the process first, on paper.
- Automatic actions with no guardrails. An auto-remediation that restarts the wrong service, or scales down at the wrong time, can cause a second incident. Require safety checks, limits and a clear log of what it did.
- Blurring the human line. Some steps are safe to automate (restart a stateless worker); others need a person (anything touching data). Automate the first, keep the second manual — and say which is which.
- Letting automation hide the cause. Auto-restarting at the first sign of trouble can paper over a problem that keeps recurring. Track how often it fires; frequent auto-remediation is a signal to fix the root cause.
- Secrets in the automation. Automated actions need credentials. Store them properly and scope them tightly (see [break-glass access](/t/break-glass-access) and [secrets management](/t/secrets-management)).

**When to automate:** when a step is repetitive, well-understood and safe to run unattended. That's the definition of [toil](/t/toil), and reducing it is a goal of [SRE](/t/sre). Start by scripting the manual steps and running them yourself, watch them work, then decide which are safe to trigger automatically from [monitoring](/t/monitoring) or a [scheduled job](/t/scheduled-jobs).
