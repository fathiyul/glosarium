---
title: "Routing"
summary: "How packets find their way across networks."
levels: { backend: senior, data-engineer: senior }
aliases: ["routing", "ip routing", "route table"]
prereqs: ["subnet", "nat"]
related: ["bgp", "vpn", "subnet"]
---

**Routing** decides, per packet, the next hop toward its destination: each router consults its table, matches the destination against prefixes (**longest-prefix match** wins — the most specific route), and forwards. Tables fill from directly-connected networks, static entries, and dynamic protocols (OSPF/IS-IS inside, BGP between organisations).

```text
10.0.4.27 → table: 10.0.4.0/24 direct ✓ (most specific)
          → 10.0.0.0/16 via peer   (less specific, ignored)
          → 0.0.0.0/0 via gateway  (default, last resort)
```

Everything complex — VPNs, peering, multi-AZ, failover — is routes plus policy. Asymmetric paths (out one way, back another) are normal and fine, until stateful devices or debugging assume symmetry.

The classic mistakes:

- Missing return route. Traffic arrives but replies have no path back — the classic one-way connectivity that looks like a firewall. Routes must exist in both directions (not necessarily symmetric, but existent).
- Overlapping prefixes. Two routes covering the same space resolve by longest match, which may not be the intent. Audit overlaps after every peering change.
- Default route as design. A `0.0.0.0/0` pointing somewhere convenient hides missing specific routes until that somewhere changes. Explicit routes for important destinations.
- Assuming symmetry. Stateful firewalls and NATs on asymmetric paths drop legitimate flows. Design for asymmetry or enforce symmetric paths deliberately.
- Static routes that rot. A hand-added route surviving its rationale redirects traffic wrongly for months. Prefer dynamic protocols; document and expire statics.
- Ignoring route propagation. VPC peering, VPN and transit attachments must *propagate* routes to be useful — attached but unpropagated is disconnected with extra steps.
- Blackholes without monitoring. Null routes for DDoS mitigation work until they swallow legitimate traffic. Monitor and time-box them.

**The discipline:** longest-match logic, both-directions thinking, dynamic over static, and propagation verified — not just attached. Routing is simple rules at scale; outages come from the rules nobody re-checked.
