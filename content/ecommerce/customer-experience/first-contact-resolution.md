---
title: "First Contact Resolution"
summary: "Issues closed in one touch — the metric that ends the 'sudah saya chat tiga kali' complaint."
levels: { data-analyst: mid-level }
aliases: ["FCR", "single-contact resolution"]
prereqs: []
related: ["resolution-time", "first-response-time", "contact-rate", "csat"]
---

First contact resolution = issues fully resolved in the customer's *first contact* ÷ total issues, within a no-reopen window (commonly 3–7 days; the definition must state it). It is [resolution time](/t/resolution-time)'s quality twin: fast closes that reopen are a queue beating its own metric, and FCR catches exactly that fraud.

```text
by issue type, 90d:
  order-status question    FCR 92%   (info you already have)
  refund request           FCR 71%   (finance approval is the gap)
  exchange claim           FCR 23%   (reverse logistics by nature)
  damaged-in-transit       FCR 18%   (needs a courier dispute — invisible to the customer)
```

The table is the entire management argument: FCR is not a universal target, it's a *ceiling set by process type* — an exchange cannot be "resolved" on chat when the parcel must travel back. What the metric legitimately drives is the gap between *possible* and *actual* FCR: refunds at 71% when finance can pre-authorize under a threshold means 29% of customers were told "we'll follow up" for a decision that could be automatic; order-status at 92% means the remaining 8% are edge cases agents *can* solve if the order system gave them the courier's scan history.

The reopen trap is why FCR must be paired with a definition discipline: agents closing tickets early to lift the number reopens the *issue* at day 4, and the customer experiences two failures with one satisfaction survey. Honest FCR = closed-first-contact AND not-reopened-7-days AND no same-issue [re-contact](/t/contact-rate); any two of the three is a metric you can game.

The economics that make it a CS-leadership number, not a KPI: each avoided contact is a full service cost (agent time, queue, second [CSAT](/t/csat) survey) *and* each reopened contact is a satisfaction event where the customer learns the first answer was wrong — the confidence damage is asymmetric and permanent, which is why FCR correlates with [repeat purchasing](/t/repeat-purchase-rate) more strongly than speed metrics do.

When not to chase it: relationship channels where re-contact *is* the model (proactive check-ins on enterprise accounts), and first-contact resolutions that require giving away margin — FCR at 100% via instant refunds to every claim is [fraud](/t/fraud-rate) recruitment wearing a service score.
