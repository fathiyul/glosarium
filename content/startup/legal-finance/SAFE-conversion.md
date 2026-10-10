---
title: "SAFE Conversion Math"
summary: "A worked example of how a SAFE turns into shares at a priced round."
levels: { tech-entrepreneur: mvp }
aliases: ["SAFE conversion", "SAFE math", "how SAFEs convert"]
prereqs: ["safe-note", "valuation-cap", "pre-money-post-money"]
related: ["safe-note", "cap-table", "dilution", "pre-money-post-money"]
core: [tech-entrepreneur]
---

**SAFE conversion** turns early money into shares when the priced round sets a price. Work one example fully and the mechanics never confuse you again: a $100k SAFE with a $6M cap and 20% discount, converting at a Series A priced at $10M pre-money ($10/share for simplicity).

```text
discount path:  $10 × (1 − 0.20) = $8.00/share → $100k ÷ $8 = 12,500 shares
cap path:       $6M cap → $6.00/share → $100k ÷ $6 = 16,666.67 shares
cap binds ($6 < $8) → investor takes 16,666.67 shares (~1.67% pre-new-money)
```

Steps in general: compute both candidate prices (discounted round price vs cap-implied price), take the lower (investor-favorable), divide principal (+ any rolled interest/MFN adjustments) by it. That share count joins the fully-diluted total the round prices on.

The classic mistakes:

- Forgetting accrued extras. Convertible notes add interest; MFN clauses upgrade terms; multiple SAFEs stack. Convert the *whole stack*, not the headline SAFE.
- Modeling on outstanding shares. Conversion math runs on fully-diluted capitalization (options, pool, all SAFEs). Outstanding-only math understates dilution systematically.
- Rounding chaos. Fractional shares, alternating rounding conventions across documents. Define rounding once in the model and match counsel's decimals.
- Surprise at closing. Running conversion math for the first time in the round's final week, when negotiating leverage is gone. Model from the first SAFE signed, updated per instrument.

**Keep a live model** from the first early check: every SAFE/note entered with cap, discount, MFN and maturity, converting in one view. At pricing, the conversation becomes confirmation, not discovery. See [cap table](/t/cap-table) for where the output lives.
