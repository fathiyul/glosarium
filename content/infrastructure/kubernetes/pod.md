---
title: "Pod"
summary: "The smallest deployable unit in Kubernetes: one or more containers."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["kubernetes pod", "k8s pod", "pod spec"]
prereqs: ["kubernetes", "container"]
related: ["k8s-deployment", "replicaset", "sidecar", "k8s-service", "k8s-node"]
---

A **Pod** is the smallest thing Kubernetes schedules. It wraps one or more [containers](/t/container) that always run together on the same [node](/t/k8s-node). Containers in a pod share a network namespace — the same IP and `localhost` — and can share storage volumes.

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels: { app: web }
spec:
  containers:
    - name: web
      image: registry.example.com/web:1.4.2
      ports: [{ containerPort: 8080 }]
```

In practice you rarely create bare pods. A [Deployment](/t/k8s-deployment) or [ReplicaSet](/t/replicaset) creates and replaces pods for you; a StatefulSet does so when identity matters. A pod you make by hand isn't rescheduled if its node dies.

Most pods hold one main container. The common exception is a **sidecar**: a helper container that shares the pod's network or filesystem — a log shipper, a proxy, a config reloader. Because they share `localhost`, a sidecar can sit in front of your app's traffic.

The classic mistakes:

- Putting unrelated apps in one pod for convenience. They're now scaled, scheduled and restarted together, and one crash affects the other. Split them into separate pods.
- Expecting a stable identity. Pods are disposable; their name and IP change when they're replaced. Put a [Service](/t/k8s-service) in front for a stable address.
- Reaching another pod by IP or `localhost`. Each pod has its own IP; use the Service name.

Set [resource requests and limits](/t/requests-limits) on each container, and use [ConfigMaps and Secrets](/t/configmap-secret) for configuration rather than baking it into the image. Pods are the unit that every other workload object ultimately manages.
