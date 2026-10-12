---
title: "Cart Abandonment Rate"
summary: "Share of created carts that never become orders — and the two different rates hiding inside."
levels: { data-analyst: mid-level, frontend: mid-level }
aliases: ["cart abandonment", "basket abandonment"]
prereqs: ["conversion-rate"]
related: ["conversion-rate", "funnel-analysis", "cash-on-delivery", "payment-gateway", "email-deliverability"]
---

Cart abandonment rate counts carts created that never converted:

```text
1,000 carts created → 120 orders = 88% abandoned
```

Industry summaries commonly quote around 70% average abandonment for e-commerce; treat any borrowed figure as a mixture of categories, devices and markets — your number is only meaningful against your own segments and history.

The metric is really two, and teams blur them:

- **Cart abandonment** — items added, never reaching checkout. Signals price uncertainty: comparing, "save for later", shipping shock.
- **Checkout abandonment** — started checkout, never paid. Signals friction or failure: mandatory account, slow [payment gateway](/t/payment-gateway) steps, expired virtual-account session, an error nobody logs.

Split them before optimizing "abandonment" as one number; the fixes are different. Slice by device, entry category and cart value — high-value carts abandon *later* and for different reasons than impulse baskets.

The COD wrinkle: in markets where cash-on-delivery is common ([cash-on-delivery](/t/cash-on-delivery)), checkout "conversion" is not the end of the story — a COD order can die at the doorstep. Report through delivered-and-paid, or the funnel flatters exactly the riskiest payment method.

Frontend levers, ranked by how reliable the evidence tends to be: show the all-in price including shipping **before** the cart, offer guest checkout, cut payment-step redirects, persist the cart across sessions and devices. Reminder sends (email or WhatsApp — deliverability discipline applies, see [email deliverability](/t/email-deliverability)) reclaim a slice — but measure recovery against a holdout, because some reminders "convert" people who were coming back anyway: that's a thank-you note you paid to send, not [incremental revenue](/t/incremental-revenue).

When not to obsess: carts doubling as wishlists (some retailers *want* that saved-item remarketing inventory), and high-consideration purchases where multi-week abandonment is the normal buying cycle, not a leak.
