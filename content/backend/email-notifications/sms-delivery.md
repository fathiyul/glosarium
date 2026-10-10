---
title: "SMS Delivery"
summary: "Sending text messages through providers, and the cost and fraud pitfalls."
levels: { backend: mid-level }
aliases: ["SMS delivery", "sending SMS", "sms gateway"]
prereqs: ["third-party-integration", "notification-preferences"]
related: ["sending-email", "notification-preferences", "third-party-integration"]
---

**SMS delivery** sends a short text message to a phone number through a gateway or aggregator provider (Twilio, Vonage and others). It's used for two-factor codes, alerts, delivery updates and time-sensitive notifications — reaching people who may not check email or an app promptly.

```text
backend → SMS provider API → carrier network → user's phone
```

The important characteristics:

- Cost per message. Unlike email, each SMS costs money, so volume directly costs money. This shapes design: send fewer, more targeted messages.
- Delivery receipts, not guarantees. Providers report delivery status, but SMS can still fail or be delayed (carrier issues, unreachable numbers). Best-effort.
- Regulation and consent. Sending SMS is regulated (opt-in, opt-out, quiet hours in many jurisdictions). Sending without consent is a legal problem (see [notification preferences](/t/notification-preferences)).
- Sender identity. Messages come from a short code, long number, or alphanumeric sender ID, each with different capabilities and rules per country.

The classic mistakes:

- No consent / no opt-out. SMS is heavily regulated; sending without consent, or without an opt-out mechanism, invites complaints, fines and blocking. Always provide opt-out (e.g. reply STOP) and honour it.
- Ignoring cost. Using SMS for non-urgent messages (marketing, routine updates) is expensive. Reserve it for high-value or time-critical communication.
- Assuming delivery. Assuming an SMS arrived is wrong; delivery can fail. For critical flows (2FA), provide a fallback or resend.
- Not handling opt-outs centrally. An opt-out must be recorded and honoured across all sends; scattered logic misses some (see [notification preferences](/t/notification-preferences)).
- Long messages. SMS length is limited; long messages split into multiple billable segments. Keep them short.
- Provider lock-in and routing. Delivery quality varies by provider and country; a provider that's great in one region may be poor in another. Consider routing/fallback for global reach.
- Putting sensitive data in the message. SMS isn't encrypted end-to-end and appears on lock screens; avoid sending secrets. Send a code, not the context.

**When to use it:** for 2FA codes, critical alerts, and time-sensitive notifications where immediate reach matters and the user has opted in. It's the highest-urgency, highest-cost channel — use it sparingly, with consent and an opt-out. See [third-party integration](/t/third-party-integration) for the provider-call side.
