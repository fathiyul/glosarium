---
title: "First Response Time"
summary: "How long until a human answers — the metric customers actually judge you on."
levels: { data-analyst: junior }
aliases: ["FRT", "response time", "time to first reply"]
prereqs: []
related: ["resolution-time", "first-contact-resolution", "chat-response-rate", "csat"]
---

First response time = clock from customer contact to the first *meaningful human* reply (bots and "we received your message" templates are excluded or reported separately; the queue that "answered" in 2 minutes and nothing since is FRT theater). It is the experience metric with the most direct link to [CSAT](/t/csat) in the first minutes, and the one marketplace platforms literally score sellers on — [chat response rate](/t/chat-response-rate) is their compliance version of the same idea.

```text
FRT distribution, WhatsApp support queue:
  median 8 min ✓  P90 4.2 h ✗  max 3 days (weekend queue)
the median is the pitch; the P90 is the product
```

Distribution over average, always: response queues are multi-modal by nature (instant daytime chats, weekend graveyard, ticket-type backlogs), and a mean of "45 minutes" can average a 3-minute and a 3-day reality that require entirely different staffing. Segment by *channel* (chat expects minutes, email tolerates a day, marketplace chat is SLA-bound by platform), by *hour and day*, and by *issue type* — a refund dispute waiting behind three password resets is a routing decision, not a headcount one.

The measurement trap that inflates hope and then CSAT: **acknowledgment vs answer.** An auto-reply or a "sedang kami cek" counts as first response in most helpdesk software; track *substantive* first response (a reply that advances the issue) beside it — the gap between the two lines is the queue lying to itself. And the weekend/holiday cliff in Indonesian e-commerce is real: campaigns run 24/7, staffing often doesn't; a P90 computed Monday-morning-after-a-flash-sale hides exactly the customers who are writing reviews.

FRT's business framing: it is a *conversion* metric for pre-sale contacts (a buyer asking "ready stock?" at 22:00 with a 6-hour FRT is, statistically, already ordering from a faster store), and a *retention* metric for post-sale. Price the two queues separately — same channel, different revenue line.

When to stop optimizing FRT: when it becomes a game of fast-empty-replies (the metric improves, [FCR](/t/first-contact-resolution) collapses, customers re-contact — total effort rises while each individual number gets prettier). FRT, resolution time and contact-rate-after-contact must be read as a set.
