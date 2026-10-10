---
title: "Taints and Tolerations"
summary: "Keeping pods off nodes unless they explicitly allow it."
levels: { backend: senior, data-engineer: senior }
aliases: ["taints and tolerations", "node taints", "tolerations"]
prereqs: ["k8s-node", "pod"]
related: ["node-affinity", "daemonset", "control-plane", "capacity-planning", "kubernetes"]
---

**Taints** and **tolerations** work together to repel pods from nodes. You put a taint on a [node](/t/k8s-node) — "don't schedule ordinary pods here" — and a toleration on a [pod](/t/pod) to say "this one is allowed anyway." It's the inverse of [node affinity](/t/node-affinity): affinity attracts pods to nodes, taints push them away.

```sh
kubectl taint nodes gpu-1 dedicated=gpu:NoSchedule
```

```yaml
tolerations:
  - key: dedicated
    operator: Equal
    value: gpu
    effect: NoSchedule
```

Only pods with a matching toleration land on the tainted node. Effects control behaviour: `NoSchedule` blocks new pods, `PreferNoSchedule` is a soft hint, and `NoExecute` can also evict pods that don't tolerate the taint.

The classic mistakes:

- Tainting without understanding who needs in. A taint with no matching tolerations means nothing schedules there, and the node sits idle. Decide which workloads the node is *for* before you taint it.
- Confusing taints with affinity. Taints repel; affinity attracts. Using a taint when you meant "run this workload here" is the wrong tool — use affinity. They're often combined (taint the GPU nodes, and give the GPU workload both a toleration and an affinity).
- Forgetting control-plane taints. Managed and self-managed clusters usually taint the control-plane nodes so normal workloads stay off. A [DaemonSet](/t/daemonset) that should run everywhere needs a toleration for those taints, or it silently skips them.
- Assuming tolerations force placement. A toleration lets a pod *be* on a tainted node; it doesn't send it there. The scheduler still considers resources and other rules. Pair it with affinity when you need certainty.
- Evicting running pods unexpectedly. Changing a taint to `NoExecute` can evict pods already on the node. Do it knowing what's there.

Taints are the standard way to reserve nodes for special hardware, dedicated tenants, or cluster system components. Use them with clear intent, and pair with careful [capacity planning](/t/capacity-planning) so reserved nodes aren't wasted.
