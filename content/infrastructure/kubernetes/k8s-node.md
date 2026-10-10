---
title: "Node"
summary: "A machine in the cluster that runs pods."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["kubernetes node", "worker node", "kubelet"]
prereqs: ["kubernetes", "cluster"]
related: ["pod", "control-plane", "node-affinity", "taints-tolerations", "requests-limits"]
---

A **Node** is a machine in a cluster — usually a [virtual machine](/t/compute-instance), sometimes bare metal — that actually runs your [pods](/t/pod). Each node runs an agent called the **kubelet**, which starts and stops containers, plus a container runtime and networking components. The [control plane](/t/control-plane) decides *which* pods go where; the node does the work.

```sh
kubectl get nodes
kubectl describe node <name>      # capacity, allocatable, and what's scheduled
kubectl top node                  # current usage
```

A node can be marked unschedulable and drained so its pods move elsewhere, which is how you do maintenance or upgrades without downtime:

```sh
kubectl cordon <node>            # stop scheduling new pods here
kubectl drain <node> --ignore-daemonsets   # evict existing pods
```

The classic mistake is ignoring **capacity**. The scheduler places a pod based on its [resource requests](/t/requests-limits), not its real usage. If requests are missing or too small, many pods pile onto one node and compete for CPU and memory; if they're too large, nodes sit half empty and cost more. Look at `Allocatable` versus `Requests` on a node to see how much room is really left.

The second mistake is assuming all nodes are identical. Nodes differ by size, labels and taints, and you steer pods with [node affinity](/t/node-affinity) and [taints and tolerations](/t/taints-tolerations) — for example keeping GPU work on GPU machines.

Managed Kubernetes hides most node operations, but the mental model still matters: pods are placed on bounded machines, and unhealthy nodes are replaced automatically. See [cluster](/t/cluster) and [container orchestration](/t/container-orchestration).
