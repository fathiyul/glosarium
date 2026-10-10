---
title: "Deployment"
summary: "Declares how many replicas of a pod should run and how to update them."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["k8s deployment", "rolling update", "deployment object"]
prereqs: ["pod", "replicaset"]
related: ["kubectl", "k8s-service", "requests-limits", "image-tags", "helm"]
---

A **Deployment** tells Kubernetes the desired state for a workload: which [pod](/t/pod) template to run, how many replicas, and how to replace them when something changes. The controller compares that declaration to reality and works to close the gap — a new image rolls out, a crashed pod is recreated.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
spec:
  replicas: 3
  selector:
    matchLabels: { app: api }
  template:
    metadata:
      labels: { app: api }
    spec:
      containers:
        - name: api
          image: registry.example.com/api:1.4.2
          ports: [{ containerPort: 8080 }]
```

The Deployment doesn't manage pods directly; it manages a [ReplicaSet](/t/replicaset), which in turn keeps the pods running. Each change to the pod template creates a new ReplicaSet, which is what makes **rolling updates** possible.

```sh
kubectl apply -f deployment.yaml
kubectl rollout status deployment/api
kubectl rollout undo deployment/api     # roll back to the previous revision
```

The classic mistakes:

- Editing pods by hand. Pods created by a Deployment are managed and get replaced; edit the Deployment instead.
- No resource requests. Without them the scheduler can't place pods well and nodes get overcommitted (see [requests and limits](/t/requests-limits)).
- A mutable image tag. `imagePullPolicy: IfNotPresent` with a moving tag like `:latest` can leave nodes on stale code (see [image tags](/t/image-tags)).

For releases, tune the rollout strategy (how many pods may be unavailable or surplus at once) and keep a [Service](/t/k8s-service) in front so traffic only reaches ready pods. Teams often wrap Deployments in [Helm](/t/helm) charts rather than applying raw YAML, and drive changes through [kubectl](/t/kubectl) only for inspection.
