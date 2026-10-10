---
title: "ReplicaSet"
summary: "Keeps a set number of identical pods running."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["kubernetes replicaset", "replica set", "pod replicas"]
prereqs: ["pod", "k8s-deployment"]
related: ["hpa", "statefulset", "kubernetes", "k8s-service"]
---

A **ReplicaSet** keeps a set number of identical [pods](/t/pod) running. You give it a pod template and a desired count, and a selector that matches those pods' labels. If a pod dies or a node goes away, the ReplicaSet creates a replacement; if there are too many, it deletes the extras.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata: { name: web }
spec:
  replicas: 3
  selector:
    matchLabels: { app: web }
  template:
    metadata:
      labels: { app: web }
    spec:
      containers:
        - name: web
          image: registry.example.com/web:1.4.2
```

In day-to-day work you don't create ReplicaSets directly. A [Deployment](/t/k8s-deployment) creates and manages them: each change to the pod template produces a new ReplicaSet, and the Deployment shifts pods from the old one to the new one to perform a rolling update. That's why `kubectl get replicasets` often shows several, with one at the desired count and older ones scaled to zero.

The classic mistakes:

- **Editing a ReplicaSet to roll out a new image.** It may replace pods, but you lose history and rollback, and the owning Deployment will undo your change. Change the Deployment instead.
- **Overlapping selectors.** If two ReplicaSets select the same labels, they fight over the same pods and the counts become unreliable.
- **Using a ReplicaSet when you need stable identity.** Replicas are interchangeable; for per-pod identity and storage use a [StatefulSet](/t/statefulset).

The ReplicaSet's count is fixed unless something changes it. To scale with load, a [HorizontalPodAutoscaler](/t/hpa) adjusts the Deployment's replica count. Behind all of them, a [Service](/t/k8s-service) gives clients a stable address while individual pods come and go.
