---
title: "Email Delivery Rate"
summary: "The share of sends that actually reached mail servers — the gate every other email metric stands behind."
levels: { data-analyst: junior }
aliases: ["delivery rate", "deliverability rate"]
prereqs: []
related: ["open-rate", "unsubscribe-rate", "email-deliverability"]
---

Delivery rate = delivered ÷ sent. The gap in between is **bounces**: the message never reached the recipient's mail server. Two kinds, two different causes:

```text
hard bounce  permanent — address doesn't exist
             → list quality: old data, typos, purchased lists
soft bounce  temporary — full inbox, throttled server, timeout
             → often a retry/infrastructure signal, not a list signal
```

Why analysts care about the *gate* first: every downstream metric divides by a denominator that silently excludes the undeliverable, so a campaign at "40% open rate" on a 70% delivery rate reached 28% of the intended list. When a client complains that their opens dropped while sends held steady, bounce patterns are usually the answer.

The dangerous direction is not the rate's level — it's its *cause*. Rising hard bounces from a clean list means acquisition or data hygiene decayed. Rising soft bounces clustered on specific domains points at sender reputation or content changes triggering rejection. And the metric that bounces hides entirely: **bulk-folder and spam-folder placement** — technically "delivered" (the server accepted it), practically invisible. Delivery rate measures acceptance by the server, not arrival at the eye ([email deliverability](/t/email-deliverability) covers the authentication and reputation layer that moves it: SPF, DKIM, DMARC).

Thresholds worth watching relative to your own history: a sudden jump in bounces for one domain is an infrastructure event; slow creep across all domains is a reputation decline. Both deserve action before platforms start rejecting outright.

The hygiene loop is boring but compounding: verify addresses at collection, remove hard-bouncers from future sends (and *don't* re-pull them from an old export), segment by inactivity before buying more data than the list can earn. When the bounce rate looks "fine" but [unsubscribes](/t/unsubscribe-rate) are climbing and opens are falling, treat delivery's silence as a warning, not a clearance.
