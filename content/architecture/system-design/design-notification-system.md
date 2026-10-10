---
title: "Designing a Notification System"
summary: "Fan-out across email, SMS and push, with preferences and retries."
levels: { backend: senior }
aliases: ["notification system design", "push notification system", "design notifications"]
prereqs: ["message-queue", "push-notifications"]
related: ["push-notifications", "notification-preferences", "dead-letter-queue"]
---
**Designing a notification system** delivers the right message to the right device at the right time: event ingestion, user preferences and quiet hours, channel selection (push/email/SMS), per-device fan-out, rate limiting, and delivery tracking. The challenge is volume times personalisation — millions of events, each routed by individual rules.

```text
event → preferences check → channel router → per-device send → track+retry
```

Key decisions: queue-per-priority (transactional vs marketing isolation), templating (localised, channel-adapted), dedup and collapsing (five likes become one summary), quiet hours and frequency caps (per user, enforced centrally), and provider abstraction (multiple push/SMS vendors with failover).

The classic mistakes:

- No preference enforcement point. Every service sending directly means preferences live nowhere and users get spammed. Centralise the send decision; nothing bypasses it.
- Marketing and transactional sharing queues. A marketing blast delaying password resets is a category error. Isolate by priority with separate capacity.
- Missing collapse/digest. N events → N pushes trains users to disable everything. Aggregate, summarise, digest by preference.
- Retry storms on provider outage. Blind retries during an APNs/FCM incident amplify the outage. Back off, shed low-priority, queue durably.
- No delivery tracking. Sends without receipts, opens and failures can't be debugged or measured. Track per stage; alert on drops.
- Device token rot. Stale tokens accumulate (reinstalls, churn); sending to them wastes money and skews metrics. Prune via provider feedback continuously.
- One channel thinking. Push-only fails users who disabled it; critical messages need escalation paths (push → SMS → email) by importance.

**Why it teaches:** fan-out, prioritisation, preferences as policy, provider resilience and cost control — notifications are distributed delivery with a human tolerance budget. Respect it.
