---
title: "Namespace"
summary: "Dividing cluster resources between teams or apps."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["kubernetes namespace", "k8s namespace", "namespace scoping"]
prereqs: ["kubernetes", "pod"]
related: ["rbac", "resource-quota", "network-policy", "service-account", "configmap-secret"]
---

A **Namespace** is a virtual partition of a Kubernetes cluster. Object names must be unique within a namespace, and many things are scoped to one: [ServiceAccounts](/t/service-account), [ConfigMaps and Secrets](/t/configmap-secret), [resource quotas](/t/resource-quota), and access rules. Namespaces let several teams or environments share one cluster without their names colliding.

```sh
kubectl get namespaces
kubectl get pods -n payments
kubectl create namespace staging
```

Every cluster starts with a few built-in ones, including `default` (where objects go if you don't specify) and `kube-system` (the cluster's own components). You refer to objects as `namespace/name`, and set the current namespace per command with `-n` or in your kubeconfig context.

The classic mistakes:

- **Assuming namespaces isolate network traffic.** They scope *names and access*, not connectivity. By default pods in different namespaces can still reach each other; use a [NetworkPolicy](/t/network-policy) to restrict that.
- **Using one namespace for everything.** You lose the ability to set per-team quotas and permissions, and one team's messy names spill into another's.
- **Deleting a namespace casually.** Deleting it deletes every object inside it. That's convenient for cleanup and catastrophic by accident.

Namespaces are the unit that [RBAC](/t/rbac) roles and [resource quotas](/t/resource-quota) attach to, so they're the natural boundary for "team X may use at most this much and only do these things." For stronger isolation between tenants — separate clusters, or policies that span namespaces — people reach for additional tools; namespaces are a naming and policy boundary, not a security wall by themselves.
