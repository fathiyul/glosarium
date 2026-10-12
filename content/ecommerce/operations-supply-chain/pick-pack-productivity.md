---
title: "Pick & Pack Productivity"
summary: "Orders (or lines) per labor-hour in the warehouse — the cost-per-parcel number that's actually controllable."
levels: { data-analyst: mid-level }
aliases: ["picking productivity", "lines per hour", "pack rate"]
prereqs: []
related: ["order-processing-time", "fill-rate", "abc-xyz-analysis", "otd-rate"]
---

Pick & pack productivity = order lines processed per labor-hour (or per shift), per function: picking and packing are different floors with different levers, and blending them into "orders/hour" hides which one broke.

```text
baseline: 60 lines/picker-hr
zone-skewed catalog (A items near pack stations): 85
single-line orders batched (pick 40 at once):     120
campaign week (new temp staff):                   38
```

The layout truth first: **line distance is the cost.** Most picking time is walking; slotting the [A-class](/t/abc-xyz-analysis) fast movers near pack stations and grouping co-purchased items (from [market-basket](/t/market-basket-analysis) affinity) into "kits that pick together" moves the number without a single headcount change. Batching (pick 50 orders' lines in one sweep, sort after) suits many-small-line catalogs — the typical marketplace basket — and dies on single-bulky-line order profiles.

Why analysts bother: this number is [cost per parcel](/t/order-processing-time)'s controllable half and the scaling assumption behind every "just hire more" plan — a 20% productivity shift is worth a headcount decision, and a campaign-week 40% drop is usually *onboarding drag* (temp staff learn the warehouse like they learn a job: not instantly), not a collapse — model ramp curves before overtime decisions.

The measurement hygiene that keeps it honest: labor-hours from actual attendance (not shift scheduling), lines-not-parcel basis (an 8-line order at "1 order/hour productivity" would look fine at 8× reality), and exclusion of value-added work (kitting bundles, re-labelling returns — [restocking](/t/restock-rate) steals picker hours and reports as a mysterious slowdown).

When not to manage by it: ultra-small teams (the owner *is* the process — measure promises kept instead), and highly variable single-item fulfillment (sofas, custom prints), where per-line rates compare nothing and on-time vs promised date is the operating truth.
