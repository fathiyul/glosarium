---
title: "Network Policies"
summary: "Firewall rules between pods."
levels: { backend: senior, data-engineer: senior }
aliases: ["network policy", "kubernetes network policy", "pod firewall"]
prereqs: ["kubernetes", "container-networking"]
related: ["ingress", "k8s-service", "firewall", "zero-trust", "k8s-namespace"]
---

A **NetworkPolicy** is a Kubernetes object that restricts which pods can talk to which. By default, pods in a cluster can reach each other freely — any pod can connect to any other on any port. A NetworkPolicy lets you apply a **default deny** and open only the paths you intend, the way a firewall does for hosts.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata: { name: allow-api-to-db }
spec:
  podSelector:
    matchLabels: { app: db }
  policyTypes: [Ingress]
  ingress:
    - from:
        - podSelector:
            matchLabels: { app: api }
      ports:
        - port: 5432
          protocol: TCP
```

This says: pods labelled `app: db` accept inbound traffic only from pods labelled `app: api`, on the database port. Add an egress rule to restrict what a pod may connect *out* to.

The classic mistakes:

- Assuming it works without CNI support. NetworkPolicy is enforced by the cluster's networking plugin, not Kubernetes itself. If the CNI doesn't implement policies, the objects are accepted but ignored. Verify your plugin supports them.
- Forgetting egress. Policies are directional. Restricting ingress doesn't stop a compromised pod from reaching out. For real containment, write egress rules too.
- Locking out your own traffic. A default-deny with an incomplete allow list breaks DNS, health checks or the app itself. Add the rules you need before, or alongside, the deny.
- Scoping the wrong thing. A policy is namespace-scoped and selects pods by label. Cross-namespace rules need explicit namespace selectors, which is easy to omit.
- Treating it as the only layer. NetworkPolicy controls pod-to-pod traffic inside the cluster. It doesn't replace the host [firewall](/t/iptables-nftables) or a cloud [security group](/t/security-group).

**When to use it:** whenever the cluster hosts more than one trust boundary — different teams, tenants, or a sensitive database among general workloads. It's a core part of a [zero trust](/t/zero-trust) posture, alongside [service](/t/k8s-service) and [ingress](/t/ingress) configuration.
