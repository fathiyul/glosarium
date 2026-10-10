---
title: "On-Call Handover"
summary: "Passing open issues and context to the next person on call."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["on-call handover", "shift handover", "handoff"]
prereqs: ["on-call", "on-call-paging"]
related: ["runbook", "incident-response", "escalation", "toil", "maintenance-window"]
---

An **on-call handover** is the pass from one on-call engineer to the next at the end of a shift. Without it, the incoming person starts blind: they don't know what's shaky, what's been "fixed" but isn't confirmed, or what's about to happen. A short, written handover turns a cold start into a warm one.

What to include:

- Active or recent incidents — anything open, anything only just mitigated, and what's still being watched.
- Fragile or suspect systems — the service that's been flapping, the alert that fired twice, the box that looks wrong.
- Changes and events coming up — a [maintenance window](/t/maintenance-window), a big launch, expected traffic, a scheduled job.
- What's already been tried — so the next person doesn't repeat work or undo a mitigation.
- Anything "small" that isn't worth a page but is worth knowing.

```text
Handover — Tue 18:00, outgoing: Sam → incoming: Priya
- API latency elevated since 15:00; mitigated by scaling, watching.
- DB replica 2 restarted; monitor for lag.
- Maintenance window Thu 02:00 for storage upgrade.
- Checkout flag "new-cart" ramping to 50% tomorrow.
```

The classic mistakes:

- **No handover at all.** The incoming engineer rediscovering everything from scratch wastes the first hour of their shift.
- **Verbal only.** A spoken "you're all good" leaves nothing to refer back to. Write it down — a shared doc or the on-call tool — so both people and history have it.
- **Hiding the messy parts.** Mentioning only the clean items and leaving "small" worries unsaid sets up the next person to be surprised.
- Not flagging upcoming changes. A launch or maintenance window the next person doesn't know about is an incident waiting to happen.

Good handovers reduce [toil](/t/toil) and shorten [incident](/t/incident-response) response, because context travels with the shift. Keep it brief and factual, and link out to the [runbook](/t/runbook) and open tickets rather than pasting their contents. Frontend, backend and data shifts all hand over the same way: what's on fire, what's fragile, what's coming.
