---
title: "Do You Need Kubernetes?"
summary: "Weighing its power against its operational cost."
levels: { backend: staff, data-engineer: staff }
aliases: ["do you need kubernetes", "kubernetes alternatives", "when to use kubernetes"]
prereqs: ["kubernetes", "container-orchestration"]
related: ["managed-kubernetes", "docker-compose", "paas-platforms", "server", "capacity-planning"]
---

The honest answer is often "not yet". Kubernetes is a powerful **container orchestration** platform — scheduling, self-healing, rolling updates, scaling, service discovery — and it's the default for large systems. But it brings real **operational cost**: a large API surface, networking and storage layers to learn, upgrades to manage, and a cluster to keep healthy. For a small team or a few services, that cost can dwarf the benefit.

The question is what you actually need:

```text
one app, one server        → a server or a PaaS, not Kubernetes
a few containers, one host  → Docker Compose or a simple runner
many services, many teams,
auto-scaling, zero downtime → Kubernetes starts to pay off
```

Reach for Kubernetes when *at least* one of these is true: you run many services or teams on shared infrastructure; you need automated scaling and self-healing; you need rolling deploys and resilience across nodes; or you have outgrown manual operations and the toil is real (see [toil](/t/toil)). If none apply, something simpler will serve you better.

The classic mistakes:

- Adopting it for the résumé. Kubernetes skills are valuable, but choosing it as architecture to learn it, on a production system, exports the cost to your team and users.
- Underestimating the operations. The control plane, upgrades, networking, storage and security are ongoing work. A [managed Kubernetes](/t/managed-kubernetes) removes some, not all.
- Ignoring the middle ground. [Platforms-as-a-service](/t/paas-platforms), container services that run one container, or a plain [server](/t/server) with a process manager cover many needs with far less overhead.
- Skipping to Kubernetes before there's a problem. If a single [Docker Compose](/t/docker-compose) setup handles your load, adopting Kubernetes now adds complexity you can't yet justify.

**How to decide:** start with the simplest thing that meets your reliability and scaling needs, and let a concrete limit — not ambition — push you up. A single server, then a managed container service, then Kubernetes is a common and sensible path. Kubernetes is the right answer for scale and coordination; it's overkill for a handful of apps that one team can run by hand.
