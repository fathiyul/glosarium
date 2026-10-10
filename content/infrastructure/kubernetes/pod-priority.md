---
title: "Pod Priority and Preemption"
summary: "Evicting less important pods to make room for important ones."
levels: { backend: senior, data-engineer: senior }
aliases: ["pod priority", "priority class", "preemption"]
prereqs: ["kubernetes", "scheduler"]
related: ["pod-disruption-budget", "requests-limits", "resource-quota", "capacity-planning", "k8s-node"]
---

**Pod priority** tells the [scheduler](/t/control-plane) which pods matter more when resources are scarce. You define a **PriorityClass** with a priority value, and assign it to pods. Higher-priority pods are scheduled ahead of lower ones, and — the sharper part — they can trigger **preemption**: if a high-priority pod can't fit, the scheduler may evict lower-priority pods to make room.

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata: { name: critical }
value: 100000
globalDefault: false
description: "Critical services"
```

```yaml
spec:
  priorityClassName: critical
  containers: [ ... ]
```

The classic mistakes:

- Making everything high priority. If every pod is "critical", priority distinguishes nothing. Use it for the few workloads that genuinely must win — core APIs, essential system components — not for the whole cluster.
- Forgetting preemption's side effects. A high-priority pod arriving can evict a lower-priority one that was serving traffic. That's the point, but it means a "safe" low-priority service can lose pods unexpectedly. Combine priority with [PodDisruptionBudgets](/t/pod-disruption-budget) and enough replicas so eviction doesn't break it.
- Assuming it reserves capacity. Priority only ranks contention; it doesn't reserve CPU or memory. If nothing is evictable or no node has room, the high-priority pod still waits (`Pending`). Capacity is a separate concern (see [requests and limits](/t/requests-limits)).
- Overlooking system priorities. Kubernetes reserves the highest values for its own critical components. Stay well below them so your classes don't compete with the cluster's own.

**When to use it:** in a shared cluster where some workloads must survive a squeeze — for example, keeping the ingress layer above batch jobs. Pair it with [resource quotas](/t/resource-quota) and realistic [requests](/t/requests-limits); priority, quota and scheduling are the three levers that decide who gets what when a cluster is full.
