---
title: "BGP"
summary: "The protocol that routes traffic between the internet's networks."
levels: { backend: principal }
aliases: ["bgp", "border gateway protocol", "internet routing"]
prereqs: ["routing", "anycast"]
related: ["routing", "anycast", "dns"]
---

**BGP** (Border Gateway Protocol) is how autonomous systems — ISPs, clouds, large networks — exchange reachability and choose inter-domain paths. Routers advertise prefixes ("I can reach these addresses"), attach AS-path and policy attributes, and each network picks best paths by local policy — not by any global optimum. The internet's routing table is the sum of these local decisions.

```text
AS64500: "10.0.0.0/8 via 64500 64600" → neighbours apply policy → propagate or not
```

BGP's properties follow from trust-plus-policy: it converges slowly (minutes), trusts announcements by default, and optimises for policy (business relationships, traffic engineering) over performance. Its famous failure is the **route hijack** — accidental or malicious announcement of someone else's prefixes, diverting their traffic — mitigated by RPKI origin validation and filtering, unevenly deployed.

The classic mistakes:

- Treating BGP as fast failover. Convergence takes minutes and flaps propagate globally. Sub-minute recovery needs mechanisms above BGP (anycast + health checks, DNS agility) — not BGP itself.
- No prefix filters. Accepting full tables from peers without filtering invites hijacks and leaks. Filter customer announcements to their allocations; deploy RPKI validation.
- Leaking internal routes. Redistributing internal prefixes outward (or full tables inward) breaks neighbours and yourself. Export only what's meant to be global.
- Assuming shortest-path. BGP prefers policy-compliant paths; traffic engineering (prepends, communities, MED) deliberately steers away from "shortest." Geography and hop-count predict poorly.
- Single-homing critical prefixes. One upstream is one failure domain for your global reachability. Multi-home important prefixes across diverse providers.
- Ignoring convergence during changes. Maintenance that withdraws and re-announces shifts traffic globally with delays and flaps. Announce deliberately; watch propagation.
- Confusing it with availability. BGP keeps the map roughly right; actual failover speed comes from health-checked anycast, load balancers and application retries.

**What to know:** BGP is policy-based, slow-converging, trust-dependent glue — powerful for global reachability, the wrong tool for fast failover. Filter, validate (RPKI), multi-home, and build recovery speed in the layers above.
