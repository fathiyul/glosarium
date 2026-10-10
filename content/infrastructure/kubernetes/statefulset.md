---
title: "StatefulSet"
summary: "Running stateful apps with stable identity and storage."
levels: { backend: senior, data-engineer: senior }
aliases: ["StatefulSet", "stateful apps", "stable identity"]
prereqs: ["k8s-deployment", "persistent-volume"]
related: ["persistent-volume", "k8s-service", "database", "backups", "kubernetes"]
---

A **StatefulSet** is a workload controller for stateful applications — databases, message brokers, anything where each instance is not interchangeable. Where a [Deployment](/t/k8s-deployment) creates anonymous, identical pods it can replace freely, a StatefulSet gives each pod a **stable identity** and its own storage.

Each replica gets:

- a predictable name with an ordinal (`db-0`, `db-1`, `db-2`) that persists across restarts;
- a stable network identity, so other pods can address it by name (via a headless [Service](/t/k8s-service));
- its own **persistent volume**, from a claim template, so restarting a pod reattaches the same disk.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata: { name: db }
spec:
  serviceName: db
  replicas: 3
  template: { ... }
  volumeClaimTemplates:
    - metadata: { name: data }
      spec:
        accessModes: [ReadWriteOnce]
        resources: { requests: { storage: 50Gi } }
```

Scaling and rollouts are ordered: pods are created and updated one at a time, usually in sequence, rather than all at once.

The classic mistakes:

- Using it for stateless apps. If replicas are interchangeable, a Deployment is simpler and more flexible. StatefulSets trade scheduling flexibility for identity.
- Assuming it manages the data. A StatefulSet guarantees a volume per pod; it doesn't back up, replicate, or fix application-level consistency. Those are still yours — see [backups](/t/backups) and the [database](/t/database).
- Deleting a claim carelessly. Removing a StatefulSet doesn't necessarily delete its volumes — which is intentional, but means orphaned disks accumulate, and deleting claims the wrong way can lose data.
- Expecting instant scaling. Ordered creation and per-pod storage make scaling slower than a Deployment. Plan capacity accordingly.
- Forgetting readiness. Because pods start in order, one that never becomes ready blocks the rest. [Probes](/t/k8s-probes) matter here.

**When not to use it:** most services are stateless and belong in a Deployment; give them a [Service](/t/k8s-service) and [persistent volumes](/t/persistent-volume) only if they truly need state. StatefulSets are for the minority of workloads where identity and per-instance storage are the point.
