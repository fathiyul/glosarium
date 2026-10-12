---
title: "Webhooks vs Polling"
summary: "Being notified when something changes vs repeatedly asking."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["webhooks vs polling", "push vs pull http", "polling vs webhooks"]
prereqs: ["http", "webhooks"]
related: ["webhooks", "polling", "server-sent-events"]
---

When your system needs to know about another system's events, there are two shapes. **Polling** asks repeatedly ("anything new? anything new?"); **webhooks** get told (the source POSTs to your URL when something happens). Push versus pull over HTTP.

```text
polling:  you ──GET /events──▶ source, every 30s (mostly "nothing new")
webhooks: source ──POST /your-hook──▶ you, only when something happens
```

Webhooks win on latency and efficiency — near-instant delivery, no empty requests — at the cost of operating a public endpoint (verify signatures, handle retries, stay idempotent). Polling wins on simplicity and control — no inbound surface, you set the pace — at the cost of delay and wasted requests.

The classic mistakes:

- Polling a huge interval for urgent events. Thirty-minute polls for fraud alerts guarantee staleness. Match frequency to the event's urgency, or switch to push.
- Hammering with short polls. One-second polling from thousands of clients is a self-inflicted DDoS. Respect rate limits, back off, use conditional requests and cursors.
- Unauthenticated webhook endpoints. A public URL that acts on any POST is an invitation. Verify signatures and timestamps on every delivery.
- Assuming webhook delivery. Webhooks retry and can still be missed; critical flows need reconciliation (periodic poll or provider status checks) alongside push.
- Non-idempotent webhook handlers. Retries deliver duplicates; handlers must dedupe by event ID.
- No cursor on polls. Re-fetching "everything recent" without a since-token duplicates and skips. Paginate by cursor or timestamp.
- Choosing once and forever. Start with polling for simplicity, graduate to webhooks where latency or volume demands it. Many systems run both: webhooks live, polls reconcile.

**The pairing:** webhooks for now, polling for certainty. Push delivers fast; pull verifies. Together they cover what either alone guarantees poorly.
