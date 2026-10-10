---
title: "Multi-Currency Handling"
summary: "Storing, converting and displaying money in several currencies."
levels: { backend: senior, frontend: senior , tech-entrepreneur: growth }
aliases: ["multi-currency", "multiple currencies", "currency handling"]
prereqs: ["payment-integration", "ledger"]
related: ["payment-integration", "ledger", "sales-tax-vat", "proration"]
---

**Multi-currency** is handling money in several currencies — charging customers in their local currency, displaying prices appropriately, and recording values correctly. It's mostly about *precision and explicitness*: money is not a float, and an amount without its currency is meaningless.

The core practices:

- Always store the currency alongside the amount. An amount is a pair `(value, currency)`. A bare number is ambiguous and bug-prone.
- Use precise arithmetic. Store money as an integer in the currency's **minor units** (cents, pence) or a fixed-precision decimal — never a floating-point number, which rounds wrongly (see [ledger](/t/ledger)).
- Know the scale per currency. Not every currency has two decimal places (JPY has zero; some have three). Formatting and rounding depend on the currency.
- Convert deliberately, with a rate and timestamp. When converting, use a specific exchange rate (and record it), because rates change and historical amounts must stay explainable.

```text
amount: 1999, currency: USD   (i.e. $19.99)   ← not 19.99 as a float
convert with recorded rate → converted amount + rate used
```

The classic mistakes:

- Floating-point money. `0.1 + 0.2 != 0.3` in floats; accumulating such errors corrupts totals. Use integers (minor units) or decimals.
- Amounts without a currency. A number alone can't be displayed, summed or charged correctly. Always pair them.
- Summing across currencies. Adding USD and EUR directly is meaningless; convert to a common currency at a recorded rate (or keep balances per currency) before summing.
- Hard-coding two decimal places. JPY, for example, has none; formatting all currencies as `x.yy` is wrong. Use currency-aware formatting.
- Rounding inconsistently. Where you round (per line, per total) changes results and can unbalance a [ledger](/t/ledger). Decide the rounding policy and apply it consistently.
- Ignoring the display/localisation. Users expect their locale's format; use a localisation library (see [locale formatting](/t/locale-formatting)).
- Forgetting tax and proration interactions. Multi-currency interacts with tax computation and proration, both of which also involve rounding (see [sales tax](/t/sales-tax-vat)).

**How to handle it:** store `(amount in minor units, currency)`, use precise arithmetic, know each currency's scale, convert with recorded rates, and round consistently. It's a foundational correctness concern for any system handling money across regions — get the representation right and most currency bugs disappear. See [payment integration](/t/payment-integration).
