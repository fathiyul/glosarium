---
title: "Functional vs Non-Functional Requirements"
summary: "What it does vs how well it does it."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Functional requirements describe what a system should do; non-functional requirements describe qualities or constraints on how it does it. A functional requirement might let a user export a report. Related non-functional requirements might specify access control, acceptable response behavior, accessibility, or recovery expectations.

Teams often write the visible behavior and leave qualities implicit. That can produce a feature that technically works but is too slow for its users, exposes data, or cannot be operated safely. Make important qualities testable where possible: name the scenario, boundary, and evidence rather than using vague words such as “fast” or “secure.”

Not every quality needs a numeric target at the start. If measurement is uncertain, state the assumption and run a test or spike. Avoid a long checklist disconnected from the feature; prioritize requirements that change the design or acceptance decision.

Backend, frontend, and data engineers should contribute requirements from their layer: service behavior, interaction and accessibility, and correctness, freshness, or lineage. Product partners help decide which trade-offs matter to users. Requirements can conflict, such as lower latency versus lower cost, so make the choice explicit. See [working with product](/t/working-with-product) and [security review](/t/security-review).

Connect the discussion to a user or business decision, and make assumptions that could change the solution explicit. Revisit the choice when new evidence arrives instead of preserving a plan only because work has started. Backend developers can surface reliability and integration costs, frontend developers can test usability assumptions, and data engineers can check whether the evidence is trustworthy.

Revisit the decision when user evidence or operating costs change, and keep the assumptions visible to anyone using the result.
