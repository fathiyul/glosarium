---
title: "Health Check"
summary: "An endpoint reporting whether the service is alive and ready."
levels: { backend: junior }
aliases: ["healthcheck", "/health endpoint"]
prereqs: ["http-request"]
related: ["reliability", "kubernetes", "load-balancer", "monitoring"]
also: [reliability, kubernetes]
---

A health check is an endpoint that reports whether your service is running and able to serve requests. Load balancers, orchestrators and monitoring tools call it on a schedule and act on the answer. Many teams use a path such as `/health` or `/healthz`.

```python
@app.get("/health")
def health():
    return {"status": "ok"}, 200
```

Health checks often come in two kinds. A liveness check asks whether the process is stuck and needs a restart. A readiness check asks whether it can take traffic right now. [Kubernetes](/t/kubernetes) uses both as separate probes, and many other platforms have similar ideas.

The classic mistake is making the health check do real work, such as querying the database on every call. If the database has a brief problem, every instance fails its check at once. The platform may then restart them all, which makes things worse. Keep the basic check cheap, and let it report only what it needs to. Dependency checks belong in a readiness probe, designed carefully so one slow dependency doesn't take the whole service out. See [reliability](/t/reliability) for the broader picture.
