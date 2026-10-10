---
title: "Single Point of Failure"
summary: "One component whose failure takes everything down."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["single point of failure", "SPOF", "single points of failure"]
prereqs: ["redundancy", "availability"]
related: ["redundancy", "failover", "blast-radius"]
---
A **single point of failure (SPOF)** is any component whose failure takes the system down: one database, one load balancer, one DNS provider, one deploy pipeline, one engineer who knows the passwords. Reliability work starts by enumerating them — because every unexamined architecture hides several, usually where nobody looked (that one cron host, that shared NFS mount, that human).

```text
find: trace every request path → which components appear in ALL paths?
kill: what happens if each dies? (test, don't theorise)
fix:   duplicate, degrade, or accept-with-eyes-open
```

Not every SPOF gets fixed — some are accepted deliberately (cost, physics, scope) — but accepted SPOFs are documented, monitored and mitigated (fast repair, degradation plans), never merely undiscovered.

The classic mistakes:

- Obvious-duplicate blindness. Databases replicated while the single load balancer, single DNS, single region or single human stays singular. Map *all* paths, including operations and people.
- Shared fate mistaken for redundancy. Two servers, one power feed / switch / AZ — correlated failures kill both. Redundancy spans failure domains or it isn't.
- "Highly available" components assumed immortal. Managed services fail too (regionally, durably). Multi-AZ still shares the provider; plan for provider-level degradation.
- Undocumented accepted SPOFs. "We'll fix it later" without a record becomes permanent invisible risk. Log accepted SPOFs with owners and revisit dates.
- Testing components, not paths. Individual redundancy verified while end-to-end paths stay single (that one firewall rule, that shared secret). Test path failure, not box failure.
- People SPOFs ignored. Bus factor one on critical systems is the most common SPOF and the least addressed. Cross-train, document, automate — people redundancy is real redundancy.
- Fixing by duplication alone. Some SPOFs fix better by removal (stateless design) or degradation (serve stale) than by mirroring. Duplicate, degrade, or delete.

**The practice:** enumerate ruthlessly, fix by domain-spanning redundancy or designed degradation, document what remains. Every outage is a SPOF discovered late — discover them early instead.
