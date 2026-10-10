---
title: "Build vs Buy for Data Tools"
summary: "Choosing between managed services, open source and building in-house."
levels: { data-engineer: staff }
aliases: ["build or buy data tools", "build vs buy data stack", "make vs buy data tools", "buy vs build data"]
prereqs: ["build-vs-buy", "data-platform-team"]
related: ["modern-data-stack", "vendor-lock-in", "technical-debt", "data-platform-team", "self-serve-data-platform", "orchestrator-choice"]
---

Build vs buy for data tools is the decision to adopt a managed service or open-source project, or to write your own component. It comes up constantly in data platforms: ingestion, orchestration, transformation, cataloging, quality checks. The default answer for most teams is buy, because data infrastructure is rarely what the company sells.

The classic mistake is building a bespoke tool because "it's just a wrapper" or "we can do it in a week". The wrapper grows features, one person owns it, and when they leave it becomes unmaintained infrastructure that nobody can replace. The opposite mistake is buying a different product for every need, so you accumulate overlapping tools, integration work and [vendor lock-in](/t/vendor-lock-in).

## A useful frame

Ask whether the tool is **core to the business**. If the company sells data or a data platform is the product, building may be justified. For everyone else, **undifferentiated plumbing** is a candidate to buy.

Then compare the real costs, not just the licence:

- Total cost of ownership. Licence or cloud spend, plus the people to run, upgrade, patch and secure it. Self-hosting open source is cheaper on licence and often more expensive in staff time.
- Time to value. A managed service may be working this week; a build may take a quarter before it does anything useful.
- Lock-in and portability. Proprietary formats and APIs make switching costly. Open formats and standard interfaces keep options open.
- Fit. A tool that nearly fits still needs glue and workarounds; count that work.
- Maturity and community. For open source, look at release cadence, docs and who answers questions. For managed services, look at the roadmap and support.
- Team capacity. A small team cannot maintain many bespoke systems, however clever they are ([technical debt](/t/technical-debt)).

## The middle paths

The choice is not binary. Common compromises: use managed [orchestration](/t/pipeline-orchestration) but keep transformation in your own SQL and code; adopt the [modern data stack](/t/modern-data-stack) so components are swappable; build only the thin layer that is genuinely specific to you. Open source is not automatically "buy": you still choose to run the operations unless you pay someone to host it.

Write the decision down, with the costs and the reversal plan, so it can be revisited when the team, scale or market changes. Compare this with the general [build vs buy](/t/build-vs-buy) reasoning.
