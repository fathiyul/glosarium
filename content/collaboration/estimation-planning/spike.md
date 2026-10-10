---
title: "Spike"
summary: "A time-boxed investigation to reduce uncertainty."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

A spike is a time-boxed investigation used to answer a specific question or reduce uncertainty before committing to a larger piece of work. It may involve a small prototype, reading documentation, testing a vendor integration, or tracing an existing system.

A useful spike begins with a question and ends with an output: a recommendation, evidence, risks, or a follow-up task. For example, “Can the event source provide a stable change cursor?” is a better goal than “Explore ingestion.” Decide how much time to spend and what decision will be made from the result.

A spike is not a hidden implementation phase. If the team builds production-ready code during the investigation, it may create unreviewed work with unclear ownership. A prototype should be labeled and discarded or hardened deliberately. If the question remains unanswered at the time limit, document why and choose whether to extend, reduce scope, or accept the uncertainty.

Backend, frontend, and data engineers should bring back findings that change estimates or reveal dependencies, not just code. Share results with people who will own the follow-up. See [estimate buffers](/t/estimate-buffers), [cone of uncertainty](/t/cone-of-uncertainty), and [iterative delivery](/t/iterative-delivery).

Treat the plan as a decision aid, not a promise detached from its assumptions. Name who can change scope, what evidence would prompt a replan, and which risks need a separate owner. Backend developers can identify system dependencies, frontend developers can clarify user-facing acceptance, and data engineers can expose source, quality, and backfill uncertainty.

Update the assumptions when new evidence arrives, and tell affected partners which consequence changes rather than only changing a date.
