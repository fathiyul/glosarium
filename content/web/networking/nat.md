---
title: "NAT"
summary: "Many private addresses sharing one public IP."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["nat", "network address translation", "masquerading"]
prereqs: ["subnet", "tcp"]
related: ["private-ip", "firewall", "vpn"]
---

**NAT** (Network Address Translation) lets many devices with private addresses share one public IP. The NAT gateway rewrites source addresses (and ports) on outbound packets and reverses the mapping on replies, tracking each flow in a state table. Your office, your home, and most of IPv4 cloud networking rely on it.

```text
10.0.1.5:4321 ──▶ NAT rewrites to 203.0.113.7:61001 ──▶ internet
reply to 203.0.113.7:61001 ──▶ NAT maps back to 10.0.1.5:4321
```

Port-based (PAT) multiplexing is what lets thousands of flows share one address: the port number disambiguates. Inbound connections need explicit port forwarding, because the gateway otherwise has no mapping for unsolicited arrivals.

The classic mistakes:

- Assuming NAT is a firewall. It blocks unsolicited inbound by *accident of having no mapping*, not by policy. Outbound-initiated attacks, malicious replies, and mis-forwarded ports all pass. Filter explicitly.
- Forgetting the state table has limits. Each flow consumes an entry; aggressive connection churn (no pooling, no keep-alive) can exhaust the gateway's table or ephemeral ports, producing bizarre intermittent failures.
- Protocols that embed addresses. FTP's data connections and some VoIP protocols carry IPs inside the payload, which plain NAT doesn't rewrite — the classic "works locally, breaks through NAT" bug. Helpers (ALGs) or better protocols fix it.
- Double NAT. Stacked gateways (ISP box plus your router) complicate port forwarding and diagnostics. Eliminate a layer where you can.
- Assuming the source IP identifies a user. Behind carrier-grade NAT, thousands of users share one public address. Never treat IP as identity; rate-limit carefully.
- Ignoring it in container and cloud networks. Overlays, SNAT for egress, and IP exhaustion all surface as NAT behaviour. "Reaches some hosts but not others" often lives here.

**How to think about it:** NAT is address conservation with connection-tracking side effects — essential for IPv4, invisible until its table, ports, or mappings become the bottleneck. Design with pooling and keep-alive to be gentle on it, and never confuse it with security.
