---
title: "Service"
summary: "A stable network address for a set of pods."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["kubernetes service", "clusterip", "k8s service"]
prereqs: ["pod", "kubernetes"]
related: ["ingress", "service-discovery", "dns", "load-balancer", "k8s-deployment"]
---

Pods come and go — restarted, replaced, rescheduled — so their IP addresses don't stay put. A **Service** gives a stable virtual IP and DNS name in front of a changing set of pods, selected by labels, and spreads traffic across the ones that are ready.

```yaml
apiVersion: v1
kind: Service
metadata: { name: api }
spec:
  selector: { app: api }      # matches the pods' labels
  ports:
    - port: 80
      targetPort: 8080
```

Traffic to `api:80` (or `api.<namespace>.svc`) reaches one of the matching pods on port 8080. Other pods can reach it by name because the cluster runs [DNS](/t/dns) — this is [service discovery](/t/service-discovery).

Service types control how it's exposed:

- ClusterIP — the default; reachable only inside the cluster.
- NodePort — opens a port on every node.
- LoadBalancer — asks the cloud for an external [load balancer](/t/load-balancer) with a public address.
- ExternalName — a DNS alias to something outside the cluster.

The classic mistakes:

- **A selector that matches nothing.** If no pods carry the labels, the Service has no endpoints and connections fail. Check `kubectl get endpoints`.
- **Assuming you can reach it by IP from outside.** ClusterIP is internal; expose it with an [Ingress](/t/ingress), a LoadBalancer Service, or a port-forward for debugging.
- **One public load balancer per service.** That gets expensive; route many services through a single [Ingress](/t/ingress) instead.

A Service load-balances connections, not individual requests, so long-lived connections can skew to one pod. Behind a [Deployment](/t/k8s-deployment), a Service is the stable name that survives every rollout and restart.
