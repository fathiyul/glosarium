---
title: "Velocity"
summary: "How much work a team finishes per sprint, and how it gets misused."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
---

Velocity is the amount of work a team says it completed in a sprint, often represented using its own estimation units. Teams sometimes use recent velocity to help forecast how much work they might finish in a future sprint, but the number is specific to that team and estimation practice.

Velocity is not a measure of individual productivity or a target to maximize. If leaders compare teams by story points or demand that a team raise its number, people can inflate estimates, split work differently, or avoid necessary tasks. The resulting number may rise while customer outcomes and delivery reliability stay unchanged.

Use velocity only as a rough planning input alongside work size, interruptions, dependencies, and uncertainty. Do not compare it across teams or treat a forecast as a commitment when scope or conditions change. A team can also forecast in throughput or cycle time if those measures fit its work better.

Backend, frontend, and data work often has different discovery and operational demands, so avoid forcing one unit across unlike work. Re-estimate the plan when actual capacity changes, and communicate uncertainty rather than hiding it behind a precise number. See [cycle time](/t/cycle-time), [estimation](/t/estimation), and [WIP limit](/t/wip-limit).

Check the workflow with a recent piece of work rather than relying on an abstract rule. If the practice adds a queue or hides blocked work, adjust it; if it helps the team finish and learn, keep it. Backend developers can flag service constraints, frontend developers can check user-facing behavior, and data engineers can surface pipeline or data-quality dependencies.

After trying it, review several completed items and adjust the practice if it created a queue, hid a blocker, or failed to produce a useful outcome.
