---
title: "Cell-Based Architecture"
summary: "Splitting a system into isolated copies to limit blast radius."
levels: { backend: staff }
aliases: ["cell-based architecture", "cellular architecture", "cells"]
prereqs: ["deployment-stamps", "bulkhead"]
related: ["deployment-stamps", "bulkhead", "blast-radius"]
---
**Cell-based architecture** partitions everything — infrastructure, data and traffic — into independent **cells**, each serving a slice of users end-to-end with its own resources, deployments and failure domains. A cell failing burns only its slice; cells scale by replication; no shared component can take all cells down together.

```text
cell A: [LB + app + data] serves users 1–100k
cell B: [LB + app + data] serves users 100k–200k (failure here touches only B)
router: assigns users to cells (the minimal shared piece)
```

Cells generalise deployment stamps to full-stack independence: separate data (no shared database), separate control (cell-scoped deploys and config), separate fate (no synchronous cross-cell calls). The router/mapper assigning users to cells is the deliberately-minimal shared surface — itself redundantly simple.

The classic mistakes:

- Shared data between cells. A common database (or synchronous cross-cell reads) reunites fates the cells were built to separate. Cells own their data fully.
- Cell imbalance. Uneven user distribution (or one giant tenant) overloads cells while siblings idle. Balance by load with split/migrate tooling, not just by count.
- Global features unhomed. Search-across-everything, global leaderboards and admin views need explicit cross-cell designs (fan-out reads, separate global tier) — not ad-hoc cell-spanning queries.
- Router as SPOF. The cell mapper failing blinds all routing; harden it disproportionately (static mappings, client caching, anycast simplicity).
- Operational multiplication. N cells multiply deploys, monitors and incidents; without uniform automation, cells become N snowflakes. Automate identically or drown.
- Cross-cell transactions. Workflows spanning cells need saga-style coordination with cell-scoped steps — or better, scope workflows within cells by design.
- Testing single-cell only. Multi-cell behaviours (routing, rebalancing, cell evacuation) need dedicated testing; single-cell tests miss the architecture's actual risks.

**When to adopt:** blast-radius containment worth full-stack duplication — large SaaS, regulated isolation, failure-proof scaling. Cells are bulkheads at civilisational scale: expensive, and exactly as safe as built.
