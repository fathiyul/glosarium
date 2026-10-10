---
title: "VPC"
summary: "A private network in the cloud."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["virtual private cloud", "vnet", "virtual network"]
prereqs: ["cloud-computing", "subnet"]
related: ["public-private-subnet", "security-group", "ip-address", "regions-azs", "cloud-providers"]
---

A **VPC** (virtual private cloud) is a private network you define inside a cloud provider. It has its own address range, split into [subnets](/t/subnet), plus routing, gateways and access rules. You launch resources — servers, databases, load balancers — into it, and it controls how they reach each other and the internet. AWS calls it a VPC, Google Cloud a VPC network, Azure a virtual network; the idea is the same.

```text
VPC 10.0.0.0/16
 ├── subnet 10.0.1.0/24   (zone a)
 └── subnet 10.0.2.0/24   (zone b)
```

The classic mistake is assuming a VPC is secure by default. It's a network boundary, not a firewall. Resources inside can usually reach each other unless you restrict them, and a subnet with a route to the internet is reachable from it. Add [security groups](/t/security-group) and a deliberate [public/private subnet](/t/public-private-subnet) layout.

Two more traps:

- **Address planning.** The range you pick is hard to change once resources use it. Choose a generous block and leave room to grow; overlapping ranges make it painful to connect networks later.
- **The default VPC.** Many accounts have one with permissive defaults. It works, so people build in it, and later find it doesn't match the intended network design.

Key pieces you'll configure: subnets and their routes, an internet gateway for public access, a NAT gateway for outbound-only access from private subnets, and DNS settings. To connect VPCs to each other or to your office, use peering or a [VPN](/t/vpn). See [IP addressing](/t/ip-address), [regions and zones](/t/regions-azs), and how providers differ in [cloud providers](/t/cloud-providers).
