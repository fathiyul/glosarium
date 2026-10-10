---
title: "MVP"
summary: "The smallest product that tests whether an idea works."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , tech-entrepreneur: idea }
core: [tech-entrepreneur]
---

A minimum viable product (MVP) is the smallest product or product slice that can test a specific assumption with real users or a realistic market signal. “Minimum” means less scope than a full product, not low reliability, poor usability, or missing essential safety and privacy controls.

Start by stating the uncertainty: for example, “Will operations teams use a daily exception report to prioritize investigations?” A first version might serve one team and one data source, then collect feedback before adding integrations. A mockup or concierge workflow may be enough to test some assumptions; a production system is not always required.

An MVP is not a permanent excuse to ship a rough feature. Set a learning goal, decide what evidence would change the plan, and agree how the experiment ends. If the product handles money, health, identity, or sensitive data, the smallest safe version may still require substantial engineering work.

Backend, frontend, and data engineers can help find the thinnest end-to-end slice and ensure its measurement is trustworthy. Avoid counting activity as validation: launching is not proof that a need exists. See [iterative delivery](/t/iterative-delivery), [user research](/t/user-research), and [feature adoption](/t/feature-adoption).

Check the workflow with a recent piece of work rather than relying on an abstract rule. If the practice adds a queue or hides blocked work, adjust it; if it helps the team finish and learn, keep it. Backend developers can flag service constraints, frontend developers can check user-facing behavior, and data engineers can surface pipeline or data-quality dependencies.

After trying it, review several completed items and adjust the practice if it created a queue, hid a blocker, or failed to produce a useful outcome.
