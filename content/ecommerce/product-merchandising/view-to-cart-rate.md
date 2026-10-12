---
title: "View-to-Cart Rate"
summary: "Share of product views that add to cart — the listing's desire signal, before checkout decides."
levels: { data-analyst: junior }
aliases: ["ATC rate", "add to cart rate", "VTC"]
prereqs: []
related: ["product-conversion-rate", "cart-abandonment-rate", "funnel-analysis", "attach-rate"]
---

View-to-cart rate = add-to-cart events ÷ product-page views. It isolates the *first* yes: did the page make the visitor want the item? The later stages ([cart abandonment](/t/cart-abandonment-rate), payment failure) are about commitment mechanics; VTC is about desire, and the two stages have different causes and different owners.

```text
VTC high · CR low   → wanting, not buying: price shock at totals,
                      delivery date, payment friction
VTC low  · traffic strong → the page or the promise mismatched
                           the audience (or the thumbnail lied)
```

That 2×2 is the page's diagnostic quadrant and the reason merchandising teams watch VTC more closely than final conversion: it moves faster (weeks, not cohort ages), and it separates listing problems from checkout problems before either gets blamed.

Event hygiene — where this metric lives or dies: add-to-cart is *logged, not derived*. A "view" that means a card impression in a list, not the detail page, silently counts wishlist-taps as intent; auto-added coupons count as carts nobody chose; and guests merging accounts after login can double-count or lose events entirely depending on the pipeline. Pin the event definitions with the data engineers before the dashboard says "views" and means impressions.

Uses worth the row: **assortment testing** (a VTC well above category baseline on organic traffic is a hidden winner — check margin and give it the [traffic it hasn't earned](/t/product-conversion-rate) yet), **creative alignment** (ad-to-page VTC by campaign shows which ads bring *wanters* vs *lookers*), and **pricing sensitivity** (VTC collapsing when a price rises — before any promo panic — is the purest read of sticker reaction you will get without an [elasticity study](/t/price-elasticity)).

When VTC overstates: promo-week hoarders (add today, buy never), reseller carts (huge, abandoned, repeat — a [frequency-pattern](/t/purchase-frequency) flag), and bundle SKUs whose children get auto-added. And never rank low-volume SKUs by it: 12 views, 1 add = "8.3%" noise.
