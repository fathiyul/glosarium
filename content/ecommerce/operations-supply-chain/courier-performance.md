---
title: "Courier Performance Scorecard"
summary: "Per-carrier, per-lane: late, lost, damaged, expensive — negotiating with data instead of vibes."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["carrier scorecard", "logistics vendor performance", "3PL scoring"]
prereqs: []
related: ["otd-rate", "failed-delivery-rate", "order-processing-time", "cash-on-delivery"]
---

A courier scorecard ranks delivery partners on the outcomes you actually pay for — not the SLA brochure. The standard grid: [on-time delivery](/t/otd-rate) rate, [failed/RTS](/t/failed-delivery-rate) rate, damage rate, COD collection-and-remittance timeliness (the cash you float while the carrier holds it), cost per kg-parcel, and scan/tracking completeness (an unscanned parcel is a dispute you'll lose).

```text
courier     OTD   fail   damage  cost/kg   remittance-late
RegulerJt   96%   1.1%   0.3%    Rp 8.4k   0%
KilatNusa   88%   0.6%   0.1%    Rp 6.9k   3 days
CargoExpress 97%  4.2%*  1.9%    Rp 5.2k   0%
           *all in Makassar & Medan lanes — the grid's whole point
```

Read it per *lane and service class*, never as a single national average: the same carrier that wins Jakarta-Surabaya can lose Makassar by 9 points — which is an allocation rule, not a contract termination ("route by winner per region" routinely beats "pick one vendor for simplicity"). The failure patterns analysts confirm before renegotiating: lane-level splits (isolate the bad provinces before the carrier blames your addresses), season stress (a partner that holds 96% in normal weeks and collapses to 70% during [double-date](/t/promo-uplift) volume has no surge capacity — your campaign playbook needs a second vendor priced in), and COD remittance drift (the late-settlement number is working-capital cost [DOI](/t/days-of-inventory) never captured).

The data truth that makes or breaks the scorecard: delivery events must come from the *carrier feed* reconciled with your order status, and "delivered" means recipient-completed (carrier-logged "delivered" with a failed-COD contradiction is a dispute log, not a performance stat). Feed the scorecard back per-lane at the quarterly rate review — carriers improve what gets measured by lane, not what gets averaged nationally.

When to keep a worse-performing courier anyway: negotiation leverage (a single-vendor lane has no threat), coverage (the cheap regional-only partner serves the provinces the national ones won't), and category fit (bulky/frozen lanes have their own scorecards entirely).
