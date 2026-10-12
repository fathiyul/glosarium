---
title: "Email Open Rate"
summary: "Opens over delivered — still useful, less trustworthy than it was, and never a revenue proof."
levels: { data-analyst: junior }
aliases: ["open rate", "OR"]
prereqs: []
related: ["delivery-rate", "unsubscribe-rate", "revenue-per-recipient", "email-deliverability", "ab-testing"]
---

Open rate = opens ÷ delivered. The denominator choice already splits teams: delivered (what reached inboxes) vs sent (bounces included); on lists with 10% bounces the two numbers disagree loudly.

The honest state of the metric: privacy proxies changed its meaning. Mail systems that prefetch messages on Apple devices fire the tracking pixel whether or not a human read the email, inflating opens; readers who block images deflate them. The net effect — a *directionally biased, increasingly unreliable* number — is the mature stance: you can no longer treat open rate as ground truth, and neither can the team quoting it.

What opens still do well, with the bias present: **compare A to B under identical conditions.** Subject-line [A/B tests](/t/ab-testing) sent to the same list on the same day measure relative preference even while the absolute level is inflated — the bias mostly cancels in the difference. Segment behavior still shows: which lists decay (open rate sliding over months = list fatigue), which send times beat others, and a sudden collapse that correlates with spam-folder placement is a [deliverability](/t/email-deliverability) warning nobody should argue with.

What opens do badly: pretending to be value. Nobody pays an invoice with attention — opens are a step, not a sale. The upgrade path in this domain: revenue metrics with holdout ([revenue per recipient](/t/revenue-per-recipient)) instead of proxy engagement. A campaign at 45% opens and zero incremental revenue is a well-designed failure.

And one classic attribution artifact to know: the "open" on one send can be recorded for someone who only opened the *forwarded* or *reopened* copy — platform counting differs; pin your definitions before comparing two tools' numbers. When not to use it: SMS and push (no pixel exists, and "delivered" there is device-level fiction) — the whole open-rate habit doesn't transfer.
