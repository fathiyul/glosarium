---
title: "Rule of 40"
summary: "A rule of thumb that growth rate plus profit margin should reach about 40% for a healthy SaaS company."
levels: { tech-entrepreneur: scale }
core: [tech-entrepreneur]
---

The rule of 40 is a health heuristic for scaling software companies: annual growth rate plus a profitability margin should together reach about 40%. Grow 50% while burning 15% of revenue → 35 — under the bar. Grow 25% at 20% free-cash-flow margin → 45 — healthy. It exists because it makes the only tradeoff that matters at scale explicit: you may buy growth with profit, or bank profit while growth slows, but a sustained total near zero in both directions means neither is working.

The arithmetic varies by house: some use ARR growth + EBITDA margin, others growth + FCF margin or even growth + operating cash flow. Fine — just pick one and track it consistently ([mrr-arr](/t/mrr-arr) is the growth denominator; don't mix annualized single deals into it).

```text
growth%  +  margin%  ≥ 40   (conventional bar for scale-stage SaaS)
  60%    +    (25%)   = 35  → buying growth, watch the burn
  20%    +     30%    = 50  → mature and profitable, maybe underinvesting
```

Where it shines is late-stage judgment: at 2x [burn multiple](/t/burn-multiple) and negative 20 total, conversations about hiring slow down for good reasons. It also arbitrates investor expectations — a 45 score earns patience; a 15 invites restructuring.

Where it misleads: early-stage noise (one $40K deal annualized is "infinite growth"), services-heavy models (40 assumes software economics), and gaming the definition — companies "pass" with ARR growth plus a margin measured on a favorable subset. The bar came from what profitable software companies historically achieved, which is exactly why fast-growing companies below it are not doomed — you trade toward it across quarters, deliberately, or explain why not.

When not to use it: pre-scale (it's meaningless), or during a planned investment year where the number sinks by design — but write down the recovery path, because that's the difference between breaking the rule and ignoring it.
