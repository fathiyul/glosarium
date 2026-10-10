---
title: "Browserslist"
summary: "The config declaring which browsers your build supports."
levels: { frontend: mid-level }
aliases: ["browserslist", "browser targets", "supported browsers"]
prereqs: ["webpack", "babel-swc"]
related: ["babel-swc", "feature-detection", "progressive-enhancement"]
---

**Browserslist** declares supported browsers as queries (`> 0.5%, last 2 versions, not dead`) in one config shared by transpilers, autoprefixers, linters and bundlers. Every tool reads the same target definition — no per-tool browser matrices drifting apart.

```text
# .browserslistrc
last 2 years, > 0.5%, not dead, not op_mini all
```

Targets drive everything downstream: what syntax to transpile, which prefixes to emit, which polyfills to include, what baseline to assume. Modern baselines (the "Baseline" concept converging across tools) shrink this surface yearly — but the query remains the single source of truth.

The classic mistakes:

- No config (defaults rule). Without explicit queries, tools use defaults that may include dead browsers — bloating output for nobody. Declare intentionally.
- Stale queries. A 2019-vintage query still supporting IE taxes every bundle. Review targets yearly against analytics.
- Usage thresholds without analytics. Global `> 0.5%` includes browsers your users never touch (and excludes ones they do). Ground thresholds in your traffic.
- Per-tool overrides. Browserslist in package.json plus bespoke babel targets plus autoprefixer exceptions diverge silently. One config, all tools.
- Forgetting non-Google analytics. Default usage data skews Western-desktop; significant mobile/regional browsers vanish. Include regional data where audiences demand.
- Baseline confusion. "Supports X" means different things per tool (syntax vs API vs CSS). Browserslist queries syntax-era; APIs still need feature detection and polyfills.
- Never testing the floor. The oldest supported browser needs actual verification (or explicit exclusion). CI on the floor build catches what queries promise.

**The practice:** one explicit query, grounded in your users, reviewed yearly, consumed by every tool. Support statements belong in config, not folklore.
