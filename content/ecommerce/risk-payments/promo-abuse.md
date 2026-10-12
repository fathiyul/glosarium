---
title: "Promo Abuse"
summary: "Vouchers and flash deals harvested by multi-accounters and resale rings — the discount budget's silent leak."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["coupon abuse", "voucher farming", "promo fraud"]
prereqs: []
related: ["voucher-redemption-rate", "fraud-rate", "fake-cod-order", "discount-burn"]
---

Promo abuse is exploiting promotional mechanics for value not intended per customer: one human with ten new accounts claiming "new user" vouchers, resale rings sweeping flash-sale inventory at 70% off, referral programs farming self-invites, stacked vouchers that no pricing review ever priced together. It is the discount budget's [leak](/t/discount-burn) that attribution dashboards never show because every redeemed code "worked exactly as configured."

The detection pattern language: **identity clusters** (same device fingerprint, address, payment instrument, or recipient phone across "new" accounts), **cadence anomalies** (accounts that exist only inside campaign windows), **threshold gaming** (baskets assembled to the cent of a min-spend floor, then cancelled or COD-refused), and **resale velocity** (the same SKU, dozens of accounts, one delivery address — the wholesale customer you're paying to subsidize).

```text
new-user voucher cohort vs regulars, 90d:
  claim rate     4×      COD rejection  31% vs 6%
  repeat at 90d  2%      margin         −Rp 4M vs +Rp 18M
```

That table is the business case every promo-abuse report should lead with: abuse is not a moral statistic, it is the *negative-CLV cohort* at the exact moment spend is concentrated — and the [acquisition quality](/t/acquisition-quality) report is its twin.

Controls, in increasing power and increasing friction: eligibility rules (one-use per identity-signal, not per account), campaign-level stacking limits (which vouchers may combine — decided *before* launch by someone simulating the worst basket), velocity caps per device/address/phone, and pre-positioning (flash-sale inventory reserved by account age + purchase history, killing the bot's economics at the buy box rather than after).

The analyst's measurement job: estimate leakage honestly — abuse share is a *judgment on cluster evidence*, so report ranges and show both sides: promo dollars blocked AND legitimate demand you refused (false-positive cost). Teams that optimize only to zero abuse learn the price of blocking their best multi-account household — resellers with receipts who pay net. The [voucher redemption rate](/t/voucher-redemption-rate) per cluster is the denominator that keeps the number defensible.
