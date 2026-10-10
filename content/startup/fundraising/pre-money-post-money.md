---
title: "Pre-Money and Post-Money Valuation"
summary: "The company's value before and after new money comes in, and how ownership is calculated."
levels: { tech-entrepreneur: mvp }
aliases: ["pre-money", "post-money", "pre-money valuation"]
prereqs: ["dilution", "priced-round"]
related: ["priced-round", "dilution", "valuation-cap", "option-pool-shuffle"]
---

**Pre-money** valuation is what the company is worth before new investment; **post-money** is pre-money plus the money raised. Ownership falls out directly: invest $2M at an $8M pre-money → $10M post → new investors own 20%. Every priced-round conversation is secretly about these two numbers.

```text
pre $8M + raise $2M = post $10M → new money owns $2M/$10M = 20%
founders/employees share the remaining 80% (before option pool mechanics)
```

The subtlety is the option pool: investors typically require an expanded pool *pre-money*, meaning existing holders (mostly founders) pay for it, not the new money. A "20% round" with a simultaneous pool top-up dilutes founders more than the headline suggests — model it ([pool shuffle](/t/option-pool-shuffle)).

The classic mistakes:

- Negotiating valuation, ignoring structure. Liquidation preferences, pool terms and pro-rata rights move real money. A high valuation with harsh terms can be worse than a lower clean one ([term sheet](/t/term-sheet)).
- Confusing valuation with money in hand. A $10M post-money company with $2M raised has $2M to spend, not $10M. Valuation is a price tag, not a bank balance.
- Forgetting fully-diluted basis. Valuations divide by *fully-diluted* shares (including options and converting SAFEs), not just outstanding founders' shares. The denominator matters as much as the number.
- Optimizing the number over the partner. A slightly lower valuation with the right lead investor (network, follow-on, reputation) outperforms a record price with dead money behind it.

**Learn the arithmetic cold:** pre, post, percentages, pool mechanics, conversion stacks. Founders who cannot do this math in a meeting negotiate blind — see [dilution](/t/dilution) and [SAFE conversion](/t/SAFE-conversion).
