---
title: "Product Page Conversion Rate"
summary: "Share of product-page viewers who buy that item — the listing judged per visit."
levels: { data-analyst: junior }
aliases: ["product CR", "PDP conversion", "detail-page conversion"]
prereqs: ["conversion-rate"]
related: ["view-to-cart-rate", "conversion-rate", "rpv", "return-rate"]
---

Product (detail) page conversion rate = orders containing the SKU ÷ product-page views, over a window. Store-wide [conversion rate](/t/conversion-rate) tells you the *machine*'s health; product CR tells you whether *this listing* turns attention into money — the one metric that ranks SKUs by selling efficiency rather than traffic luck.

```text
PDP-A: 12,000 views · 180 bought → 1.5%
PDP-B:  1,800 views ·  54 bought → 3.0%
traffic bought A's spot; B converts twice as well for half the attention
```

The ranking trick the table shows: **multiply, don't sort.** True priority is CR × margin × views-lost-to-constraint, and "fix B's traffic" (search relevance, ad coverage) and "fix A's listing" (photos, size charts, reviews) are different owners with different payoffs. High-CR/low-traffic SKUs are hidden gems; high-traffic/low-CR listings are leaks worth a price check ([price index](/t/price-index)) before a redesign.

What moves product CR, in evidence order: effective price after vouchers, reviews (count more than rating), image quality and the size/spec table, delivery date shown, and for COD markets the trust signals (returns policy visible). Each is testable with [A/B methods](/t/ab-testing) *within* a listing — but the denominator trap is real: views that bounce in one second inflate the impression base and depress CR for every cause of bad traffic, so pair with [view-to-cart rate](/t/view-to-cart-rate) to separate "wrong audience" (won't even look properly) from "right audience, wrong page".

Analysts: normalize by traffic source — organic-search product visits convert several times higher than ad-click visitors for the *same* page; blending them makes channel-mix shifts look like product wins and losses. And low-volume SKUs: a 0.8% CR on 400 views is a rumor.

When product CR is the wrong judge: new listings in the learning window (no reviews yet — the number is structurally low, not bad), and bundles where the child SKU's credit is an attribution choice.
