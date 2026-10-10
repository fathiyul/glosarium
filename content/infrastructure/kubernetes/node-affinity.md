---
title: "Node Affinity and Topology Spread"
summary: "Controlling which nodes pods run on and how they spread out."
levels: { backend: senior, data-engineer: senior }
aliases: ["node affinity", "node selector", "topology spread"]
prereqs: ["k8s-node", "pod"]
related: ["taints-tolerations", "fault-tolerance", "capacity-planning", "requests-limits", "kubernetes"]
---

By default the Kubernetes [scheduler](/t/control-plane) places each [pod](/t/pod) on any [node](/t/k8s-node) with enough room. Often that's fine. Sometimes you need to steer it: keep GPU work on GPU nodes, keep pods close to each other for latency, or spread replicas so one node failure can't take them all down. That's what placement rules are for.

- **nodeSelector** — the simplest form: run only on nodes with these labels.
- Node affinity — a richer version, with `required` rules (hard) and `preferred` rules (soft, a score rather than a filter).
- Pod affinity / anti-affinity — place pods relative to *other pods*: near the ones they talk to, away from copies of themselves.
- Topology spread constraints — spread pods evenly across zones or nodes, so replicas don't bunch up.

```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - { key: accelerator, operator: In, values: [gpu] }
```

The classic mistakes:

- Over-constraining. A strict rule with no node satisfying it leaves the pod permanently `Pending`. Combine hard and soft rules carefully, and make sure enough nodes match.
- Confusing affinity with taints. Affinity *attracts* pods to nodes; [taints](/t/taints-tolerations) *repel* pods from nodes. They're often used together but solve opposite problems.
- Forgetting to spread for availability. Three replicas that all land on one node all die together. Use anti-affinity or topology spread to keep them on different nodes (and zones), which is the basis of [fault tolerance](/t/fault-tolerance).
- Specific node names. Pinning pods to a node by name is brittle; nodes are replaced. Use labels so replacements still match.

**When not to use it:** for a homogeneous cluster with simple workloads, the default scheduler is fine and these rules just add complexity. Reach for them when hardware differs, latency matters, or availability requires deliberate spread — together with realistic [requests and limits](/t/requests-limits).
