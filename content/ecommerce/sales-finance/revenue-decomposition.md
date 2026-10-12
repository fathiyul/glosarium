---
title: "Revenue Decomposition"
summary: "Splitting revenue into traffic × conversion × AOV so you know what actually moved."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["revenue tree", "driver tree", "metric tree"]
prereqs: ["aov"]
related: ["aov", "conversion-rate", "repeat-purchase-rate", "gmv", "net-revenue-retention"]
---

Revenue decomposition turns one number into a product of drivers you can act on:

```text
Revenue = Sessions × Conversion Rate × AOV
```

For a store, this is the daily workhorse. Revenue fell 18% month-on-month? The decomposition says *where*: sessions flat, conversion down, AOV down — that is a checkout or pricing story, not a traffic story. Sessions up 40% while conversion cratered? You bought the wrong traffic.

The discipline is multiplying the factors back together. Last month: 100,000 sessions × 2.0% × Rp 120,000 = Rp 240,000,000. This month: 100,000 × 1.6% × Rp 118,000 = Rp 188,800,000. The −21% is mostly a conversion problem — 0.4 points of [CR](/t/conversion-rate) — and no amount of new landing pages fixes a checkout bug.

Two classic traps. First, **the factors are not independent**: heavy discounting raises sessions and conversion while crushing AOV and margin, so the tree shows a wash that looks like growth on two of three lines. Read it with [contribution margin](/t/contribution-margin), never alone. Second, this tree covers first orders well and repeat business poorly — returning customers don't "convert" out of marketing-touch sessions the way cold visitors do, so add the repeat branch (share of revenue from returning buyers, [repeat-purchase-rate](/t/repeat-purchase-rate)) or you will keep under-explaining your best months.

As a growth-stage founder, the tree doubles as your board-slide spine: every initiative should name which factor it moves and by how much, which makes claims falsifiable instead of decorative. As an analyst, keep the denominators stable week to week — swapping visitors/sessions/orders as the "traffic" unit silently rescales the whole tree and "discovers" fake trends.
