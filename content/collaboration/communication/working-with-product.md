---
title: "Working with Product Managers"
summary: "Collaborating on what to build and why."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Working with product managers means collaborating on which user problem to solve, what outcome matters, and what constraints shape a useful solution. Product management does not simply hand engineering a complete specification; engineers contribute evidence about feasibility, risk, and possible approaches.

Start by asking who experiences the problem, how they handle it today, and what would change if the feature worked. A request such as “add a filter” may hide a more useful need: “help support find accounts with a failed renewal.” That distinction can lead to a smaller or more effective implementation.

Avoid two extremes: treating every request as a fixed solution, or rejecting it because the first proposal is technically awkward. Explain the options and trade-offs—scope, reliability, security, time, and maintenance—so product can make an informed choice. Record assumptions that need testing rather than turning them into requirements by accident.

Backend, frontend, and data engineers should bring the perspectives their systems expose: API constraints, interaction details, data quality, and measurement limits. Product partners bring customer and business context; neither side has the full picture alone. See [user research](/t/user-research), [functional vs non-functional requirements](/t/functional-vs-non-functional), and [prioritization frameworks](/t/prioritization-frameworks).

Choose the channel and amount of detail for the people who need to act, then make important outcomes findable later. If a conversation changes scope or ownership, record that change rather than relying on memory. Backend developers can explain service impact, frontend developers can clarify interaction concerns, and data engineers can make lineage or measurement implications visible.

After trying it, ask whether people had enough context to act and revise the agreement if it created extra coordination or left someone out.
