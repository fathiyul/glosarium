---
title: "Security Group"
summary: "A virtual firewall around cloud resources."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["aws security group", "cloud firewall", "firewall rules"]
prereqs: ["vpc", "cloud-computing"]
related: ["public-private-subnet", "port", "ip-address", "server-hardening", "load-balancer"]
---

A **security group** is a virtual, **stateful** firewall attached to cloud resources — for example compute instances or load balancers. You write rules that allow or deny traffic by protocol, [port](/t/port) and source (an IP range or another security group), and the platform enforces them for that resource. AWS security groups, Google Cloud firewall rules and Azure network security groups are all this idea.

```text
Inbound:
  allow tcp 443 from 0.0.0.0/0        # HTTPS from anywhere
  allow tcp 22  from 10.0.0.0/8       # SSH only from the internal range
Outbound:
  allow all
```

Being *stateful* means the platform remembers connections: if inbound traffic is allowed, the reply is allowed out automatically, so you don't write matching rules both ways.

The classic mistake is opening a sensitive port to the world. `0.0.0.0/0` on SSH (22/3389) or a database (3306/5432) puts a login prompt in front of every attacker on the internet; it's a leading cause of compromised cloud servers. Restrict management and database ports to known ranges or, better, use a bastion or private access rather than exposing them.

More traps:

- Treating the security group as the only layer. It should work with a private [subnet](/t/public-private-subnet), TLS, and patched software — defence in depth, as in [server hardening](/t/server-hardening).
- Confusing it with a network ACL. Subnet-level lists (NACLs) are a separate, stateless mechanism; security groups attach to resources.
- Referencing wide ranges out of habit. Prefer pointing a rule at another security group so only that group's members can connect, rather than a whole CIDR block.

Security groups are allow-lists: by default nothing is open unless you say so. Keep them that way, review them the way you review [IAM policies](/t/iam-policy), and remove rules that aren't still needed.
