---
title: "VPN"
summary: "An encrypted tunnel into another network."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["vpn", "virtual private network", "tunnel"]
prereqs: ["tls", "subnet"]
related: ["firewall", "private-ip", "zero-trust"]
---

A **VPN** connects a device or network to a private network over the internet through an encrypted tunnel. To your laptop it feels like being plugged into the office: private addresses resolve, internal services answer, traffic to those destinations is encrypted to the gateway. Site-to-site VPNs join whole networks; client VPNs attach individual devices.

```text
laptop ──encrypted tunnel──▶ office gateway ──▶ 10.x services (as if local)
```

The two jobs are confidentiality on untrusted paths and *access* to private space. Note what's shifted, not solved: the tunnel endpoint sees your traffic, DNS and routing need care (full-tunnel vs split-tunnel), and "on the VPN" is not an identity — it's a network location, and a weak basis for authorisation.

The classic mistakes:

- Treating VPN as authentication. Network membership says where packets come from, not who sent them or whether the device is healthy. Authorise users and devices, not addresses — the direction [zero trust](/t/zero-trust) pushes.
- Full-tunnel everything. Routing all traffic (including video calls and SaaS) through headquarters adds latency and a chokepoint. Split-tunnel private destinations, send the rest direct.
- DNS leaks and confusion. If DNS still goes to a public resolver, internal names fail and queries leak. The VPN must carry (or correctly split) DNS.
- Overlapping private ranges. Client and office both on `192.168.1.0/24` makes routing ambiguous and breaks access. Coordinate ranges in advance.
- Single gateway, no failover. One VPN concentrator is a single point of failure for remote work. Redundancy matters exactly when everyone is remote.
- Ignoring the endpoint's security. A VPN extends the private network to the device — including its malware. Device posture and per-service auth still matter.
- Using consumer VPN as threat model. Hiding traffic from local Wi-Fi is fine; it doesn't anonymise you or secure the far side. Match the tool to the actual threat.

**How to use it:** to reach private networks securely from outside, with split tunnelling, working DNS, non-overlapping ranges, and real authentication behind it. Increasingly, teams replace broad network access with per-service zero-trust access — the VPN remains, but scoped narrower than it used to be.
