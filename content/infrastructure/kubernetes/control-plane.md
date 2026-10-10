---
title: "Control Plane"
summary: "The components that manage cluster state."
levels: { backend: senior, data-engineer: senior }
aliases: ["control plane", "master node", "kubernetes control plane"]
prereqs: ["kubernetes", "cluster"]
related: ["k8s-node", "scheduler", "managed-kubernetes", "container-orchestration", "fault-tolerance"]
---

The **control plane** is the set of components in a Kubernetes [cluster](/t/cluster) that make decisions and hold state. When you `kubectl apply`, you're talking to the control plane, which records what you want and works to make reality match.

Its main pieces:

- the **API server** — the front door. Every command and every component goes through it.
- etcd — the key-value store that holds the cluster's entire state. If this is lost, the cluster forgets everything.
- the **scheduler** — decides which [node](/t/k8s-node) each new pod should run on.
- the controller manager — runs controllers that watch for drift and correct it (a Deployment's desired replicas, for example).

The [nodes](/t/k8s-node) run a separate set of components — the kubelet, which starts pods, and the networking proxy — but they follow the control plane's instructions. This split is why a node can fail without the cluster losing its memory of what should be running.

```text
kubectl ──▶ API server ──▶ etcd (state)
                │
                ├──▶ scheduler ──▶ picks a node
                └──▶ controllers ──▶ reconcile desired vs actual
```

The classic mistakes:

- A single control-plane node. It's a single point of failure: if it dies, you can't change the cluster or schedule new pods, even if workloads keep running briefly. For high availability you need multiple control-plane nodes, and etcd needs a quorum (an odd number, typically three).
- Assuming the control plane runs your apps. It mostly doesn't — your workloads run on worker nodes. Losing the control plane degrades management, not necessarily the running services, which is why HA setups focus on keeping it available.
- Ignoring etcd. It's the source of truth and must be backed up. A cluster without a restorable etcd backup is one bad day from starting over.
- Managing it yourself by accident. Running your own control plane is real work; [managed Kubernetes](/t/managed-kubernetes) exists to take it off your plate.

**When not to manage it:** almost always, unless you have specific reasons. Providers run the control plane for you, including its HA and upgrades — see [managed Kubernetes](/t/managed-kubernetes) and [container orchestration](/t/container-orchestration).
