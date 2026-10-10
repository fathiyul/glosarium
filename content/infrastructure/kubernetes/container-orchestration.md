---
title: "Container Orchestration"
summary: "Automating the deployment, scaling and healing of containers."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["orchestration", "container scheduler", "kubernetes orchestration"]
prereqs: ["container", "kubernetes"]
related: ["managed-kubernetes", "do-you-need-kubernetes", "docker-compose", "k8s-deployment", "hpa", "helm"]
---

Once you run more than a handful of containers across more than one machine, doing it by hand stops working. **Container orchestration** is the software that schedules containers onto machines, restarts the ones that fail, scales them with load, and rolls out new versions without downtime.

The job includes:

- **Scheduling** — placing each workload on a node with enough CPU and memory (see [pod](/t/pod)).
- **Self-healing** — detecting dead containers or unhealthy nodes and replacing them.
- **Scaling** — adding and removing copies as demand changes (see [horizontal pod autoscaling](/t/hpa)).
- **Rolling updates and rollbacks** — replacing old versions gradually (see [deployments](/t/k8s-deployment)).
- **Service discovery and load balancing** — giving a stable address to containers that come and go.
- **Configuration and health checks** — feeding settings and [health probes](/t/health-check) into each workload.

[Kubernetes](/t/kubernetes) is the de facto standard, and cloud providers offer managed versions (see [managed Kubernetes](/t/managed-kubernetes)). [Docker Compose](/t/docker-compose) runs several containers but on a single host: useful for development, not a cluster orchestrator.

The classic mistake is reaching for Kubernetes for a small app. It brings real operational weight — networking, storage, upgrades, RBAC, monitoring. If one server and a few containers will do, that's simpler (see [do you need Kubernetes?](/t/do-you-need-kubernetes)). Serverless container platforms cover a middle ground.

The other mistake is expecting the orchestrator to fix poor application design. It assumes containers are stateless, start fast, fail gracefully on termination, and report health. No scheduler can save an app that can't [shut down cleanly](/t/graceful-degradation) or that keeps state on its local disk.

Adopt orchestration when you actually need its guarantees, and pair it with [Helm](/t/helm) or another tool for managing the manifests.
