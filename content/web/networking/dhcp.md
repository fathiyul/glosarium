---
title: "DHCP"
summary: "How devices get an IP address automatically when they join a network."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["DHCP", "dynamic host configuration protocol", "dhcp lease"]
prereqs: ["subnet", "dns"]
related: ["private-ip", "nat", "dns-record-types"]
---

**DHCP** (Dynamic Host Configuration Protocol) is how a device joining a network automatically receives its IP address, subnet mask, gateway and DNS servers — instead of someone configuring each device by hand. Your laptop on office Wi-Fi, a VM booting in the cloud, a container starting up: all typically get their network identity from DHCP.

The exchange is a short broadcast conversation — discover, offer, request, acknowledge — and the address comes as a **lease**: valid for a period, renewed periodically, and reclaimable when the device leaves.

```text
device: "who am I?" → DHCP server: "you're 10.0.4.27, gateway 10.0.4.1, DNS 10.0.0.2"
```

Why it matters to backend engineers: cloud instances, containers and office networks all depend on it, and "no network" on a fresh machine is often a DHCP failure. Servers that must keep a stable address use a static assignment or a DHCP reservation instead.

The classic mistakes:

- Assuming a server's IP is stable. A DHCP-assigned address can change across reboots unless reserved. Never hard-code a DHCP address into configs or firewall rules; use names or reservations.
- No reservation for infrastructure. Anything others depend on — a database, an internal service — should have a static IP or a DHCP reservation so its address doesn't drift.
- Ignoring lease expiry. A device that can't renew loses its address. Short leases on unstable networks cause flapping; misconfigured lease times cause mysterious drops.
- Rogue DHCP servers. An unauthorised DHCP server on the network hands out wrong gateways or DNS, redirecting traffic. It's a real attack and a common accident (someone plugs in a home router).
- Confusing it with DNS. DHCP assigns the device's *own* address; [DNS](/t/dns) resolves *other* names to addresses. Both must work for anything to connect.
- Forgetting it in containers and VMs. Virtual networks run their own DHCP (or equivalent IPAM); "container has no network" is frequently an IPAM/DHCP-range problem, not your code.

**How to think about it:** DHCP is the network's onboarding desk — automatic, leased, renewable. Fine for clients and ephemeral workloads; infrastructure that others address needs the stability of a static assignment or reservation.
