---
title: "Cluster Resource Manager (YARN, Kubernetes)"
summary: "Allocating CPU and memory to jobs on a shared cluster."
levels: { data-engineer: senior }
aliases: ["YARN", "resource manager", "cluster manager", "Apache Hadoop YARN"]
prereqs: ["cluster", "distributed-batch-processing"]
related: ["kubernetes", "resource-quota", "spark-driver-executor", "scheduler", "container"]
---

A cluster resource manager decides which machine runs each part of a job and how much CPU and memory it gets. On a shared cluster, many jobs from many users compete for the same machines, and this layer is the referee: YARN is the classic Hadoop one, and Kubernetes now plays that role for Spark and other engines.

**The classic mistake is requesting resources by habit.** Ask for far more memory and cores than a job uses and the cluster looks full while machines idle; ask for too little and tasks [spill to disk](/t/spill-to-disk) or die with an [out-of-memory](/t/out-of-memory) error. Both are invisible until someone compares the resource requests against real usage.

## What it does

- A job asks for containers (YARN's term) or pods ([Kubernetes](/t/kubernetes)); the manager places each on a node that has room.
- It tracks free capacity per node and per queue or namespace.
- [Resource quotas](/t/resource-quota) cap what a team or namespace can consume, so one workload can't starve the rest.
- Policies decide fairness: YARN has fair, capacity and FIFO schedulers; Kubernetes leaves queueing to its scheduler plus whatever queueing add-on you run.

This is not the same as the operating system's [CPU scheduler](/t/scheduler), which picks which thread runs on a core. The cluster resource manager works one level up: which node a container lands on.

## When a job doesn't fit

- Preemption: a higher-priority job can reclaim containers from a lower-priority one. YARN supports this directly; on Kubernetes it depends on the queueing layer you add.
- Fragmentation: a node may have free memory but no free cores, so a container that needs both waits even though the cluster looks partly empty.
- Waiting is normal: on a busy cluster a job may sit pending until resources free up, and its queue position matters as much as its own efficiency.

## When not to use a cluster at all

A resource manager earns its complexity only when jobs outgrow one machine. For datasets that fit on a laptop or single server, [single-node engines](/t/single-node-engines) like DuckDB or Polars are often faster and far simpler — no scheduler, no queue, no cluster to operate. Managed services can also hide the resource manager, so know what sits underneath when you tune memory and cores ([driver and executors](/t/spark-driver-executor)).
