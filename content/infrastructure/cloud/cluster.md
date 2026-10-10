---
title: "Cluster"
summary: "A group of machines working together as one system."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["compute cluster", "kubernetes cluster", "cluster of servers"]
prereqs: ["server", "compute-instance"]
related: ["kubernetes", "control-plane", "container-orchestration", "multi-cluster", "regions-azs"]
---

A **cluster** is a group of machines treated as one system. One machine has a ceiling — cores, memory, and a single point of failure — so when a workload outgrows it, you join several together and let software distribute the work. The word covers two related ideas: a general compute cluster, and a Kubernetes cluster specifically.

In generic terms, a cluster pools [servers](/t/server) or [compute instances](/t/compute-instance) behind a scheduler that decides what runs where. That gives you more capacity than any one machine and, if designed well, survives the loss of a node.

A **Kubernetes cluster** is the common case today: a [control plane](/t/control-plane) manages a set of worker [nodes](/t/k8s-node) that run [pods](/t/pod). Managed offerings run the control plane for you, so you mostly deal with nodes and workloads. See [container orchestration](/t/container-orchestration).

The classic mistake is a "cluster" of one node. It has the same single point of failure as a single server, but with more moving parts to operate. If you're building a cluster for availability, spread the nodes across failure domains — different machines, ideally different [availability zones](/t/regions-azs) — and make sure the workload can actually run on more than one node.

A second mistake is assuming a cluster is automatically fault-tolerant. It isn't, unless things are redundant: a database on one node is still a single point of failure no matter how many app nodes exist.

**When not to use it:** if one [server](/t/server) handles the load with room to spare, that's simpler and cheaper. Clusters pay off for scale, resilience, or when the orchestrator's features (rolling updates, self-healing, autoscaling) earn their keep. Very large organizations sometimes run several clusters divided by team or environment — see [multi-cluster](/t/multi-cluster).
