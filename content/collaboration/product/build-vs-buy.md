---
title: "Build vs Buy"
summary: "Deciding whether to build something or use an existing product."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

Build versus buy is the decision to create a capability in-house or adopt an existing product or service. Compare the options by how well they meet the actual requirement, ongoing operating effort, integration, reliability, security, cost, and the ability to change or leave later.

For example, a team deciding whether to build its own search service should include indexing, relevance tuning, monitoring, backup, and on-call work—not just the first query endpoint. A vendor may shorten setup but introduce contract limits, data handling requirements, and migration costs. Building offers control but creates long-term ownership.

Avoid framing the choice as “engineering time is free” versus “vendor price is expensive.” Estimate total cost over the period that matters, and distinguish a reversible trial from a deeply embedded dependency. Validate the vendor's behavior against a realistic use case and ask what happens during an outage or contract change.

Backend, frontend, and data engineers should surface integration and operational constraints; product and security partners contribute customer and risk requirements. Decide who owns the capability after launch and what conditions would trigger reconsideration. See [build vs buy for identity](/t/build-vs-buy-identity) and [vendor lock-in](/t/vendor-lock-in).

Connect the discussion to a user or business decision, and make assumptions that could change the solution explicit. Revisit the choice when new evidence arrives instead of preserving a plan only because work has started. Backend developers can surface reliability and integration costs, frontend developers can test usability assumptions, and data engineers can check whether the evidence is trustworthy.

Revisit the decision when user evidence or operating costs change, and keep the assumptions visible to anyone using the result.
