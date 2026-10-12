---
title: "Revenue per Recipient"
summary: "Attributed money per person emailed — the metric that ranks sends, and needs a holdout to be true."
levels: { data-analyst: mid-level }
aliases: ["RPR", "RPRec", "revenue per send"]
prereqs: []
related: ["open-rate", "unsubscribe-rate", "incremental-revenue", "holdback-group", "roas"]
---

Revenue per recipient = attributed campaign revenue ÷ recipients delivered. It collapses the whole engagement staircase ([delivery](/t/delivery-rate) → opens → clicks) into what the list actually earned per send, which is why it ranks campaigns and cadence decisions better than any proxy metric.

```text
Campaign A: 50,000 delivered, Rp 40M revenue → Rp 800/recipient
Campaign B: 20,000 delivered, Rp 25M revenue → Rp 1,250/recipient
"smaller list, same total" is a targeting win only until the
list-size effect is separated from the message effect
```

That caveat is the core discipline: RPR confounds *message quality* with *audience quality* and with *volume*. A narrowed send to engaged buyers shows great RPR while the broad send's total revenue was larger; a "successful" win-back blast's RPR mostly reflects the segment being already-return-prone.

The second — bigger — caveat: attribution without a counterfactual overstates everything. The recipient list always includes people who would have bought anyway, so raw attributed RPR treats base demand as campaign-created. The upgrade: hold a random [holdback group](/t/holdback-group) per send and compute **incremental RPR** = (send-group revenue − holdout-group revenue-per-person) ÷ recipients ([incremental revenue](/t/incremental-revenue) does the formal work; the result is typically a fraction of attributed).

Use where ranking and frequency decisions live: cadence tests (weekly vs twice-weekly with unsub cost on the ledger — see [unsubscribe rate](/t/unsubscribe-rate)), segment prioritization, list-growth ROI. Do not use when comparing across channels: an email's RPR excludes the traffic that email *assisted* but another channel converted ([attribution](/t/attribution) again decides who looks good).

The meeting version: attributed RPR is the optimistic number, holdout RPR is the real one. Run the holdout when a decision gets expensive, not every Tuesday.
