---
title: "Ingress"
summary: "Routing external HTTP traffic into the cluster."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["kubernetes ingress", "ingress controller", "http routing"]
prereqs: ["k8s-service", "kubernetes"]
related: ["tls", "dns", "reverse-proxy", "load-balancer", "api-gateway"]
---

An **Ingress** is a Kubernetes object that routes external HTTP and HTTPS traffic to [Services](/t/k8s-service) inside the cluster, matched by host name and path. It's how one entry point exposes many apps:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata: { name: web }
spec:
  rules:
    - host: shop.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api
                port: { number: 80 }
```

Ingress only describes routing. Something must act on it: an **Ingress controller** (for example ingress-nginx or a cloud provider's controller) runs in the cluster, watches Ingress objects, and configures an actual proxy or [load balancer](/t/load-balancer). It usually terminates [TLS](/t/tls) too, using a certificate you reference in the Ingress.

The classic mistake is creating an Ingress on a cluster with no controller and expecting traffic to appear. Nothing happens — the object just sits there. Check `kubectl get ingress` and the controller's pods first.

A second mistake is confusing the two meanings. "Ingress" is the rule object, not the proxy or the load balancer behind it. As in any [reverse proxy](/t/reverse-proxy), you also need [DNS](/t/dns) pointing at the controller's address and a certificate covering the host.

**When not to use it:** Ingress is HTTP(S)-only. For raw TCP/UDP, or for more advanced routing, a Service of type `LoadBalancer` or the newer Gateway API is the right tool. For a single app, exposing a Service directly may be simpler than standing up a controller. Ingress for teams that run many web apps behind one address is where it pays off.
