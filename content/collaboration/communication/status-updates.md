---
title: "Status Updates"
summary: "Proactively telling people where things stand."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["progress updates", "status reports", "keeping people informed", "updating stakeholders", "standup updates"]
prereqs: ["ticket"]
related: ["standup", "remote-visibility", "stakeholder-management", "estimation", "async-communication", "writing-clearly"]
core: [backend, frontend, data-engineer]
---

A **status update** tells others where your work stands, without them having to chase you. The habit is simple: **tell people before they have to ask**,
especially when something has changed.

## A simple structure

- **Done**: what's finished since the last update.
- **Doing / next**: what you're working on now.
- **Blocked or at risk**: what's in the way, what you need, from whom, by when.
- **Changes**: any shift in the estimate or scope.

> **Update (Tue):** Export endpoint is done and in review. Starting the CSV streaming part today. **Risk:** the reporting DB replica lags up to 10 minutes,
> so exports may be stale. I'd like a decision from @Maya on whether that's acceptable. Still expecting Friday, but Thursday would be
> a stretch now.

## Habits

- **Lead with the headline**: on track, at risk or blocked.
- **Bad news early.** A problem reported on Tuesday is manageable. The same problem on Friday is a crisis. Nobody is upset about early honesty. People get upset
  by surprises.
- **Be concrete and specific**: "80% done" means little. "API and tests finished, UI remaining, about two days" is useful.
- **Say what you need** and from whom, instead of describing the problem and hoping.
- **Keep it short.** Writing for the reader's time, not yours ([writing clearly](/t/writing-clearly)).
- **Be consistent.** Daily standup, a weekly note or ticket comments, whichever the team uses ([standup](/t/standup)).
- **Update the ticket** ([tickets](/t/ticket)), so status lives where people look. This matters a lot on remote teams
  ([remote visibility](/t/remote-visibility)).

## Why it matters

Updates build trust. When people know where things stand, they leave you alone to work, and when a problem arises, they help early. Going quiet makes people
assume the worst, and drives them to check in constantly.

For managers and stakeholders, the question is rarely "what did you do?". It's "will this be ready, and what should I do about it?" Answer that
([stakeholder management](/t/stakeholder-management)).
