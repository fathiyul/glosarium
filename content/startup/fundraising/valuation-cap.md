---
title: "Valuation Cap"
summary: "The maximum valuation at which a SAFE or note converts into shares."
levels: { tech-entrepreneur: mvp }
aliases: ["valuation cap", "cap", "SAFE cap"]
prereqs: ["safe-note", "pre-money-post-money"]
related: ["safe-note", "conversion-discount", "SAFE-conversion", "dilution"]
---

The **valuation cap** sets the maximum company valuation at which a SAFE or convertible note converts: if the priced round values the company above the cap, early investors convert *as if* the valuation were the cap — rewarding their early risk with more shares per dollar. Below the cap, conversion happens at the round price (usually still with a [discount](/t/conversion-discount)).

```text
SAFE $100k, cap $6M, 20% discount → Series A prices at $12M
cap applies ($6M < $12M × 0.8): converts at $6M → ~1.67% (before dilution)
```

Caps are the actual price negotiation of early rounds, conducted in future-tense: too high and early money gets no reward for its risk; too low and founders give away the company before traction. Set by reference to stage norms and the milestones the money must buy — not by optimism.

The classic mistakes:

- Uncapped SAFEs. No ceiling means conversion at whatever the round prices — early risk rewarded with nothing. Never issue uncapped instruments except to true believers you intend to favor some other way.
- Cap shopping across SAFEs. Different caps per investor create conversion chaos and resentment at pricing. Standardize terms per round-ish period.
- Confusing cap with valuation. A $6M cap is not a $6M valuation — it is a ceiling that may never bind (if the round prices below it). Do not anchor hiring, spending or egos to the cap number.
- Ignoring the discount-cap interaction. Whichever yields more shares applies; model both paths. Founders surprised at conversion time failed to run two multiplications (see [conversion math](/t/SAFE-conversion)).

**Negotiate caps** as the real early-stage valuation conversation: low enough to reward risk, high enough to leave founders owning enough to stay motivated through the dilution ahead.
