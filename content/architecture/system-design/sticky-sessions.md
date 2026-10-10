---
title: "Sticky Sessions"
summary: "Routing a user to the same server every time."
levels: { backend: mid-level }
aliases: ["sticky sessions", "session affinity", "session stickiness"]
prereqs: ["load-balancer", "stateless-service"]
related: ["load-balancer", "stateless-service", "failover"]
---
**Sticky sessions** (session affinity) pin a client to one backend server — usually by cookie or IP hash — so in-memory session state survives across that client's requests. It's the shortcut around stateless design: instead of externalising sessions, routing guarantees the user keeps meeting the server that remembers them.

```text
cookie "server=A" → LB always routes this client to server A (which holds state)
```

The shortcut mortgages resilience and elasticity: server A dying loses its users' sessions; new servers receive no existing users (uneven warm-up); draining for deploys must wait out sessions. What statelessness solves structurally, stickiness postpones expensively.

The classic mistakes:

- Sticky as architecture. Affinity covering for server-local state makes every scaling event and every failure a session-loss event. Externalise sessions (cache/store) and drop stickiness.
- Uneven load. Hash skew and long-lived clients pile onto few servers while others idle. Monitor per-server load; affinity defeats naive balancing assumptions.
- IP-hash fragility. Carrier NAT and VPNs multiplex thousands behind one IP (overloading one server) while mobile clients roam IPs (losing affinity constantly). Cookie-based beats IP-based.
- Draining pain. Deploys must linger until sessions expire or users get logged out mid-flow. External state makes deploys instant; stickiness makes them negotiated.
- Failover amnesia. Standbys receiving failed-over sticky users have none of their state. Either replicate sessions (costly) or accept the loss (honest) — affinity alone is neither.
- Debugging misdirection. "Works for me" that follows users across servers but not across browsers is affinity masking a state bug. Suspect stickiness when symptoms stick to clients.

**The verdict:** a migration aid, not a design. Use briefly while externalising state; delete when sessions live outside servers. Affinity is technical debt with a load balancer as collateral.
