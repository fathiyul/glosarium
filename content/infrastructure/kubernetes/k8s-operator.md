---
title: "Operator"
summary: "A custom controller that automates running complex software."
levels: { backend: staff, data-engineer: staff }
aliases: ["operator", "kubernetes operator", "k8s operator"]
prereqs: ["custom-resource-definition", "kubernetes"]
related: ["control-plane", "statefulset", "managed-kubernetes", "configuration-drift"]
---

A Kubernetes **operator** is a controller that encodes the operational knowledge of running a piece of software. Instead of a human following a runbook to back up a database, reshard a queue or promote a replica, an operator watches for the state you declared and **reconciles** reality to match — the same loop Kubernetes uses for its built-in objects, extended to your application.

An operator is built from two pieces: one or more [CustomResourceDefinitions](/t/custom-resource-definition) that define the kinds it manages, and a controller that watches those objects and acts.

```yaml
apiVersion: example.com/v1
kind: Database
metadata: { name: orders }
spec:
  replicas: 3
  version: "16"
```

From that, the operator creates the underlying [StatefulSet](/t/statefulset), volumes, services and backups, and keeps them healthy — handling upgrades, failover and repair as the declared state changes.

The pattern matters for **stateful, complex software**: databases, message systems, storage. Running those by hand is exactly the toil that operators remove, and a good operator brings the same declarative, self-healing model that makes stateless workloads easy.

The classic mistakes:

- Expecting an operator to be magic. It automates a *specific* set of operations the author encoded. If it doesn't handle the failure you hit, it won't invent a fix. Read what it actually does.
- Installing one and never watching it. Operators can act destructively — delete volumes, fail over, restart — if misconfigured. They need monitoring and care, not set-and-forget.
- A CRD without the controller. Defining custom objects that nothing reconciles does nothing; the controller is the operator (see [custom resource definitions](/t/custom-resource-definition)).
- Writing your own too eagerly. Operators are nontrivial to build and maintain. Prefer a maintained operator unless you have highly specific needs.
- Treating backups as covered. An operator's backup feature is only a backup if restores are tested. Verify (see [backups](/t/backups)).

**When to use one:** when you run complex stateful software on Kubernetes and want to automate its day-2 operations. On [managed Kubernetes](/t/managed-kubernetes), the provider's own controllers are operators too. The pattern is a natural extension of Kubernetes's reconciling model — see [container orchestration](/t/container-orchestration) and [configuration drift](/t/configuration-drift) for the loop it embodies.
