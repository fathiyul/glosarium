---
title: "Firewall"
summary: "Rules that allow or block network traffic."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["firewall", "firewalls", "network firewall"]
prereqs: ["tcp", "subnet"]
related: ["nat", "vpn", "private-ip"]
---

A **firewall** controls which network traffic may pass, based on rules over source and destination addresses, ports and protocols. The default posture that keeps people safe is deny-by-default with an **allowlist**: block everything, then open exactly what's needed — port 443 from the internet to the load balancer, port 5432 only from the app subnet to the database, SSH only from the office range.

```text
internet ──▶ allow 443 to web tier; deny everything else
app tier ──▶ allow 5432 to db tier; deny everything else
```

Firewalls operate at layers: packet filters (addresses and ports), stateful filters (which remember established connections so replies pass), and application-layer gateways. A WAF (web application firewall) is a different animal — it inspects HTTP content for attack patterns rather than deciding which connections may exist.

The classic mistakes:

- Allowlisting too broadly. "Allow 0.0.0.0/0 to the database because the app couldn't connect" fixes the symptom and removes the protection. Find the real source range instead.
- Relying on obscurity. A non-standard port with no firewall rule is still reachable; port choice is not access control.
- Forgetting outbound rules. Firewalls filter both directions. An app that can't reach a third-party API, fetch updates, or resolve DNS is often blocked on egress, not ingress.
- Stateful assumptions on stateless rules. Cloud security groups are stateful (replies allowed automatically); raw stateless rules need explicit return-path entries. Knowing which you're writing matters.
- No logging on denies. Dropped packets without logs turn every connectivity problem into guesswork. Log denies while debugging, and keep sampled logs generally.
- Confusing firewall with encryption or auth. A firewall decides *who may attempt* a connection; it doesn't encrypt anything or verify identity. Defence in depth needs all three.
- Rule sprawl. Years of append-only rules nobody dares remove eventually allow things nobody remembers. Review rules periodically.

**How to use it:** deny by default, allowlist the minimum each tier needs, keep databases and internal services off the internet entirely, and treat the rules as code to review. It's the network's front door — simple, effective, and no substitute for authentication and encryption behind it.
