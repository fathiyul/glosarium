---
title: "Rounding and Money"
summary: "Never store money as a float; use integers or decimals."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["storing money", "floating point money", "currency rounding"]
prereqs: ["floating-point", "integer"]
related: ["floating-point", "integer", "ledger", "multi-currency", "invoices-receipts"]
also: [product-features]
---

Never store money as a floating-point number. Floats can't represent most decimal fractions exactly, so tiny errors creep in, and they add up.

```python
0.1 + 0.2                  # 0.30000000000000004
sum([0.10] * 10)           # 0.9999999999999999
```

A report that's off by a cent is a bug that auditors, customers and regulators notice ([floating point](/t/floating-point)).

## Two safe approaches

**1. Integers in the smallest unit** (cents, or the currency's minor unit):

```python
price_cents = 1999            # $19.99
total_cents = price_cents * 3 # 5997, exact
f"${total_cents / 100:.2f}"   # format only for display
```

**2. An exact decimal type**:

```python
from decimal import Decimal
Decimal("19.99") * 3          # Decimal('59.97')
```

Create decimals from **strings**, not floats (`Decimal(19.99)` copies the float's error). Databases have `NUMERIC` / `DECIMAL`, and Java has `BigDecimal`.

## Rounding

Decide how and when to round, and be consistent.

- **Round only at defined points** (per line or per invoice), not after every step.
- **Pick a rule**: half-up is common in invoices, while "banker's rounding" (half to even) is the default in some libraries. Check what yours does.
- **Splitting an amount** (a $100 bill across three people) leaves a remainder cent. Decide who gets it, so the parts add up to the whole.
- **Percentages and tax** produce fractions of cents. Round per your tax rules.

## More pitfalls

- **Currencies differ**: some have no minor unit (JPY), some have three decimals (KWD). Store the currency with the amount ([multi-currency handling](/t/multi-currency)).
- **JSON numbers** become floats in JavaScript. Send money as integer cents or a string.
- **Never compare floats for equality**, and don't use floats in database money columns.
- **Keep an audit trail**, and use balanced entries for movements of money ([ledger](/t/ledger)).
