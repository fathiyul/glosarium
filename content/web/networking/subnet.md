---
title: "Subnet and CIDR"
summary: "Dividing IP ranges, written like 10.0.0.0/16."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["subnet", "cidr", "subnetting"]
prereqs: ["private-ip", "nat"]
related: ["vpn", "firewall", "routing"]
---

A **subnet** is a slice of an address range treated as one network, written in **CIDR** notation: `10.0.4.0/24` means "the first 24 bits are the network, the rest are hosts" — 256 addresses, `10.0.4.0`–`10.0.4.255`. Subnets are how you structure addressing: one per tier per availability zone, each with its own routing and firewall rules.

```text
10.0.0.0/16  VPC
  10.0.1.0/24  public subnet (load balancers)
  10.0.2.0/24  app subnet (servers)
  10.0.3.0/24  data subnet (databases, no internet route)
```

The prefix length sets the size (`/24` = 256, `/20` = 4096, `/16` = 65k), with a few addresses always reserved (network, broadcast, gateway). Routing then decides what each subnet can reach: a subnet without a route to an internet gateway simply has no internet, which is exactly how you isolate a data tier.

The classic mistakes:

- Subnets too small. A `/28` (16 addresses) for an auto-scaling tier exhausts with a handful of instances. Size for growth; addresses are cheap, renumbering is not.
- Subnets too big and flat. One `/16` for everything means no isolation between tiers. Small, purposeful subnets per tier and AZ.
- Overlapping with peers. The range must not collide with anything you'll peer or VPN with — plan globally, not per project.
- Forgetting reserved addresses. Cloud providers reserve several addresses per subnet; a "256-address" subnet holds fewer hosts than the math suggests.
- Routing after addressing. Carving subnets without deciding routes (who reaches the internet, who reaches whom) produces either isolation that breaks the app or connectivity that breaks the security model. Address and route together.
- Hard-coding subnet assumptions. Code and configs that assume "the database is at .5" rot. Use names and service discovery.

**How to use them:** one private range per environment, subnets per tier per AZ, routing that matches the security intent. Subnetting is the floor plan of your network — get it right once and everything else (firewalls, routes, peering) has somewhere sensible to attach.
