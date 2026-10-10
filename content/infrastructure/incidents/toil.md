---
title: "Toil"
summary: "Manual, repetitive operational work that should be automated."
levels: { backend: senior, data-engineer: senior }
aliases: ["toil", "operational toil", "manual ops work"]
prereqs: ["runbook", "monitoring"]
related: ["runbook-automation", "sre", "scheduled-jobs", "on-call", "observability"]
---

**Toil** is operational work that is manual, repetitive, automatable, and gives no lasting value. Restarting the same service every Monday, manually rotating a certificate, copying data by hand each week, clicking through the same 8-step process to add a customer. It scales linearly with the system — more customers or servers mean more toil — and it consumes the time that should go into improvement.

The standard test: if a task is predictable, repeated, and could be done by a script, it's toil. It's not "work I dislike" — a hard, one-off investigation isn't toil even if it's unpleasant.

```text
toil:     every morning, manually check disk and clear the queue
not toil: one-off investigation of why the queue filled up
```

The point of tracking it is to cap it. SRE practice treats toil as a budget: if a team spends too much time on repetitive work, that's a signal to automate, because toil crowds out the engineering that reduces it.

The classic mistakes:

- Accepting it as "just ops". Repetitive manual work is easy to normalise, and every hour of it is an hour not spent fixing the cause. Notice it explicitly.
- Automating the wrong thing. Automating a process nobody understands, or that changes constantly, wastes effort. Automate the stable, predictable steps.
- Calling all unpleasant work toil. Not every hard task is toil; some is valuable engineering. Over-applying the label leads to automating things that should be judgment calls.
- Automating and walking away. A script that no one maintains becomes its own toil. Automation needs ownership and observability like any code.
- Fixing symptoms by automating them. Auto-restarting a crashing service reduces toil but hides the defect. Do both: automate the response *and* fix the cause.

**How to reduce it:** script and then automate the predictable steps (see [runbook automation](/t/runbook-automation)), move recurring work to [scheduled jobs](/t/scheduled-jobs), and improve [observability](/t/observability) so fewer things need a manual look. Reducing toil is a core goal of [SRE](/t/sre) and the reason a healthy team guards its time. Track it, budget it, and chip away at it.
