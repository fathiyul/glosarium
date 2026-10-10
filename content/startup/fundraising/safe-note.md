---
title: "SAFE"
summary: "A simple agreement for future equity: money now, shares at the next priced round."
levels: { tech-entrepreneur: mvp }
aliases: ["SAFE", "Simple Agreement for Future Equity", "safe note"]
prereqs: ["valuation-cap", "conversion-discount"]
related: ["valuation-cap", "conversion-discount", "convertible-note", "dilution"]
core: [tech-entrepreneur]
---

A **SAFE (Simple Agreement for Future Equity)** gives investors future shares in exchange for money now — no valuation negotiated today, no interest, no maturity date. At the next [priced round](/t/priced-round), the SAFE converts into shares at a discount, or capped at a maximum valuation ([cap](/t/valuation-cap)), whichever favors the investor most.

```text
today:    investor wires $100k on a SAFE (cap $5M, 20% discount)
Series A: priced at $10M → cap applies → SAFE converts as if round were $5M (roughly 2× the shares)
```

It dominates early fundraising because it defers the hardest negotiation (valuation) to a moment with more information, at the cost of founders not knowing exactly what they sold until conversion. Standard forms (widely used templates) keep legal costs near zero — use them unmodified unless counsel says otherwise.

The classic mistakes:

- Stacking uncapped SAFEs. Money in without caps or discounts at escalating implied valuations creates a conversion shock at the priced round — founders diluted far beyond expectations. Cap every SAFE.
- Forgetting conversion math until the round. Founders modeling ownership without converting outstanding SAFEs discover their stake mid-negotiation. Model fully-diluted ownership continuously (see [cap table](/t/cap-table), [SAFE conversion](/t/SAFE-conversion)).
- MFN confusion. Most-favored-nation clauses promise later, better terms retroactively. Track every MFN issued — they all trigger at once at pricing.
- Treating SAFEs as free money. No maturity or interest does not mean no cost: every SAFE is future dilution at terms set later. Raise what the milestones need, not what is offered.
- Non-standard forms. Custom-drafted SAFEs with quirky terms slow every future round (every new investor must parse them). Standards exist for everyone's benefit — including yours at exit.

**Use SAFEs** for pre-seed/seed speed with caps and discounts set deliberately. Graduate to [priced rounds](/t/priced-round) when valuation is defensible — SAFEs are a bridge to pricing, not a substitute for it.
