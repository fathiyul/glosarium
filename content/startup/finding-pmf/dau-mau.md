---
title: "DAU/MAU"
summary: "Daily and monthly active users, and their ratio as a measure of how habitual a product is."
levels: { tech-entrepreneur: pmf }
aliases: ["DAU MAU", "DAU/MAU ratio", "stickiness ratio"]
prereqs: ["retention-curve", "activation"]
related: ["retention-curve", "cohort-analysis", "vanity-metrics", "power-users"]
---

**DAU** (daily active users) and **MAU** (monthly actives) measure reach; their ratio measures habit. A 0.5 ratio means the average monthly user shows up half the days — daily ritual territory. A 0.05 ratio means monthly-ish utility — fine for tax software, fatal for a social app. The ratio's meaning depends entirely on the product's natural frequency.

```text
DAU/MAU ≈ 0.5+:  daily habit (messaging, feeds) — expected here
DAU/MAU ≈ 0.1:   weekly-ish tool — healthy for its category, alarming for a feed
```

Benchmark against your category's frequency, never against other categories'. And define "active" strictly — a login ping is not usage. The ratio built on loose activity definitions flatters while retention quietly dies underneath.

The classic mistakes:

- Chasing the ratio directly. Notification spam and streak mechanics inflate DAU while degrading the experience that earned users. Grow the ratio through value frequency, not prompts.
- Blended ratios. Power users at 0.9 and a dead long tail at 0.02 average to a meaningless middle. Cut by cohort and segment ([cohort analysis](/t/cohort-analysis)) — the distribution is the insight.
- Wrong-frequency expectations. Demanding social-app ratios from a quarterly-tax tool (or vice versa). Set targets from category behavior and your own cohorts' trends.
- Ignoring denominator games. Reclassifying dormant accounts out of MAU "cleans" the ratio cosmetically. Fix definitions once, keep them stable, and let trends speak.
- Ratio without retention context. High DAU/MAU with collapsing absolute numbers is a shrinking cult, not health. Pair the ratio with cohort [retention curves](/t/retention-curve) always.

**Use it as:** a habit gauge trended by cohort, judged against category frequency. See [power users](/t/power-users) for who sits at the ratio's top end and what they teach.
