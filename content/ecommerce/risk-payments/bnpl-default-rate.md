---
title: "BNPL Default Rate"
summary: "Paylater purchases that never got paid back — the credit tail hiding inside a conversion booster."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["paylater default", "BNPL delinquency"]
prereqs: []
related: ["payment-method-mix", "fraud-rate", "aov", "unit-economics"]
---

BNPL default rate measures installment/pay-later purchases that failed to complete payment — delinquency on the credit leg of what looked like a checkout button. Paylater (installments at checkout) is a genuine conversion and basket-size lever — [AOV](/t/aov) rises when price becomes a monthly number — and a *credit product* whose losses follow different math than fraud.

Who pays the defaults is the first analysis question, because it changes whose problem this metric is: under most marketplace arrangements the *provider* (the BNPL lender) absorbs credit loss and the merchant is paid; where merchants carry partial liability (or the store operates its own installment scheme), every default lands on your P&L. Read the contract before the dashboard — many "we don't have BNPL risk" reports miss a merchant-side liability clause.

```text
provider bears the loss:
  BNPL share of orders 12% · AOV +38% · zero merchant default
  → this metric is a CUSTOMER HEALTH number for you:
    paylater users with late-payment history churn and refuse more
merchant bears the loss:
  it is a pricing input: expected default % belongs inside the
  installment fee the same way MDR sits inside prepaid cost
```

The fraud adjacency: new-account BNPL stacking — first order, max installment, device-clusters — is [fraud](/t/fraud-rate) with a credit-application shape, and it arrives early (first installment missed), long before "default" would statistically show; velocity and identity rules do more here than credit scoring.

The cohort view analysts add: paylater customers are not one tribe — *disciplined* installment users (planned big purchases) behave like premium prepaid customers; *revolving* users (chaining small BNPL to finance cashflow) carry refusal and late-payment signatures. Segment default and [COD rejection](/t/cod-rejection-rate) by that split and the payment-mix table finally explains *who* is on the checkout, not just *what button* they clicked.
