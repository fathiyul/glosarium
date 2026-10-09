---
title: "Stateless Service"
summary: "A service that keeps no session data locally, so any instance can serve any request."
levels: { backend: mid-level }
aliases: ["stateless services", "stateless application", "stateless architecture", "stateless server", "shared-nothing app tier"]
prereqs: ["session", "http"]
related: ["horizontal-scaling", "twelve-factor-app", "sticky-sessions", "load-balancer", "session", "jwt"]
core: [backend]
---

A **stateless service** doesn't remember anything about a client **between requests**. Each request carries what's needed (or the service looks it up from a shared store), so **any instance can handle any request**. That's what lets you add, remove and restart instances freely.

```
Request 1 ─► instance A ┐
Request 2 ─► instance C ├─► all behave identically; session and data come from shared stores
Request 3 ─► instance B ┘
```

## State doesn't disappear. It moves

The system still has state (carts, sessions, orders), but it's kept **outside the application processes**:

| State | Where it lives instead |
|---|---|
| User sessions | A shared session store (Redis, database) or a signed token such as a [JWT](/t/jwt) ([sessions](/t/session)) |
| Persistent data | A database |
| Cached data | A shared cache |
| Uploaded files | Object storage, not the server's local disk |
| Background work | A job queue |

## Why it matters

- **Horizontal scaling**: add instances behind a load balancer with no special handling ([horizontal scaling](/t/horizontal-scaling)).
- **Resilience**: if an instance dies, nothing is lost. The next request goes elsewhere.
- **Easy deployments**: replace instances one by one, or all at once.
- **Autoscaling and disposable containers** work naturally ([twelve-factor app](/t/twelve-factor-app)).

## Things that quietly make a service stateful

- **In-memory sessions** or "login remembered in a variable".
- **Files written to local disk** and read back by a later request that lands on another instance.
- **In-process caches** that diverge between instances, so users see different data on refresh.
- **Local counters, locks or rate-limit state**, which silently multiply per instance.
- **Scheduled jobs** that run on every instance and so run N times.
- **WebSocket connections**, which are inherently attached to one instance (use a pub/sub layer between instances).
- **[Sticky sessions](/t/sticky-sessions)**, which pin a user to an instance. It's a workaround, not statelessness.

## Practical advice

- Test it: run two instances, alternate requests between them and see what breaks.
- Treat instance memory and disk as **temporary**.
- Keep per-request context in the request ([request context](/t/request-context)).
- Statelessness isn't free: shared stores need to be fast and reliable, and tokens carry their own trade-offs (such as revocation).

Databases and caches are, by nature, stateful. Making the **application tier** stateless confines the hard problems to the layer that is designed to handle them.
