---
title: "Weeks of Cover"
summary: "How many weeks current stock lasts at current demand — the buying calendar's favorite number."
levels: { data-analyst: junior }
aliases: ["weeks of supply", "WOS", "cover"]
prereqs: []
related: ["days-of-inventory", "purchase-frequency", "stock-out-rate", "dead-stock"]
---

Weeks of cover = current sellable stock ÷ average weekly demand. It is [days of inventory](/t/days-of-inventory) wearing a calendar: buying teams work in weekly order cycles, so "12 weeks of cover" is an actionable sentence where "84 days" is not.

```text
cover vs supplier reality:
  lead time 6 weeks · cover 2 weeks   → emergency corridor (or stockout)
  lead time 6 weeks · cover 8 weeks   → healthy
  lead time 6 weeks · cover 26 weeks  → cash on a shelf + markdown later
```

The number's whole use is the *comparison against lead time*: cover below lead time plus buffer is a stockout appointment, cover far above it is [dead-stock](/t/dead-stock) in progress — the healthy band depends entirely on how long replenishment takes, which is why the same cover figure can be excellent for a local supplier and a crisis for a shipped-from-abroad one.

The denominator decides the truth: "average weekly demand" over which window? A trailing-4-week average after [double-date](/t/promo-uplift) spike flatters cover for weeks; a full-year average for seasonal goods computes cover against demand that isn't coming for months. Fast-fashion teams use in-season run rates; replenishment staples use trailing averages; seasonal items get last-year-same-week, explicitly labeled.

Two analyst notes: compute cover per location — blended warehouse cover hides the stockout in Bali behind the surplus in Jakarta; and net cover from [reserved stock](/t/fill-rate): units already claimed by open orders and bundles are not cover, they are promises.

When cover misleads: very slow movers (a monthly-sale SKU's "400 weeks cover" is a data artifact of dividing by nearly-zero — use [ABC/XYZ](/t/abc-xyz-analysis) classes first, cover second).
