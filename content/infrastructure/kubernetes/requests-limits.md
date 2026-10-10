---
title: "Requests and Limits"
summary: "How much CPU and memory a pod reserves and is allowed to use."
levels: { backend: senior, data-engineer: senior }
aliases: ["requests and limits", "resource requests", "resource limits"]
prereqs: ["pod", "kubernetes"]
related: ["hpa", "vertical-pod-autoscaler", "resource-quota", "capacity-planning", "k8s-node"]
---

**Requests** and **limits** are how you tell Kubernetes how much CPU and memory a container needs. They look similar but do different jobs, and mixing them up causes some of the most common cluster problems.

- A request is what the container is guaranteed and what the [scheduler](/t/control-plane) uses to find a node with room. Two pods requesting 1 CPU each need a node with 2 CPUs free.
- A limit is the ceiling the container may not exceed. CPU above the limit is *throttled*; memory above the limit gets the container *OOMKilled*.

```yaml
resources:
  requests: { cpu: "250m", memory: "256Mi" }
  limits:   { cpu: "1",    memory: "512Mi" }
```

From these, Kubernetes assigns a **QoS class**:

- Guaranteed — requests equal limits on every container; the most protected.
- Burstable — requests below limits; can use spare capacity but is first in line to be squeezed.
- BestEffort — no requests or limits; the first to be evicted under pressure.

The classic mistakes:

- Setting no requests. The scheduler can't place pods well, nodes get overcommitted, and [autoscalers](/t/hpa) that compute utilization from requests can't work. Requests are effectively mandatory for anything real.
- A memory limit too low. The container is killed — usually `OOMKilled` — under load it would have survived without the cap. Memory limits protect the node, so set them sensibly above real peak.
- A CPU limit that strangles. CPU limits cause throttling even when the node has idle capacity, which hurts latency-sensitive services. Many teams set CPU requests but leave CPU limits off, to avoid artificial throttling.
- Requests far above real usage. Space is reserved and never used, wasting node capacity and money (see [capacity planning](/t/capacity-planning)).
- Guessing once and never revisiting. Real usage changes. Measure and adjust, or let the [Vertical Pod Autoscaler](/t/vertical-pod-autoscaler) recommend values.

Requests and limits underpin almost everything else — scheduling, autoscaling, quotas and priority. Getting them roughly right is the difference between a cluster that runs well and one that's simultaneously throttled and under-utilised.
