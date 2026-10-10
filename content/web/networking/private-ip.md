---
title: "Private IP Ranges"
summary: "Address blocks reserved for internal networks."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["private ip", "private address space", "rfc1918"]
prereqs: ["subnet", "nat"]
related: ["nat", "vpn", "firewall"]
---

Certain address blocks are reserved for **private** use — never routed on the public internet — so every organisation can reuse them internally:

- `10.0.0.0/8` — the big one (16 million addresses), common in enterprises and clouds.
- `172.16.0.0/12` — the middle one, Docker's default playground.
- `192.168.0.0/16` — the small one, home and office networks.

```text
private:  10.4.2.7, 172.16.9.1, 192.168.1.50   (reusable everywhere inside)
public:   203.0.113.7                           (globally unique, via NAT)
```

Devices with private addresses reach the internet through [NAT](/t/nat), and reach each other directly within (or across, via VPN/peering) private space. Cloud VPCs, containers and office LANs are all built from these ranges.

The classic mistakes:

- Overlapping ranges. Two networks both using `10.0.0.0/8` can't be peered or VPN-joined without renumbering pain. Plan distinct ranges per environment from the start.
- Using the whole `/8` everywhere. One giant flat range removes all structure for routing, firewalling and growth. Carve subnets per tier and AZ (see [subnet](/t/subnet)).
- Running out in Docker/Kubernetes. Default private pools exhaust with enough containers; a cluster that "can't schedule networking" is often out of addresses. Size pools deliberately.
- Exposing private addresses publicly. Leaking `192.168.x.x` in URLs, redirects or DNS breaks external clients and reveals topology. Never emit internal addresses outward.
- Assuming private means safe. Everything inside still needs authentication, encryption and firewall rules. Private addressing is organisation, not protection.
- Forgetting IPv6 has its own. Unique local addresses (`fc00::/7`) play the same role in v6. Dual-stack networks need both planned.

**How to use them:** pick non-overlapping private ranges per environment, subnet them by tier, route between them with peering or VPN, and exit to the internet via NAT. Boring, planned addressing prevents an entire class of "can't connect" incidents.
