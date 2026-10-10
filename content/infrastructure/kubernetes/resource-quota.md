---
title: "Resource Quotas"
summary: "Capping what a namespace can use."
levels: { backend: senior, data-engineer: senior }
aliases: ["resource quota", "namespace quota", "LimitRange"]
prereqs: ["k8s-namespace", "requests-limits"]
related: ["requests-limits", "capacity-planning", "finops", "kubernetes", "hpa"]
---

A **ResourceQuota** caps the total resources a [namespace](/t/k8s-namespace) may consume: the sum of CPU and memory requests and limits across its pods, plus counts of objects like pods, services and persistent volume claims. It's how you stop one team or environment from swallowing the whole cluster.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata: { name: team-a, namespace: team-a }
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    pods: "50"
```

Once the quota is reached, new pods that would exceed it are rejected, not scheduled. A companion object, **LimitRange**, sets *per-pod* defaults and bounds — a default request and limit, and a maximum any single pod may ask for — so individual pods can't be unbounded even when the namespace total has room.

The classic mistakes:

- No quota for shared clusters. Without quotas, one team's runaway workload (or a bug that spawns pods) can starve everyone else and take down the cluster.
- A quota so tight pods can't schedule. If the namespace's remaining quota is smaller than a pod's request, or a `LimitRange` max is below what the app needs, pods are rejected and the deploy stalls. Size quotas with headroom.
- Confusing quota with LimitRange. A quota limits the *namespace total*; a LimitRange limits an *individual pod*. You often want both.
- Quota without requests. CPU and memory quotas count against pods' requests and limits. If pods set none, the accounting breaks and limits that rely on requests behave oddly — pair quotas with proper [requests and limits](/t/requests-limits).
- Set once, never reviewed. As teams grow, quotas need revisiting. A quota from last year may now be the thing blocking a launch.

Quotas are the namespace-level budgeting tool: they make shared clusters fair and their cost predictable (see [cloud cost management](/t/finops) and [capacity planning](/t/capacity-planning)). They complement, rather than replace, requests and limits on each pod.
