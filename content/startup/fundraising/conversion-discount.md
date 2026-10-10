---
title: "Conversion Discount"
summary: "A discount on the next round's share price for early SAFE or note investors."
levels: { tech-entrepreneur: mvp }
aliases: ["conversion discount", "discount rate", "20% discount"]
prereqs: ["safe-note", "valuation-cap"]
related: ["safe-note", "valuation-cap", "SAFE-conversion", "convertible-note"]
---

The **conversion discount** lets early SAFE/note investors convert at a reduced share price — typically around 20% off the priced round — as reward for investing before traction existed. It pairs with the [valuation cap](/t/valuation-cap): at conversion, whichever gives the investor more shares (discount price vs cap price) applies.

```text
Series A at $1.00/share, 20% discount → SAFE converts at $0.80/share
same round with $6M cap binding → converts at cap-implied price instead (whichever is lower)
```

Discounts matter most when rounds price *below* the cap (early, modest rounds) — there the cap never binds and the discount is the entire reward. In hot rounds that blow past the cap, the cap does the work and the discount is decorative. Structure both; expect either to bind.

The classic mistakes:

- Discount-only SAFEs at high implied prices. A 20% discount on a round that prices 5× up rewards early risk with little. Pair every discount with a cap.
- Discount-rate shopping. Bidding discounts up to win investors (30%, 40%...) mortgages the priced round before it exists. Standardize; compete on vision and traction, not on giving away more.
- Forgetting discounts stack with caps in modeling. Founders modeling conversion with one mechanism model fiction. Run both, take the investor-favorable path — that is the contract (see [conversion math](/t/SAFE-conversion)).
- Non-standard discount mechanics. Discounts applying to different price definitions, with carve-outs and MFNs, turn conversion into litigation prep. Standard forms, standard terms.

**Set both, model both, standardize both.** The discount protects early money in modest outcomes; the cap protects it in great ones. Together they price risk across futures.
