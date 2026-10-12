---
title: "Days of Inventory (DOI)"
summary: "How many days your current stock lasts at current sell-through — the same cash as inventory-turnover, made urgent."
levels: { data-analyst: junior, tech-entrepreneur: growth }
aliases: ["DOI", "DSI", "days inventory outstanding", "weeks of stock"]
prereqs: []
related: ["inventory-turnover", "cash-flow", "weeks-of-cover", "dead-stock"]
---

Days of inventory = current inventory value ÷ daily COGS run-rate. "We have 78 days of stock" is the *forward-looking* twin of [inventory turnover](/t/inventory-turnover)'s backward-looking ratio — same capital, read as time until you eat it or restock it.

```text
inventory Rp 2,000M · daily COGS Rp 11M → DOI ≈ 180 days
read it as: six months of cash is currently sitting on shelves
```

Founders feel DOI in the bank balance before they feel it on the shelf: at 180 days your working capital is committed, your assortment is frozen (what you *could* buy with that money is the real cost), and any demand shift lands on you with a warehouse of yesterday's answer ([dead stock](/t/dead-stock) is DOI's terminal state). At 15 days DOI in a fast category you are running hot — one supplier slip and [stockouts](/t/stock-out-rate) cascade into your delivery promise.

The reading rules analysts set up:

- **Demand denominator matters.** DOI on trailing-7-day velocity sees the campaign peak and calls the pre-campaign shelf "bloated"; on quarterly average it calls a post-hangover warehouse "healthy." Compute DOI both ways during event seasons and *label which one the meeting is about*.
- **Unit consistency**: value DOI (Rp on shelf ÷ daily Rp of COGS) vs quantity DOI (units ÷ daily units) — they disagree when the mix shifts toward cheaper goods; value answers "how much cash," quantity answers "how long will it physically last."
- **Category DOI beats blended DOI.** A blended 60 days can hide an 8-day hero and a 2-year tail; [ABC/XYZ](/t/abc-xyz-analysis) slicing is the standard readout.

Where DOI misleads structurally: pre-orders and back-to-order flows where "inventory" is in transit and committed (adjust with available-to-promise), consignment stock (not your capital, not your DOI), and seasonal goods *bought* months before selling — a holiday SKU at 300 DOI in July is planning, not pathology; the same number in January is the whole problem.
