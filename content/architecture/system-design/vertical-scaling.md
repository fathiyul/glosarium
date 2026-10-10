---
title: "Vertical Scaling"
summary: "Scaling up with a bigger machine."
levels: { backend: junior, data-engineer: junior }
aliases: ["scaling up", "scale up"]
prereqs: ["server"]
related: ["horizontal-scaling", "load-balancer", "latency", "backups"]
---

Vertical scaling means handling more load by giving one machine more resources: more CPU, more memory or faster disks. It's also called scaling up. It needs no change to the application, which is why it's the simplest first step.

Illustratively, a machine goes from a small size to a larger one, with the same code and the same architecture:

```
Before: small instance   -> resize the instance
After:  larger instance  (same code, same architecture)
```

The limits are practical ones. A single machine has a maximum size, the cost per unit of capacity often rises at the top end, and the machine remains a single point of failure. Some resizes also need a restart, which means downtime, so check what your provider requires.

The classic mistake is resizing before finding the bottleneck. If the slowdown is a missing database index or a query running in a loop, a bigger machine only hides it, and the cost keeps growing. Profile first, then decide. When one machine is no longer enough, [horizontal scaling](/t/horizontal-scaling) across several machines is usually the next step, which is covered by the [load balancer](/t/load-balancer) concept.
