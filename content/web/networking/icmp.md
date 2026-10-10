---
title: "ICMP"
summary: "The protocol behind ping and many network error messages."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["icmp", "ping", "traceroute"]
prereqs: ["packet", "tcp"]
related: ["round-trip-time", "packet-capture", "firewall"]
---

**ICMP** (Internet Control Message Protocol) is how the network reports errors and diagnostics: "that host is unreachable," "this packet was too big," "echo this back to me." Its two famous tools are **ping** (echo request/reply — is the host alive, and how long is the round trip?) and **traceroute** (map the path by expiring packets at successive hops).

```text
ping:        echo request → echo reply     (alive? how slow?)
traceroute:  TTL=1 dies at hop 1, TTL=2 at hop 2…  (where does it stop?)
```

ICMP carries no application data — it's the network talking *about* traffic, not the traffic itself. That distinction explains both its usefulness and why it's frequently filtered.

The classic mistakes:

- "Ping works, so the service is up." Ping proves the host answers ICMP, not that your port is open or the app is healthy. A successful ping with a dead service is normal. Check the actual port and endpoint.
- "Ping fails, so the network is down." Many hosts and firewalls drop ICMP while passing TCP fine. A failed ping with a working service is equally normal.
- Reading too much into traceroute. Stars (`* * *`) mean a hop didn't answer *ICMP*, not that traffic stops there — and return paths differ from forward paths. It's a hint, not a proof.
- Blocking all ICMP. Dropping everything breaks path MTU discovery (the "packet too big, fragment" mechanism), causing mysterious hangs on large transfers. Filter selectively: allow the error types, rate-limit the rest.
- Using ping for latency SLAs. ICMP is often deprioritised relative to real traffic, so its timings can look worse (or better) than what users experience. Measure with the real protocol.
- Assuming it traverses everywhere. Some clouds and middleboxes handle ICMP oddly. When in doubt, test with TCP to the actual port.

**How to use it:** ping and traceroute are first-pass diagnostics — alive, roughly how far, where it stops. Confirm with the real protocol and port, allow the ICMP errors the network needs to function, and never treat an ICMP result as an application health verdict.
