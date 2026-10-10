---
title: "Liveness and Readiness Probes"
summary: "How Kubernetes checks whether a container is healthy."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["liveness probe", "readiness probe", "startup probe"]
prereqs: ["pod", "health-check"]
related: ["k8s-service", "graceful-shutdown", "crashloopbackoff", "requests-limits"]
---

Kubernetes can't see inside your app, so you tell it how to check health with **probes**. Each is a command or request the kubelet runs on a schedule.

- **Liveness** — "is the process still working?" If it fails repeatedly, Kubernetes restarts the container. Use it to recover from a deadlock, not to check dependencies.
- **Readiness** — "can this pod serve traffic?" Until it passes, the pod is removed from the [Service](/t/k8s-service)'s endpoints, so requests don't land on a container that isn't ready.
- **Startup** — "has the app finished booting?" It holds off the other probes while a slow app starts.

```yaml
livenessProbe:
  httpGet: { path: /healthz, port: 8080 }
  initialDelaySeconds: 10
  periodSeconds: 10
readinessProbe:
  httpGet: { path: /ready, port: 8080 }
  periodSeconds: 5
```

Probes can run an `httpGet`, open a `tcpSocket`, execute a command (`exec`), or call a `grpc` service.

The classic mistakes:

- Checking dependencies in the liveness probe. If it calls the database, a brief database blip restarts every pod — a self-inflicted outage. Liveness should test only the process. Gate dependent readiness on the dependency instead, carefully.
- No readiness probe. Traffic reaches pods the moment they start, before they've loaded config or warmed caches.
- Too-aggressive timing. Short timeouts and low thresholds turn normal slowness into restarts, which shows up as [CrashLoopBackOff](/t/crashloopbackoff).

Tune probes to real startup and load, and combine readiness with [graceful shutdown](/t/graceful-shutdown): when a pod is asked to stop, it should first report unready so in-flight traffic drains before the process exits.
