---
title: "Unsubscribe Rate"
summary: "The one email metric people act on honestly — and the earliest signal of frequency and relevance debt."
levels: { data-analyst: mid-level }
aliases: ["unsub rate", "churn (email)", "opt-out rate"]
prereqs: []
related: ["open-rate", "delivery-rate", "revenue-per-recipient", "email-deliverability"]
---

Unsubscribe rate = unsubscribes ÷ delivered per send. Unlike opens, it is nearly un-gameable: clicking "unsubscribe" is a decision, not an observation artifact — which makes it the most trustworthy negative signal in the channel.

The arithmetic of decay matters more than any single campaign number: lists lose a fraction every send (typical healthy sends sit in a low single-digit percent band; what matters is *trend*). A list that unsubscribes 0.5% per campaign and sends weekly loses roughly a quarter of itself in a year — retention math every team discovers too late when growth stalls despite constant send volume. So the analyst framing: **unsub rate is the cost of frequency**, priced per send.

Reading spikes, in order of the diagnosis they imply:

```text
spike on one campaign     → content mismatch: what promised vs what delivered
spike after cadence up    → you found the audience's frequency ceiling
rising trend everywhere   → list aging: acquired cheap, leaving earned
spike on a segment only   → acquisition-channel quality problem
```

Segment before judging: a promo-triggered unsub wave after [double-date campaigns](/t/promo-uplift) is bargain-hunters leaving; that may be *good* churn if their revenue was discount-only.

Founders and marketers: the metric's honesty cuts both ways — suppressing it is worse than living with it. A forced "are you sure?" flow or burying the link below the law-required one-click opt-out (many jurisdictions mandate a working, honored unsubscribe) converts a fair unsubscribe into spam complaints, which are the reputation event that hurts everyone's deliverability, including yours ([email deliverability](/t/email-deliverability)).

The trade-off: aggressive frequency can raise revenue per send *while* raising unsubs — the decision belongs to the longer horizon: total list value ([revenue per recipient](/t/revenue-per-recipient) across quarters), not next week's click total.
