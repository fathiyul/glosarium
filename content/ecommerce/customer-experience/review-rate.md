---
title: "Review Rate & Review Economics"
summary: "Share of orders that produce a review — and why the ratings you show are a biased sample."
levels: { data-analyst: junior }
aliases: ["rating rate", "review coverage", "product reviews"]
prereqs: []
related: ["sentiment-analysis", "product-conversion-rate", "csat", "return-rate"]
---

Review rate = orders (or delivered orders) with a product review ÷ orders. On marketplaces reviews *are* conversion infrastructure — [product pages](/t/product-conversion-rate) convert materially better once review counts cross small thresholds — so the share of listings with *zero* reviews is a revenue gap hiding in plain sight.

```text
catalog coverage, delivered orders last 90d:
  SKUs with ≥1 review:      38%
  hero items (top 20% rev):  92%
  long tail:                 11%  ← silent shelf
```

The analyst's job is knowing *whose* reviews those are. Reviewers are self-selected: the delighted and the furious respond, the satisfied majority doesn't — so a 4.6 average over a 3% review rate mostly measures extremes, and a "4.8" listing with four reviews is not comparable to a 4.5 with eight hundred. Report rating *with* count and with the silent base rate, and distrust any category comparison that ignores one of the three.

Closing the coverage gap has honest levers and one trap. Levers: post-delivery (not post-order — COD refuses can't review what never arrived; deliver-and-paid as the trigger), *photo* request (photo reviews convert disproportionately and arrive unprompted from power users), and platform review prompts you must actually trigger through. The trap: incentivized reviews (discounts, cashback for 5-stars) — they convert ratings into receipts, the platforms detect and penalize them, and the [sentiment](/t/sentiment-analysis) mismatch (5 stars, two-line gibberish) is now a compliance signal, not a marketing asset.

The economics loop: reviews suppress [returns](/t/return-rate) in fit-sensitive categories (a photo from a similar buyer is a size chart that works), and return-reason analysis tells you *which* listings need which reviews ("tidak sesuai deskripsi" clusters are the ones with the most misleading photos).

When review volume stops meaning much: consumables with habitual repeat buyers (the customer who trusts your brand doesn't read the listing) and B2B-style orders where decisions happen off-platform entirely.
