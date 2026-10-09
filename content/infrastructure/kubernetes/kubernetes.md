---
title: "Kubernetes"
summary: "The dominant container orchestration platform."
levels: { backend: mid-level, frontend: senior, data-engineer: mid-level }
aliases: ["K8s", "k8s", "Kubernetes orchestration", "kube"]
prereqs: ["container", "docker"]
related: ["pod", "k8s-deployment", "k8s-service", "container-orchestration", "do-you-need-kubernetes", "managed-kubernetes", "kubectl"]
core: [backend]
---

**Kubernetes** (K8s) is the dominant platform for running containers at scale. You tell it **what you want** ("run 3 copies of this container, keep them healthy, expose them on this address"), and it continuously works to make reality match, placing containers on machines, restarting failures, scaling and rolling out updates.

It's **declarative**: you describe the desired state in YAML, and Kubernetes' controllers reconcile the cluster to it.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels: { app: web }
  template:
    metadata:
      labels: { app: web }
    spec:
      containers:
        - name: web
          image: registry.example.com/shop:3f9c2a1
          ports: [{ containerPort: 8000 }]
          resources:
            requests: { cpu: "250m", memory: "256Mi" }
            limits: { memory: "512Mi" }
```

```sh
kubectl apply -f deployment.yaml
kubectl get pods
```

## The main building blocks

| Concept | What it is |
|---|---|
| **[Pod](/t/pod)** | The smallest unit: one or more containers that run together |
| **[Deployment](/t/k8s-deployment)** | Keeps N copies of a pod running and handles rolling updates |
| **[Service](/t/k8s-service)** | A stable address and load balancing for a set of pods |
| **[Ingress](/t/ingress)** | Routes external HTTP traffic to services |
| **[ConfigMap and Secret](/t/configmap-secret)** | Configuration and sensitive values for pods |
| **[Namespace](/t/k8s-namespace)** | A way to separate teams or environments in a cluster |
| **[Probes](/t/k8s-probes)** | Health checks that decide when a pod is ready or needs restarting |
| **[Requests and limits](/t/requests-limits)** | CPU and memory the pod needs and may use |

The **[control plane](/t/control-plane)** makes decisions, and **[nodes](/t/k8s-node)** (machines) run the pods.

## What it gives you

Self-healing, automatic scaling ([HPA](/t/hpa)), rolling updates and rollbacks, service discovery, and a common API across clouds and on-premises.

## What it costs

- **A steep learning curve** and a large surface of concepts and YAML.
- **Operational complexity**: networking, upgrades, security, observability. Most teams use a [managed service](/t/managed-kubernetes) rather than running it themselves.
- **Overkill for small systems.** A single service on a simple platform may need far less ([do you need Kubernetes?](/t/do-you-need-kubernetes)).

For developers, the practical skills are: reading and writing deployment manifests, `kubectl` basics, understanding probes and resource limits, and debugging a pod that won't start (for example [CrashLoopBackOff](/t/crashloopbackoff)).
