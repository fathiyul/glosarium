---
title: "Design Document"
summary: "A written proposal of how to build something, reviewed before building it."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-analyst: mid-level }
aliases: ["design document", "technical design document", "tech spec", "technical spec", "engineering design doc", "RFC"]
prereqs: ["technical-writing", "architecture-decision-record"]
related: ["rfc-process", "architecture-decision-record", "one-way-two-way-doors", "architectural-trade-offs", "architecture-review", "technical-writing"]
core: [backend, frontend, data-engineer]
---

A **design doc** is a written proposal for **how you'll build something**, shared with the people who'll be affected **before** you build it. It's a cheap way to find problems: changing a document costs minutes, and changing a system costs weeks.

## Why write one

- **Clarifies your own thinking.** Gaps and contradictions become obvious on paper.
- **Gathers feedback early** from teammates, other teams and people who know the system's history.
- **Builds alignment**: everyone knows the plan, the trade-offs and the reasons.
- **Leaves a record** of the reasoning, which helps new people and future decisions ([architecture decision records](/t/architecture-decision-record)).
- **Surfaces risks, dependencies and unknowns** while they're still cheap to handle.

## A common structure

1. **Context and problem**: what we're solving, for whom, and why now.
2. **Goals and non-goals**: what success looks like, and what's explicitly out of scope. Non-goals prevent scope creep.
3. **Proposed design**: the main approach, with a diagram if it helps: components, data flow, APIs, data model.
4. **Alternatives considered**, with why each was rejected. This is among the most valuable sections.
5. **Trade-offs and risks**: what you're giving up, and what could go wrong ([architectural trade-offs](/t/architectural-trade-offs)).
6. **Rollout and migration plan**: phases, feature flags, backward compatibility, rollback.
7. **Testing and monitoring**: how you'll know it works.
8. **Security, privacy, performance and cost** considerations.
9. **Open questions.**
10. **Timeline or milestones**, if useful.

## Writing a good one

- **Be as short as it can be while answering the reader's questions.** A 2-page doc that's read beats a 20-page one that isn't.
- **State your recommendation clearly**, not a neutral list of options.
- **Use concrete numbers and examples** (expected load, data sizes, request flows).
- **Write for your readers**: some know the area, some don't. Define terms.
- **Be honest about unknowns.**
- **Focus on decisions that are hard to reverse** ([one-way and two-way doors](/t/one-way-two-way-doors)). Don't write a design doc for a small, easily reversed change.

## The review process

- **Share it with the right people** and a deadline for comments. Include those who'll run, use or depend on it.
- **Treat comments as input to a better design**, not criticism. Resolve them in the document.
- **Hold a discussion** for the contentious points ([RFC process](/t/rfc-process), [architecture review](/t/architecture-review)).
- **Update the doc** as decisions change, and when it's decided, mark its status.
- **After building**, note where reality diverged.

A design doc is a thinking tool, not a bureaucratic gate. The goal is to build the right thing, with fewer surprises.
