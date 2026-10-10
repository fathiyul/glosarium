---
title: "Managed Kubernetes (EKS, GKE, AKS)"
summary: "Kubernetes with a cloud-run control plane."
levels: { backend: senior, data-engineer: senior }
aliases: ["managed kubernetes", "EKS", "GKE", "AKS"]
prereqs: ["kubernetes", "control-plane"]
related: ["cloud-providers", "managed-vs-self-hosted", "vendor-lock-in", "container-orchestration", "autoscaling"]
---

**Managed Kubernetes** is a Kubernetes service where the cloud provider runs the [control plane](/t/control-plane) for you. You create a cluster and get a working API server, etcd and its backups, and upgrades handled by the provider. Examples include Amazon EKS, Google GKE and Azure AKS; the underlying Kubernetes is the same, so your manifests and `kubectl` workflows carry over.

What the provider takes on:

- running and scaling the control plane, including high availability;
- patching and upgrading the Kubernetes version (often on your schedule);
- integrating with cloud networking, load balancers, storage and identity.

What you still own:

- the worker [nodes](/t/k8s-node) (unless you use a serverless/autopilot mode) and their sizing;
- your workloads: [requests and limits](/t/requests-limits), scaling, and health;
- cluster add-ons, networking policy, and access control;
- cost.

```text
provider: control plane, API server, etcd, upgrades
you:      nodes, workloads, configuration, security, cost
```

The classic mistakes:

- Assuming "managed" means "no ops". It removes the hardest, least differentiating work — running etcd and the control plane — but node and workload operations are still yours. This is the [shared responsibility model](/t/shared-responsibility-model) applied to Kubernetes.
- Letting the version drift. The provider upgrades the control plane, but your node pools and deprecated APIs are your concern. Stay close to a supported version to avoid forced, disruptive migrations.
- Ignoring cost. You pay for the control plane and for every node; idle overhead and overprovisioned pools add up (see [cloud cost management](/t/finops)).
- Accidental lock-in. Managed clusters integrate with provider networking, storage and identity. That's convenient, but moving to another provider is real work (see [vendor lock-in](/t/vendor-lock-in)).

**When not to use it:** if you run on-premises, or need full control over the control plane, self-managed Kubernetes (or a simpler orchestrator) may fit. For most teams on a cloud, managed Kubernetes is the sensible default over running etcd yourself — the same build-versus-buy reasoning as [managed vs self-hosted](/t/managed-vs-self-hosted).
