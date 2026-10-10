---
title: "Pod Disruption Budget"
summary: "Limiting how many pods can be down during maintenance."
levels: { backend: senior, data-engineer: senior }
aliases: ["pod disruption budget", "PDB", "disruption budget"]
prereqs: ["k8s-deployment", "k8s-node"]
related: ["fault-tolerance", "k8s-probes", "statefulset", "capacity-planning", "kubernetes"]
---

A **PodDisruptionBudget (PDB)** limits how many pods of a workload can be unavailable at once during **voluntary disruptions** — planned actions such as draining a node for maintenance or an upgrade. It's a promise of availability during work you choose to do, and Kubernetes enforces it by refusing to evict pods that would break the budget.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata: { name: api-pdb }
spec:
  minAvailable: 2          # or maxUnavailable: 1
  selector:
    matchLabels: { app: api }
```

Before evicting pods to drain a node, Kubernetes checks each matching PDB. If eviction would leave fewer than `minAvailable` pods (or more than `maxUnavailable` gone), it waits. The drain proceeds as pods reschedule and become ready.

The classic mistakes:

- A budget that blocks all maintenance. `minAvailable` equal to the replica count (or `maxUnavailable: 0`) means no pod may ever be evicted — drains hang forever. Leave slack: with three replicas, allow one down at a time.
- No PDB at all. Without one, a drain can take out every replica at once, and a maintenance operation becomes an outage. Any multi-replica service should have a PDB.
- Confusing voluntary and involuntary disruptions. A PDB covers drains and upgrades, not a node crashing or a process being OOMKilled. Those aren't gated by the budget. Resilience to them needs replicas and health checks.
- A PDB with no controller. It selects pods by label; if a bare pod matches and has no controller, evicting it may not recreate it, and the budget can stall.

PDBs only make sense alongside real redundancy: multiple replicas, spread across nodes (see [node affinity and topology spread](/t/node-affinity)) and checked by [probes](/t/k8s-probes). Together they let you patch a node without turning maintenance into an incident — the same goal as [fault tolerance](/t/fault-tolerance) and careful [capacity planning](/t/capacity-planning).
