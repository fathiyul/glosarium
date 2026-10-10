---
title: "Vertical Slice"
summary: "A feature built through every layer, end to end."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

A vertical slice is a small piece of a feature that works through the relevant layers, from the user or caller to the data or service behavior and back. It provides an end-to-end outcome instead of completing one technical layer in isolation.

For a new alerting feature, a slice might detect one condition, deliver one notification, and let one user acknowledge it. Later slices can add alert types, routing, and configuration. This exposes integration risks early: an API shape, permission rule, or data-quality assumption can be tested before many layers depend on it.

A slice is not necessarily a prototype or a shortcut around quality. It should meet the team's security, correctness, and operability expectations for its intended release. Some enabling work does not directly show up in the user interface; keep it tied to a clear first outcome rather than building a broad platform in advance.

Backend, frontend, and data engineers should agree what “usable” means across their interfaces and test the path as a whole. Slices can be harder to divide when teams own isolated layers, so use them to reveal dependencies and coordinate work rather than to demand artificial parallelism. See [iterative delivery](/t/iterative-delivery) and [MVP](/t/mvp).

Check the workflow with a recent piece of work rather than relying on an abstract rule. If the practice adds a queue or hides blocked work, adjust it; if it helps the team finish and learn, keep it. Backend developers can flag service constraints, frontend developers can check user-facing behavior, and data engineers can surface pipeline or data-quality dependencies.

After trying it, review several completed items and adjust the practice if it created a queue, hid a blocker, or failed to produce a useful outcome.
