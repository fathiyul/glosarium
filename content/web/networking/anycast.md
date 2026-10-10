---
title: "Anycast"
summary: "One IP address served from many locations, sending users to the nearest."
levels: { backend: senior }
aliases: ["anycast", "anycast routing", "anycast ip"]
prereqs: ["bgp", "dns"]
related: ["bgp", "cdn", "routing"]
---

**Anycast** announces the *same* IP address from many locations; routing delivers each client to the topologically nearest one. One DNS address serves the world from dozens of points of presence — no client configuration, no GeoDNS logic, just BGP doing what it does.

```text
8.8.8.8 announced from Tokyo, Frankfurt, São Paulo…
client in Berlin → routed to Frankfurt (nearest by BGP)
```

It's how major DNS and CDN edges achieve global low latency with simple addresses. The catch is statelessness: consecutive packets from one client *usually* reach the same site, but routing changes can shift mid-flow — so anycast suits stateless or quickly-recoverable protocols (DNS/UDP, short HTTPS with retry) and complicates long-lived stateful connections.

The classic mistakes:

- Stateful assumptions. TCP usually stays put, but a route flap mid-connection resets it. Keep connections short or make services stateless behind anycast; don't run long-lived stateful protocols on it naively.
- Debugging by address. The same IP is many machines — "I can't reach 8.8.8.8" means nothing without *which instance* and *which path*. Trace from the affected location.
- Assuming geographic nearest. BGP "nearest" is topological (AS hops, policy), not geographic. Traffic sometimes lands surprisingly far; that's normal, not broken.
- One anycast address for everything. Management, stateful APIs and bulk transfer each want different routing. Anycast the stateless edge; unicast the rest.
- DDoS absorption assumptions. Anycast spreads floods across sites — a real benefit — but a flood bigger than total edge capacity still saturates. It's mitigation, not immunity.
- Forgetting withdrawal. Taking a site out of anycast (maintenance) shifts its traffic to neighbours, which must have headroom. Drain with capacity in mind.

**When to use it:** stateless global edges — DNS, CDN front doors, DDoS-absorbing endpoints. Pair with stateless service design and per-site capacity headroom, and debug by path, not by address.
