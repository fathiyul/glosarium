---
title: "GMROI"
summary: "Gross margin return on inventory investment — which shelf space actually pays rent."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["gross margin return on inventory", "GMROI"]
prereqs: ["inventory-turnover"]
related: ["inventory-turnover", "margin-per-sku", "days-of-inventory", "long-tail-contribution"]
---

GMROI = gross margin ÷ average inventory (at cost) — the margin earned per rupiah of stocking money. [Inventory turnover](/t/inventory-turnover) measures how fast the shelf cycles; GMROI asks whether the cycle was worth the cash parked in it.

```text
SKU             margin/yr   avg stock   turns   GMROI
fast charger       40M        100M       12×     0.40
premium case       45M         25M        4×     1.80
sofa               12M         40M       0.6×    0.30
the charger wins turns and loses the money ranking
```

That flip is the whole argument: thin-margin velocity can out-*move* capital and out-*lose* it. GMROI is the buying-budget allocator — put stocking money where margin-per-inventory-rupiah is highest, not where volume stories are loudest. It also arbitrates promo buy-ins (a supplier deal that doubles volume at half margin usually halves GMROI — negotiate for stocking efficiency, not revenue optics) and the [long-tail](/t/long-tail-contribution) keep/kill debate (a slow, fat-margin line can GMROI its way onto the keep list).

Build hygiene: compute at category or SKU level with *matched* windows (trailing-year smooths season; quarterly will scream "worst ever" every February — pre-holiday builds land in the denominator before Eid's margin hits the numerator), inventory at cost (never retail value), and returns *netted* — gross-margin GMROI on a 25%-return category is self-deception.

When not to chase it: consignment/dropship (denominator ≈ zero — the ratio means nothing; measure availability instead), and deliberate land-grab phases where share now, GMROI later is the stated strategy — then write that sentence into the plan so the metric measures the bet, not the betrayal.
