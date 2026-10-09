---
title: "Managing Technical Debt"
summary: "Tracking, prioritizing and paying down debt deliberately."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["technical debt management", "paying down tech debt", "tech debt strategy", "debt prioritization", "tech debt backlog"]
prereqs: ["technical-debt", "refactoring"]
related: ["technical-debt", "refactoring", "boy-scout-rule", "big-bang-rewrite", "strangler-fig", "legacy-code", "prioritization"]
core: [backend, frontend]
---

Every codebase accumulates [technical debt](/t/technical-debt). The question for senior engineers isn't how to eliminate it (impossible), but **how to manage it deliberately**, so it doesn't quietly slow the team down, and so you don't overspend on cleaning things that don't matter.

## 1. Make it visible

Debt that nobody sees can't be prioritized. Keep a lightweight **debt register**: for each item, **what it is, where it lives, what it costs and what it would take to fix.** Use the issue tracker, tagged consistently. Capture items as they're discovered: after incidents, during code review, when a change was harder than it should have been.

## 2. Describe the cost, in terms others care about

"The code is ugly" convinces nobody. **Interest** is the extra work or risk the debt causes **now**:

- "Every change to billing takes twice as long because the logic is duplicated in four places."
- "This module caused three incidents in six months."
- "New hires take weeks to understand this part."
- "We can't upgrade the framework until this is fixed, and the old version loses security support in October."

Quantify when you can: time lost, incident counts, delayed projects, risk. This is what lets you compare debt with features and make a case ([explaining to non-engineers](/t/explaining-to-non-engineers)).

## 3. Prioritize by interest and risk

Not all debt is worth paying.

- **High interest, high traffic areas**: code you change often and that causes pain. Pay it down.
- **High risk**: security, data loss, reliability, compliance issues. Treat as urgent.
- **Low interest, rarely touched**: ugly but stable. Leave it.
- **Blocks something important** (an upgrade, a new feature, a migration): pay it, as part of that work.

Use the same prioritization habits as other work ([prioritization](/t/prioritization)): impact against effort.

## 4. Pay it continuously, in the work you're already doing

- **Leave code better than you found it** ([boy scout rule](/t/boy-scout-rule)), with small, safe [refactorings](/t/refactoring) while working in an area. "Make the change easy, then make the easy change."
- **Include cleanup in the estimate** of features that touch messy code, instead of treating it as a separate favor.
- **Reserve a steady share of capacity** for debt and maintenance (many teams set aside a recurring slice of each cycle), so it doesn't wait for a mythical "quiet period" that never comes.
- **Schedule larger items** as real projects, with goals and timelines, when they justify it.

## 5. Avoid the big-bang rewrite

"Let's rewrite it from scratch" is tempting and usually goes badly: it takes longer than expected, replicates old bugs, and delivers no value for a long time ([big-bang rewrite](/t/big-bang-rewrite)). Prefer **incremental replacement**: wrap and replace piece by piece ([strangler fig](/t/strangler-fig), [parallel change](/t/parallel-change)), keeping the system working throughout.

## 6. Prevent new debt (the avoidable kind)

- **Tests, reviews and agreed conventions** ([following conventions](/t/following-conventions)).
- **Document decisions** and the compromises you chose ([architecture decision records](/t/architecture-decision-record)).
- **Take on debt deliberately**: when you cut a corner to meet a date, **record it** and plan the follow-up.
- Watch for **"temporary" solutions** that become permanent.

## 7. Communicate and measure

Report debt work and its results: "Reducing build time from 25 to 8 minutes saved about 40 engineer-hours a week." Track trends such as incident rate, cycle time and change failure rate. Debt work that shows results earns more support.

The goal is a codebase where change stays cheap, with **debt chosen consciously** and **paid when the interest justifies it**.
