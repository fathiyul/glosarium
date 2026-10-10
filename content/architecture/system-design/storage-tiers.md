---
title: "Hot, Warm and Cold Storage"
summary: "Tiering data by how often it's accessed."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["hot warm cold storage", "storage tiers", "data temperature"]
prereqs: ["object-storage", "database"]
related: ["object-storage", "data-retention-tiers", "time-series-database"]
---
**Hot, warm and cold storage** tiers data by access frequency: hot (SSD/databases — milliseconds, expensive, for live queries), warm (cheaper object storage — seconds, for occasional reads), cold (archive — minutes-to-hours retrieval, cheapest, for compliance and rare restores). Data cools with age, and each tier costs an order of magnitude less than the one above.

```text
hot:   last 30 days, SSD/DB      (dashboards, live queries)
warm:  30–365 days, object store (ad-hoc analysis)
cold:  1+ years, archive         (audit, legal hold)
```

Tiering is lifecycle policy made physical: TTLs and access patterns move data down automatically, queries target the right tier (or span tiers transparently), and retrieval SLAs match the tier (expeditions from archive take hours — by design).

The classic mistakes:

- Everything hot. Storing years of logs on SSD-backed databases multiplies cost for data nobody queries. Age data down aggressively.
- No lifecycle automation. Manual tiering never happens; policy-driven movement (age, access, legal hold) does. Automate from the start.
- Retrieval surprises. Pulling terabytes from archive takes hours and costs per-GB fees — during an incident, that's a crisis. Know each tier's retrieval SLA and price before needing it.
- Deleting what law keeps. Cold storage often exists for retention obligations; premature deletion violates them. Align tiers with legal holds first.
- Cross-tier queries unplanned. Analytics spanning hot and cold need engines that federate (or scheduled warm-ups); assuming one query sees all tiers equally disappoints.
- Rehydration without a path. Data needed urgently from cold needs a tested restore procedure — untested restores fail at 3am.

**How to tier:** classify by access age, automate movement, match query engines to tiers, and test restores. Storage cost is a lifecycle problem — hot performance, cold price, automation between.
