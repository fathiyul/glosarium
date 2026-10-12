---
title: "Webhook"
summary: "An HTTP callback: a service calls your URL when something happens."
levels: { backend: junior, frontend: mid-level, data-engineer: junior , data-scientist: junior }
aliases: ["webhook", "HTTP callback", "web hook"]
prereqs: ["http", "endpoint"]
related: ["webhook-design", "webhooks-vs-polling", "idempotent-consumer", "hmac", "retry-with-backoff"]
also: [api-design, messaging]
---

A webhook is an HTTP callback: instead of you repeatedly asking a service "has anything happened?", the service sends a request to a URL you provided when something does happen.

```
You register:  https://myapp.example.com/webhooks/payments
Payment provider, when a payment succeeds, sends:

POST /webhooks/payments
Content-Type: application/json
X-Signature: sha256=9f2c...

{"event": "payment.succeeded", "id": "evt_123", "data": {"order": 917, "amount": 5000}}
```

Your endpoint responds `200 OK`, and then does the work. Common sources: payment providers, Git hosts (a push triggers CI), chat platforms, shipping and e-commerce tools.

## Compared with polling

Polling asks repeatedly and mostly gets "nothing new", which wastes calls and adds delay. A webhook pushes the news as it happens ([webhooks vs polling](/t/webhooks-vs-polling)).

## Receiving them safely

- **Verify the signature.** Anyone can post to your URL, so check the HMAC signature (or secret) the sender includes, using the raw body ([HMAC](/t/hmac)).
- **Respond quickly** with a 2xx, and process asynchronously (queue it). Senders time out and retry.
- **Be idempotent.** Delivery is usually at-least-once, so the same event can arrive twice. Deduplicate by event ID ([idempotent consumers](/t/idempotent-consumer)).
- **Expect out-of-order events.** Don't assume `updated` arrives after `created`.
- **Don't trust the payload blindly.** For important actions, fetch the current state from the provider's API.
- **Use HTTPS.**
- **Log every event** received, to debug.
- **Handle failures**: the sender retries, often with backoff, for a limited time. Provide a way to replay missed events ([retry with backoff](/t/retry-with-backoff)).

## Testing locally

Your laptop isn't reachable from the internet, so use a tunnel tool (such as ngrok or Cloudflare Tunnel) or the provider's CLI to forward events to localhost.

## If you send webhooks

See [webhook design](/t/webhook-design): signatures, retries, ordering and versioning.
