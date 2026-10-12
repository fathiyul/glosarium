---
title: "Price Elasticity of Demand"
summary: "How much volume moves per percent of price — the number that decides whether a price rise earns or bleeds."
levels: { data-analyst: senior, data-scientist: mid-level }
aliases: ["elasticity", "PED", "price sensitivity"]
prereqs: ["asp"]
related: ["discount-depth", "incremental-revenue", "ab-testing", "price-index"]
---

Price elasticity = %change in quantity ÷ %change in price. Below −1 demand is elastic (a 10% price cut sells 20% more units but *loses* revenue at flat margin — verify: 20% more × 90% price = 1.8× units, revenue 1.98... work the actual case: units +20% at −10% price → revenue ×1.08, margin depends); above −1 (in magnitude) is inelastic — raising price grows revenue despite lost units. The revenue-maximizing price sits where elasticity crosses −1; margin-aware optimum sits slightly higher.

```text
elasticity −2.5 (commodity phone case) → price is the battlefield
elasticity −0.4 (unique spare part buyers need) → price is a lever
the same −15% promo means opposite things in the two rows
```

Why it must be *measured* and not assumed: observational demand curves are confounded — you raised price the month competitors also raised theirs, or your promo landed with extra ad weight. The clean designs: geo/time price tests ([difference-in-differences](/t/difference-in-differences) across matched markets), randomized price [A/B tests](/t/ab-testing) within platform rules, and exploiting natural variance in [price index](/t/price-index) vs competitors as quasi-experiments. Data scientists: elasticity is a *model*, not one number — it differs by category, customer segment, promo context (elasticity at baseline ≠ elasticity during 11.11, when buyers already expect cuts) and even the price *direction* (people react asymmetrically — reference-price effects).

The analyst's field-guide use: with an estimated own-elasticity per category, [discount depth](/t/discount-depth) stops being a debate and becomes arithmetic — which categories fund a campaign, which ones should *never* be discounted, and where the inelastic pocket pays for both. That re-allocation, not the average elasticity, is where the profit hides.

When not to trust it: brand-building periods where today's inelasticity is tomorrow's churn (the customer who "didn't care" about price leaves for a cheaper rival the moment one appears — switch-cost context), heavily promo-polluted windows (every measurement reads elastic because buyers wait for sales — see [promo dependence](/t/promo-dependence)), and categories so new volume data is just launch noise.
