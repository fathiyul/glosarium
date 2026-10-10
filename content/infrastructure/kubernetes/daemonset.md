---
title: "DaemonSet"
summary: "Running one pod on every node."
levels: { backend: senior, data-engineer: senior }
aliases: ["DaemonSet", "kubernetes daemonset", "one pod per node"]
prereqs: ["pod", "k8s-node"]
related: ["k8s-deployment", "taints-tolerations", "node-affinity", "container-logs", "monitoring"]
---

A **DaemonSet** ensures a copy of a pod runs on every [node](/t/k8s-node) (or every matching node). When a node joins the cluster, the DaemonSet schedules a pod there; when one leaves, its pod goes with it. It's the "**one pod per node**" controller.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata: { name: log-agent }
spec:
  selector:
    matchLabels: { app: log-agent }
  template:
    metadata:
      labels: { app: log-agent }
    spec:
      containers:
        - name: agent
          image: registry.example.com/log-agent:1.4.2
```

It's meant for **node-level agents**: log shippers, monitoring and metrics collectors, network plugins, storage daemons — anything that needs to run on each machine rather than a fixed number of copies. Contrast with a [Deployment](/t/k8s-deployment), which runs a set number of replicas wherever they fit.

The classic mistakes:

- Using a DaemonSet for an ordinary application. If you want, say, three replicas of an API, that's a Deployment. A DaemonSet ties the count to the number of nodes, which is the wrong knob for most services.
- Forgetting node taints. Many clusters taint the control-plane nodes so normal pods stay off. A DaemonSet that should run everywhere needs a matching [toleration](/t/taints-tolerations), or it silently skips those nodes.
- Unbounded resource use. A heavy agent multiplied by hundreds of nodes is a lot of CPU and memory. Keep per-node [requests and limits](/t/requests-limits) small.
- Assuming it covers all nodes. A [nodeSelector](/t/node-affinity) or affinity can restrict a DaemonSet to a subset — useful for GPU nodes or storage hosts, but easy to forget.

DaemonSets are how the platform's own plumbing (logging, monitoring, networking) reaches every node, which is why they often need tolerations and careful resource limits. If your concern is spreading a *normal* workload for availability, use [node affinity and topology spread](/t/node-affinity) on a Deployment instead.
