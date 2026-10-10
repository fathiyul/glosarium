---
title: "kubectl"
summary: "The command-line tool for Kubernetes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["kubectl commands", "kubernetes cli", "k8s cli"]
prereqs: ["kubernetes"]
related: ["pod", "k8s-namespace", "container-logs", "helm", "infrastructure-as-code"]
---

**kubectl** is the command-line client for Kubernetes. It talks to the cluster's API server using a *kubeconfig*, which lists clusters, users and contexts, and tells kubectl which cluster and identity to use. Almost everything you do with a cluster starts here.

```sh
kubectl get pods -n payments          # list pods in a namespace
kubectl describe pod api-7d9f          # details, events, and status
kubectl logs api-7d9f --previous       # logs from the last attempt
kubectl exec -it api-7d9f -- sh        # open a shell in a container
kubectl apply -f deployment.yaml        # create or update from a file
kubectl get events --sort-by=.lastTimestamp
```

Declarative files with `apply` are the normal path; imperative commands like `create` and `scale` are handy for quick changes and experiments. Add `-o wide` or `-o yaml` to see more, and `-n <namespace>` to target one — many confusing "not found" errors are just the wrong namespace or [context](/t/k8s-namespace).

The classic mistakes:

- **Being on the wrong context.** kubeconfig can hold production and development side by side. Always know where you are; many people set the context to include the cluster name, and use separate configs per environment.
- **`kubectl edit` and ad hoc `apply` in production.** Changes made by hand drift from source control. Manage manifests as [infrastructure as code](/t/infrastructure-as-code) — often via [Helm](/t/helm) — and use kubectl to inspect.
- **Deleting without looking.** `kubectl delete` is immediate. Preview with `--dry-run=client` and confirm the object and namespace.

For log-hunting a failing container, pair kubectl with [container logs](/t/container-logs); `describe` and `get events` are usually where the real cause shows up.
