---
title: "Helm"
summary: "A package manager for Kubernetes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["helm chart", "kubernetes package manager", "helm install"]
prereqs: ["kubernetes", "kubectl"]
related: ["k8s-deployment", "configmap-secret", "k8s-namespace", "container-orchestration"]
---

**Helm** packages Kubernetes manifests into reusable units. A *chart* is a set of templated manifests plus default settings; installing a chart renders those templates with your values and applies the result. It's the difference between copy-pasting YAML for every environment and parameterizing it once.

```text
mychart/
  Chart.yaml
  values.yaml          # defaults you override
  templates/
    deployment.yaml
    service.yaml
```

```sh
helm install api ./mychart -f prod-values.yaml
helm upgrade api ./mychart -f prod-values.yaml
helm rollback api 1
helm template api ./mychart      # render locally, apply nothing
```

A chart can include a [Deployment](/t/k8s-deployment), [Service](/t/k8s-service), [ConfigMaps and Secrets](/t/configmap-secret) and more, with values like the image tag or replica count filled in per environment. Installed instances are *releases*, tracked in the cluster so Helm knows what it manages.

The classic mistakes:

- **Editing installed resources by hand.** Helm tracks what it created; out-of-band changes are silently reverted on the next `upgrade`.
- **`--set` sprawl.** Passing dozens of flags on the command line is unreviewable; keep values in files under version control.
- **Untrusted or unmaintained charts.** A chart is code with cluster permissions; read what it deploys.

The trade-off is complexity. Templates add a language to learn, and debugging a bad render can be slower than reading plain YAML. For small, stable workloads, plain manifests (or a lighter overlay tool) are often simpler. Helm earns its place when you deploy the same application many times with different settings — and it pairs naturally with [container orchestration](/t/container-orchestration) tooling.
