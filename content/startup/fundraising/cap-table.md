---
title: "Cap Table"
summary: "The record of who owns what share of the company."
levels: { tech-entrepreneur: mvp }
aliases: ["cap table", "capitalization table", "cap table management"]
prereqs: ["dilution", "pre-money-post-money"]
related: ["dilution", "SAFE-conversion", "option-pool", "founder-salary"]
core: [tech-entrepreneur]
---

The **cap table** records every share, option, SAFE and note: who holds what, at what terms, converting into what. It is the company's ownership source of truth — every fundraise, hire grant, secondary sale and exit pays out according to it. Messy cap tables kill deals; clean ones close them.

```text
columns:  holder · instrument · shares/terms · % fully-diluted
rows:     founders · employees/options · investors (per round) · SAFEs/notes outstanding
```

Maintain it continuously, not per-round: log every grant, SAFE and hire the week it happens, in software built for it (spreadsheets work until the first priced round, then migrate). Before any round, reconcile ruthlessly — discrepancies discovered in diligence read as incompetence at best.

The classic mistakes:

- Spreadsheet chaos. Five versions, conflicting SAFEs, forgotten advisor grants. One maintained source, updated immediately, reviewed quarterly with counsel.
- Dead equity. Departed founders and advisors holding unvested-era grants that should have been reclaimed. Vesting plus prompt buybacks keep the table alive ([vesting](/t/vesting-schedule)).
- Unmodeled conversion. SAFEs and notes listed at face value instead of converted shares. Always show fully-diluted percentages with conversion modeled — that is the only version that matters.
- Surprise option pool. [Pool expansions](/t/option-pool-shuffle) negotiated pre-money come from existing holders (mostly founders). Model pool needs two rounds ahead, not one.
- handshake grants. "We'll sort options later" produces conflicting memories at exactly the moment money arrives. Paper every grant when made, however small.

**Hygiene:** one tool, updated weekly, reconciled quarterly, lawyer-reviewed before rounds. A clean cap table is silent; a messy one speaks loudly at the worst time.
