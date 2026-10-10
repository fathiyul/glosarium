---
title: "Vertical Pod Autoscaler"
summary: "Adjusting a pod's CPU and memory requests automatically."
levels: { backend: senior, data-engineer: senior }
aliases: ["VPA", "vertical pod autoscaler", "resource autoscaling"]
prereqs: ["requests-limits", "kubernetes"]
related: ["hpa", "autoscaling", "k8s-deployment", "pod-disruption-budget", "capacity-planning"]
---

The **Vertical Pod Autoscaler (VPA)** adjusts a pod's CPU and memory **requests and limits** based on how much it actually uses. Where the [Horizontal Pod Autoscaler](/t/hpa) adds or removes replicas, the VPA makes each pod the right size. It watches usage over time and recommends — or applies — better values, which helps when hand-tuned requests are too high (wasted capacity) or too low (throttling and OOM kills).

It runs in modes:

- Off — only recommends; you apply the values yourself. The safest way to start.
- Initial — sets requests when a pod is created, then leaves it alone.
- Recreate — updates running pods by recreating them when the recommendation changes significantly.
- Auto — currently recreates pods as needed, similar to Recreate, with the option to change as support evolves.

```text
observe usage → recommend requests/limits → (in Recreate/Auto) restart pod with new values
```

The classic mistakes:

- Combining VPA and HPA on the same metric. A VPA tuning CPU while an HPA scales on CPU utilization of that same request creates a feedback loop. Use them on different signals, or pick one.
- Ignoring the restarts. Applying a new recommendation in Recreate/Auto restarts the pod. For a stateful or latency-sensitive service, that's a disruption — pair it with enough replicas, [probes](/t/k8s-probes) and a [PodDisruptionBudget](/t/pod-disruption-budget).
- Trusting recommendations blindly. The VPA is a helper, not an oracle. Its suggestions depend on observed load; an unusual week produces unusual values. Review important workloads.
- Expecting it to fix architecture. If a service is slow because of a downstream dependency, giving it more CPU won't help. Right-sizing is not the same as fixing the bottleneck.
- Forgetting it needs a controller. The VPA targets a workload controller (like a [Deployment](/t/k8s-deployment)), not bare pods.

**When to use it:** to stop guessing at [requests and limits](/t/requests-limits) and keep them aligned with reality, especially across many services. Start in recommendation mode, learn what it suggests, then apply changes deliberately — and consider it part of ongoing [capacity planning](/t/capacity-planning).
