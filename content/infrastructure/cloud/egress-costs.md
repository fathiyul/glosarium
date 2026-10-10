---
title: "Egress Costs"
summary: "Paying for data leaving the cloud."
levels: { backend: senior, data-engineer: senior }
aliases: ["egress costs", "data transfer costs", "egress fees"]
prereqs: ["cloud-computing", "finops"]
related: ["cdn", "regions-azs", "object-storage", "latency", "cloud-providers"]
---

**Egress** is data leaving a cloud provider's network. Many providers charge little or nothing for data coming *in* (**ingress**) and for traffic staying inside a region, but bill for data going out to the internet — and often for traffic crossing between regions or between availability zones. The exact rules differ by provider, but the pattern is common: movement costs money, and some directions cost more than others.

That asymmetry shapes architecture more than people expect. A service that pulls a large dataset out of [object storage](/t/object-storage) to another provider every hour pays for it continuously. Two chatty services in different zones pay for every call. Serving images straight from an origin instead of a [CDN](/t/cdn) puts all that traffic on the egress meter.

```text
ingress        → usually free or cheap
same zone      → often free
cross-zone     → billed
cross-region   → billed more
internet out   → billed, the classic cost
```

The classic mistakes:

- Chatty cross-zone traffic. Microservices split across zones, or an app in one zone and its database in another, rack up inter-zone transfer on every request. Co-locate components that talk constantly.
- No CDN for static content. Images, JS and video sent from your origin to every user are pure egress. A [CDN](/t/cdn) caches them near users and absorbs most of it.
- Replicating large data across regions needlessly. Cross-region replication has a latency purpose and a cost; use it where it earns its keep, not by default.
- Assuming symmetry. Teams budget for "bandwidth" as one number and are surprised that *out* costs many times more than *in*. Model the directions separately.
- Forgetting egress in the design. It's easy to optimize compute and storage while the bill is dominated by data transfer.

Egress is a core input to [FinOps](/t/finops) and often the reason to keep processing near the data. Treat data movement as a first-class design decision — where data lives and how often it moves — rather than an afterthought discovered on the invoice.
