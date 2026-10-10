---
title: "External Secrets in Kubernetes"
summary: "Syncing secrets from a vault into the cluster safely."
levels: { backend: senior, data-engineer: senior }
aliases: ["external secrets", "secrets operator", "secret syncing"]
prereqs: ["configmap-secret", "secrets-management"]
related: ["secrets-management", "k8s-namespace", "least-privilege", "rbac", "service-account"]
---

A Kubernetes [Secret](/t/configmap-secret) is only base64-encoded and lives in the cluster's datastore, so it isn't a great place to be the *source* of truth for credentials. The **external secrets** pattern keeps secrets in a dedicated manager — a cloud secret manager or a vault — and syncs the values into the cluster at runtime. Operators such as the External Secrets Operator, or the secrets-store CSI driver, implement it: you declare which remote secret a Kubernetes Secret should reflect, and a controller fetches it and keeps it current.

```yaml
# apiVersion depends on the operator version you install
kind: ExternalSecret
metadata: { name: db-password }
spec:
  secretStoreRef: { name: cloud-secrets }
  target: { name: db-password }
  data:
    - secretKey: password
      remoteRef: { key: prod/db, property: password }
```

The payoff is a **single source of truth**. Credentials are managed, audited and rotated in one place; the cluster gets a fresh copy instead of a copy someone pasted into a manifest. Secrets never sit in git.

The classic mistakes:

- Keeping secrets in git anyway. If a value is committed in a manifest, the external manager isn't the source of truth. Reference remote secrets; don't inline values.
- Syncing without rotation. A synced Secret can still be a long-lived copy. Make the flow pull updated values (and restart or reload the workload) when the upstream secret changes, so rotation actually takes effect.
- Over-broad access. The controller needs permission to read the remote secrets *and* write Kubernetes Secrets. Scope it tightly — one cluster, one set of paths — not account-wide. See [least privilege](/t/least-privilege) and [RBAC](/t/rbac).
- Ignoring blast radius. A compromised controller or [service account](/t/service-account) could fetch many secrets. Limit which secrets it can reach and in which [namespace](/t/k8s-namespace).
- Assuming it's automatic everywhere. Some setups only sync at pod start; a rotated secret needs the pod to pick it up. Know which behaviour you have.

This pattern is a practical layer of [secrets management](/t/secrets-management): the cluster consumes secrets without becoming their home. It costs an operator and the permissions it needs, so it's worth it when you have real secrets and a real manager — not for a single throwaway token.
