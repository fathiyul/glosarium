---
title: "Serial Returners"
summary: "Customers who return disproportionately — find the pattern, price the behavior, keep the store open."
levels: { data-analyst: mid-level }
aliases: ["return abuse", "wardrobing", "high-return customers"]
prereqs: []
related: ["return-rate", "restock-rate", "fraud-rate", "customer-success"]
---

A serial returner is a customer (or household/device cluster) whose return rate far exceeds the category norm — a 60%-return account in a category running at 12%. The name invites drama; the practice is quiet arithmetic: expected margin per customer minus expected *return* cost per customer, and the occasional surprise that a "top buyer" by revenue ranks last by realized [margin](/t/margin-per-sku).

```text
segment returns by customer 90-day rate:
  <10%        78% of customers · margin positive
  10–30%      19%              · normal fashion tail — keep
  >30%         3% of customers · carries 14% of return cost
     ↳ of that 3%: half wear-then-return (wardrobing),
       half "ordering 3 sizes to pick 1"
```

The two populations, the two treatments: **size-fishing** is a product information failure — the behavior is rational, and the cure is better size charts and fit tools (the reviews they'd write without them cost more than the freight). **Wardrobing** — buy the dress, wear it to the event, return it — is priced behavior: restocked units sell at a discount ([restock rate](/t/restock-rate)'s job), and the account-level economics eventually say the subscription-style "free unlimited returns" bargain is one-sided.

Detection discipline before policy: use *relative* thresholds (vs category and vs cohort tenure — a new customer's first return is nothing; the pattern that matters is 8+ returns across sizes), require volume floors (a 50% rate on 2 orders is noise), and check the [COD rejection](/t/failed-delivery-rate) and [chargeback](/t/chargeback-rate) neighbors — some "serial returners" are actually refund-claim fraud (returned-but-not, or empty-box claims), which is a risk-team case, not a merchandising one.

Policies, ordered by wisdom: (1) fix fit information first, (2) price behavior in — return-shipping fees for high-return segments, restocking windows, final-sale categories, (3) limit — restocking allowances, tiered return windows — and only then (4) exclusion. Blocking is loud, leaks the customer to a competitor who *won't* check, and marketplace-platform rules may not even allow it.

When to accept the cost silently: the top-decile customer who returns 40% *and* nets positive margin is a profitable eccentricity — the serial-returner conversation is about the ones whose lifetime value turns negative after return arithmetic, and those you should be able to name in a single table, with numbers, before anyone touches a policy.
