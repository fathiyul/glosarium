---
title: "Stock-Out Rate"
summary: "How often your catalog is unavailable — and the lost demand nobody sees in revenue."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["OOS rate", "out of stock", "availability"]
prereqs: []
related: ["fill-rate", "reorder-point", "weeks-of-cover", "product-conversion-rate"]
---

Stock-out rate measures unavailability — two standard shapes: **SKU-based** (fraction of catalog out of stock at a moment, or of SKU-days OOS over a window) and **demand-based** (share of wanted units you couldn't supply). The first is an operations dashboard; the second is the *money* number, and teams that track only the first are surprised by both.

```text
1,000 SKU-days OOS / 30,000 SKU-days = 3.3% shelf OOS
but: 78% of those days were A-class SKUs during a campaign
     → demand-weighted OOS: 11% — a different conversation
```

Why it outranks most ops metrics: an out-of-stock page doesn't report zero revenue — the traffic [still costs money and leaves anyway](/t/product-conversion-rate), the ad click was paid for, and the competitor listing is now one tap away. Lost demand is invisible in every revenue report because it never appears there; the estimation habit — OOS days × trailing daily velocity × price, held conservatively and *labeled as estimate* — is how the cost of understocking finally shows up in meetings next to the cost of holding it ([weeks of cover](/t/weeks-of-cover)).

The measurement decisions analysts get burned by: OOS status at the *listing* level vs at the buyable level (a page still up showing "stok habis" is an OOS event you may be paying ads to advertise); multi-warehouse (OOS where the customer is, not where the unit is); and bundle availability (a kit is OOS the moment any component is — see [component-level](/t/reorder-point) reorder logic).

Where OOS data earns the most: it is the *demand* record nobody thinks to use — days-out-of-stock reveal velocity you never measured because you couldn't sell it, and the lost-sales estimate is the evidence for reorder-point changes and for telling which [assortment gaps](/t/assortment-gap) are actually "gaps by stockout".

When low OOS is *bad* news: hitting 0% OOS on long-tail Z items means the buffer (and tied cash) is oversized — the target is never zero; it's the margin-calibrated service level the [safety-stock](/t/safety-stock) math was built around.
