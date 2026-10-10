---
title: "Definition of Ready"
summary: "What a ticket needs before work on it starts."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

A Definition of Ready is a team's shared checklist for deciding whether a work item has enough context to start. It may cover the problem, expected outcome, acceptance conditions, dependencies, and unanswered questions. It is a conversation aid, not a guarantee that implementation will be predictable.

A vague ticket such as “improve search” may not be ready if nobody knows which users struggle or how success will be judged. The team can clarify the problem, identify a first slice, or run a [spike](/t/spike) before committing to implementation. You do not need every design detail settled: some questions are best answered while building.

A strict checklist can become a gate that delays learning or shifts responsibility onto whoever wrote the ticket. Keep the bar proportional to risk and uncertainty. For a small, reversible change, a short statement and an example may be enough; a cross-team migration may need explicit owners and rollout constraints.

Revisit the checklist when it creates busywork or misses recurring surprises. The point is shared understanding between product and engineering, not perfect tickets. Pair it with a clear [definition of done](/t/definition-of-done) so “ready to start” and “complete” do not get confused.

Check the workflow with a recent piece of work rather than relying on an abstract rule. If the practice adds a queue or hides blocked work, adjust it; if it helps the team finish and learn, keep it. Backend developers can flag service constraints, frontend developers can check user-facing behavior, and data engineers can surface pipeline or data-quality dependencies.

After trying it, review several completed items and adjust the practice if it created a queue, hid a blocker, or failed to produce a useful outcome.
