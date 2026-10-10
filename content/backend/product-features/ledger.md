---
title: "Ledger and Double-Entry Bookkeeping"
summary: "Recording money movements as balanced, append-only entries."
levels: { backend: senior, data-engineer: senior }
aliases: ["ledger", "double-entry bookkeeping", "double entry"]
prereqs: ["transaction", "invoices-receipts"]
related: ["transaction", "invoices-receipts", "payment-integration", "audit-columns"]
---

A **ledger** is the authoritative record of money movements. In **double-entry** bookkeeping, every transaction records at least two **entries**: a debit and an equal credit, across accounts, so the totals always balance. Money never appears or disappears — it moves from one account to another. For systems that handle money, a ledger is the source of truth, separate from any cached "balance".

```text
payment of $100:
  debit  cash        $100
  credit revenue     $100        (debits = credits)
```

Why it matters in software: storing only a mutable `balance` column loses history and is impossible to audit. A ledger records every movement as an immutable entry, so you can reconstruct any balance at any point, explain discrepancies, and prove correctness. Balances become *derived* (sum the entries) rather than authoritative.

The classic mistakes:

- Mutating balances instead of recording entries. `balance -= 100` loses the "why" and is unauditable (and racy). Record immutable entries; derive the balance.
- Entries that don't balance. If debits ≠ credits for a transaction, money is created or lost. Enforce balance in code and in the schema (a transaction's entries must sum to zero).
- Editing or deleting entries. A ledger is append-only; corrections are new, offsetting entries (a reversal or adjustment), never edits. Immutability is the point.
- Floating-point money. Rounding errors corrupt the ledger; use precise decimal or integer minor units (see [multi-currency](/t/multi-currency)).
- No idempotency. A retried payment or a duplicate webhook can post the same entry twice, double-counting money. Use an idempotency key per movement (see [idempotency key](/t/idempotency-key)).
- Not posting in a transaction. The entries for one movement must commit atomically (see [transaction](/t/transaction)); a half-posted entry breaks the books.
- Confusing the ledger with the payment gateway. The gateway moves real money; the ledger records your *view* of it, reconciled against the gateway. They must agree (see [payments integration](/t/payment-integration)).
- Ignoring the chart of accounts. A ledger needs defined accounts (revenue, cash, fees, refunds); modelling them ad hoc produces an unusable mess.

**When to build one:** whenever the system must track money accurately — payments, balances, payouts, credits, refunds. For a simple app, the payment gateway may hold enough; but the moment you manage internal balances or need auditability, a double-entry ledger is the right foundation. It's the accounting version of an [audit trail](/t/audit-columns): immutable, complete, and always balanced. See [invoices and receipts](/t/invoices-receipts).
