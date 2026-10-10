---
title: "IPv4 vs IPv6"
summary: "32-bit vs 128-bit addresses, and why IPv6 exists."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["ipv4", "ipv6", "ipv4 vs ipv6"]
prereqs: ["subnet", "nat"]
related: ["dns-record-types", "private-ip", "vpn"]
---

**IPv4** addresses are 32-bit numbers (`93.184.216.34`) — about 4 billion of them, long since exhausted. **IPv6** addresses are 128-bit (`2606:2800:220:1:248:1893:25c8:1946`), effectively inexhaustible. The migration matters because IPv4 scarcity shaped the modern internet: NAT, address markets, and shared addresses all exist to stretch a pool that ran out.

```text
IPv4:  32 bits → ~4.3 billion addresses (exhausted; NAT stretches them)
IPv6: 128 bits → effectively unlimited (every device can have public addresses)
```

Practically, the two stacks coexist. DNS carries both (A records for v4, AAAA for v6), clients try IPv6 first and fall back (Happy Eyeballs), and most infrastructure must serve both for years. IPv6 also restores end-to-end addressability: no NAT required, every host routable — which changes firewall thinking from "hidden by NAT" to "explicitly filtered."

The classic mistakes:

- Assuming NAT is security. NAT hides internal addresses as a side effect; it is not access control. IPv6 removes the hiding, which only exposes rules that were never real security. Filter explicitly either way.
- Forgetting AAAA records. Serving IPv6 clients requires AAAA records and v6-capable origins. An IPv6-only client reaching a v4-only name simply fails.
- Hard-coding address assumptions. Parsing, validating, or storing IPs as "four dot-separated numbers" breaks on IPv6. Use proper address types everywhere, including logs and rate limiters.
- String-comparing IPv6. The same address has many textual forms (compression, case). Compare parsed addresses, never strings.
- Ignoring v6 in firewall rules. A v4-only firewall policy leaves the v6 path wide open on dual-stack hosts. Rule both stacks.
- Disabling IPv6 to "simplify." It papers over misconfiguration and breaks modern clients and features. Run dual-stack and fix the actual problem.

**How to handle it:** support both stacks end to end (DNS, servers, firewalls, application parsing), treat NAT as conservation rather than protection, and write all address handling with proper types. The migration is a decades-long coexistence, not a flag day.
