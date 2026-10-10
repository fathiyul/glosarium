---
title: "ARP"
summary: "Finding the hardware address behind an IP on a local network."
levels: { backend: senior }
aliases: ["arp", "address resolution protocol", "arp table"]
prereqs: ["subnet", "packet"]
related: ["subnet", "private-ip", "packet-capture"]
---

**ARP** (Address Resolution Protocol) answers "who has this IP?" on a local segment: a device broadcasts the question, the owner replies with its MAC address, and everyone caches the mapping. It's the glue between layer-3 addressing (IPs) and layer-2 delivery (Ethernet frames) — invisible until it breaks or is attacked.

```text
who has 10.0.1.7?  → (broadcast)
I do: aa:bb:cc:dd:ee:ff  → (cached in the ARP table)
```

Normal operation is automatic and cached. The failure modes are staleness (a device changes address and peers remember the old MAC) and spoofing: ARP has no authentication, so anyone on the segment can *claim* any address — the basis of man-in-the-middle on LANs.

The classic mistakes:

- Ignoring ARP in "can't reach" cases. Duplicate IPs, stale entries after a VM migrates, or a full ARP table all present as intermittent local failures. Check the ARP table before blaming routing.
- ARP spoofing blindness. On untrusted LANs (public Wi-Fi, shared segments), assume interception is possible; mutual TLS and VPNs protect regardless of who answers ARP.
- Static entries as policy. Hard-coding ARP entries "for security" is brittle operations theatre — it breaks legitimate changes while barely slowing attackers. Use real segmentation and encryption.
- Proxy ARP surprises. A device answering ARP for addresses it doesn't own (proxy ARP) masks misconfigured subnet masks and gateways — convenient, confusing, and a debugging trap.
- Gratuitous ARP reliance. Failover mechanisms announce new mappings with gratuitous ARP; switches and caches that ignore it blackhole traffic after failover. Verify propagation, don't assume it.
- Forgetting IPv6 differs. IPv6 replaces ARP with Neighbor Discovery (NDP) — same job, different protocol, different attacks (rogue RAs). Don't apply ARP knowledge blindly.

**How to treat it:** automatic infrastructure with an unauthenticated trust model. Keep segments clean, expect spoofing on hostile LANs, and encrypt above it so a lied-about MAC buys an attacker nothing.
