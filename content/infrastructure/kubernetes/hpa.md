---
title: "Horizontal Pod Autoscaler"
summary: "Adding pods automatically based on load."
levels: { backend: senior, data-engineer: senior }
aliases: ["HPA", "horizontal pod autoscaler", "autoscaling"]
prereqs: ["k8s-deployment", "requests-limits"]
related: ["autoscaling", "vertical-pod-autoscaler", "capacity-planning", "metrics", "k8s-node"]
---

The **Horizontal Pod Autoscaler (HPA)** changes the number of pod replicas based on load. It scales *out* by adding pods and *in* by removing them, targeting a workload like a [Deployment](/t/k8s-deployment) or StatefulSet. "Horizontal" means more copies, as opposed to the [Vertical Pod Autoscaler](/t/vertical-pod-autoscaler), which makes each pod bigger.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: api }
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: 70 }
```

The HPA reads metrics, compares them to the target, and adjusts `replicas`. It needs a metrics source, and — importantly — it computes utilization from the pods' [resource requests](/t/requests-limits). The metric can be built-in (CPU, memory) or custom (queue depth, requests per second).

The classic mistakes:

- No resource requests. If a container has no CPU request, the HPA can't compute a percentage and won't scale it. This is the most common reason an HPA seems to do nothing.
- Scaling on the wrong signal. CPU is easy but often not the bottleneck. If requests are waiting on a database or a queue, scale on that metric instead — or you'll add pods that all wait just as long.
- Fighting the VPA. Running an HPA on CPU and a VPA on CPU for the same workload makes them tug in opposite directions. Pick one, or use them on different resources.
- Ignoring node capacity. The HPA can want more replicas than the cluster has room for. Without spare nodes (or cluster autoscaling, which adds nodes and isn't part of the HPA), extra pods stay pending.
- Thrashing. Aggressive targets and short windows make the count oscillate. Set sensible thresholds and stabilization.

**When not to use it:** for steady, predictable load, a fixed replica count is simpler. For batch or bursty work, other mechanisms fit better. The HPA is for services whose demand varies and can be met by running more copies.
