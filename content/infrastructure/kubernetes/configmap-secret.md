---
title: "ConfigMap and Secret"
summary: "Configuration and sensitive values injected into pods."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["k8s configmap", "kubernetes secret", "config injection"]
prereqs: ["kubernetes", "pod"]
related: ["secrets-management", "k8s-deployment", "k8s-namespace", "twelve-factor-app", "helm"]
---

Good containers keep configuration out of the image so the same artifact runs in every environment (see [twelve-factor app](/t/twelve-factor-app)). Kubernetes provides two objects for that: **ConfigMap** for ordinary settings and **Secret** for sensitive ones. Both hold key–value pairs, and pods consume them either as environment variables or as files in a mounted volume.

```yaml
apiVersion: v1
kind: ConfigMap
metadata: { name: app-config }
data:
  LOG_LEVEL: info
  CACHE_SIZE: "256"
---
apiVersion: v1
kind: Secret
metadata: { name: app-secret }
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQ=   # base64 of "password"
```

The classic and dangerous mistake is believing a Secret is secret. By default a Secret is only **base64-encoded**, which is not encryption — anyone who can read the object can decode it. It's stored in the cluster's datastore and shows up in `kubectl get secret -o yaml`, in logs, and in anything that prints environment variables. Never put a real password in a ConfigMap, and never commit either kind to git.

More traps:

- Env vars don't update. A mounted file changes when the ConfigMap or Secret changes (after a short delay, and not for `subPath` mounts); an environment variable is set once at container start. Use a volume mount if the app should pick up changes without a restart.
- ConfigMaps aren't for large or binary data — they're for small text configuration.
- Anyone with RBAC access can read Secrets. Lock down permissions and enable encryption at rest.

For real secrets, prefer a dedicated [secrets manager](/t/secrets-management) or an external-secrets operator over plain Kubernetes Secrets, and inject them at runtime. Namespaces scope all of this: a Secret lives in one [namespace](/t/k8s-namespace). See [deployments](/t/k8s-deployment) and [Helm](/t/helm) for templating these objects.
