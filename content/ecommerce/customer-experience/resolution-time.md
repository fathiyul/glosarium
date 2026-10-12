---
title: "Average Resolution Time"
summary: "Contact-open to issue-actually-closed — the duration customers feel as 'how long they messed with me.'"
levels: { data-analyst: junior }
aliases: ["ART", "time to resolution", "treatment time"]
prereqs: []
related: ["first-response-time", "first-contact-resolution", "customer-success", "ces"]
---

Resolution time = opened-to-closed duration *for the issue*, not the ticket: refunds pending finance, deliveries pending courier, "resolved" tickets reopened by the same customer. The clean definition is time from first contact to an outcome the customer stops chasing — a proxy that's usually "no reopen or re-contact on this issue for 7 days."

```text
resolution time by issue type, 90-day median:
  refund processing       2.1 d   (the float is yours to cut)
  delivery escalation     4.8 d   (it's the courier's — but the *customer's* number is yours)
  size exchange           9.3 d   (reverse + restock + forward: the [restock pipeline](/t/restock-rate) IS the SLA)
```

Median + P90, split by type, always: an overall "1.4 day average" is a number that hides a 9-day exchange queue where it hurts. Issue-type decomposition is also the *owner* decomposition — refunds are finance SLA, delivery is [courier lane](/t/courier-performance), exchanges are reverse logistics; resolution time as one blended number lets all three hide inside each other.

The reopen correction is the metric's soul: tickets "resolved" and reopened at hour 30 have a *true* resolution time nobody reports while the reported one flatters the queue. Track reopen rate ([first-contact-resolution](/t/first-contact-resolution) is the same failure counted differently) and measure first-contact-to-final-contact, not open-to-close.

The customer-side reading: resolution time is the experience dimension [CES](/t/ces) captures as *effort* — customers don't experience a ticket lifecycle, they experience "three weeks and five chats about a Rp 250k refund." For [repeat-purchase](/t/repeat-purchase-rate) risk after a service event, effort duration and reopen count beat satisfaction-score correlations; the "resolved but exhausting" cohort is the quiet churner.

When to *stop* optimizing: pre-sale questions (a 4-hour "stock?" answer resolution is already the [first response](/t/first-response-time) story; pushing resolution-time on chats trains agents to rush closes and reopens, exactly the trade above).
