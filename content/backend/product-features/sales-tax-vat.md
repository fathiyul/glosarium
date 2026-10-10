---
title: "Sales Tax and VAT"
summary: "Charging the right tax for each customer's location."
levels: { backend: senior , tech-entrepreneur: pmf }
aliases: ["sales tax", "VAT", "tax computation"]
prereqs: ["invoices-receipts", "payment-integration"]
related: ["invoices-receipts", "payment-integration", "multi-currency", "third-party-integration"]
---

**Sales tax** (US-style, added on top) and **VAT/GST** (added within the price, common in much of the world) are taxes on transactions. In software, "handling tax" means computing the correct amount per line based on the customer's location, the product type, and whether you have an obligation to collect there, then showing and remitting it.

```text
buyer location + product taxability + your registration status
→ tax rate → tax amount → shown on the invoice and remitted
```

The core concerns:

- Jurisdiction — tax depends on where the buyer (or sometimes seller) is. Rates and rules vary by country, state, and even city, and change often.
- Nexus/registration — you generally only collect where you're registered to (for example, where you have a tax obligation). Where that applies is a legal matter, not just technical.
- Product taxability — different products/services are taxed differently (physical goods vs digital vs exemptions).
- Remittance and reporting — collecting tax means owing it to authorities; you must track and remit it.

The classic mistakes:

- Rolling your own tax tables. Tax rules are numerous, location-specific and change constantly; maintaining them yourself is a correctness and compliance nightmare. Use a tax service.
- Hard-coding a rate. A single VAT figure for "the EU" or a stale rate produces wrong invoices and compliance failures. Rates change and vary by sub-jurisdiction.
- Tax on the total instead of per line. Different products have different rates; computing tax once on the order total is wrong. Compute per line item.
- Ignoring location/IP mismatch. Determining the buyer's location (billing address, and rules for digital services) is part of tax; guessing wrong mis-taxes the sale.
- Forgetting currency and rounding. Tax is money; use precise arithmetic and round consistently (see [multi-currency](/t/multi-currency)).
- No record on the invoice. Invoices must show the tax breakdown (and often a tax ID) to be valid (see [invoices and receipts](/t/invoices-receipts)).
- Treating it as a one-time setup. Registration status, rates and rules change; tax handling is ongoing, not set-and-forget.

**How to handle it:** integrate a dedicated tax service (see [third-party integration](/t/third-party-integration)) to compute rate and amount per line based on location and product, record it on the invoice, and treat the legal/registration questions as explicit decisions. It's one of the clearest "don't build this yourself" areas in backend work — the rules are too many and too changeable to maintain by hand. See [payment integration](/t/payment-integration).
