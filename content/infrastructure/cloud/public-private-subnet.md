---
title: "Public vs Private Subnet"
summary: "Subnets reachable from the internet vs only from inside."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["public subnet", "private subnet", "subnet routing"]
prereqs: ["vpc", "subnet"]
related: ["security-group", "load-balancer", "egress-costs", "ip-address"]
---

Inside a cloud [VPC](/t/vpc), a [subnet](/t/subnet) is a slice of the address range tied to one zone. What makes a subnet **public** or **private** is its routing: a public subnet has a route to an internet gateway, so resources in it can send and receive traffic from the internet; a private subnet has no such route and is reachable only from inside the network.

The usual layout puts the things that must face the internet in public subnets and everything else in private subnets:

```text
Internet ─▶ [ public subnet ]  load balancer, NAT gateway
                  │
                  ▼
             [ private subnet ]  app servers, databases
```

A [load balancer](/t/load-balancer) sits in the public subnet and forwards to app servers in private ones. Databases stay private, unreachable from the internet. Private resources that need outbound access (to fetch packages, call an API) route through a NAT gateway, which allows outgoing connections but not incoming ones.

The classic mistakes:

- Putting databases in public subnets. It exposes them to the internet and makes the [security group](/t/security-group) the only thing standing between an attacker and your data. Keep them private.
- Forgetting egress. A private subnet with no NAT gateway or other egress path can't reach the internet at all, so installs and external calls fail. That surprises people who only tested in a public subnet.
- Thinking "private" means secure by itself. A private subnet blocks direct internet access, but internal resources can still reach each other. Use security groups to limit that.

There's a cost angle too: traffic through a NAT gateway or across zones is billed, so a subnet design has real [egress cost](/t/egress-costs) implications. Keep chatty services in the same zone where you can, and route deliberately rather than by default.
