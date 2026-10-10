---
title: "Service Account"
summary: "An identity for software rather than a person."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["service account", "workload identity", "machine identity"]
prereqs: ["iam", "iam-policy"]
related: ["least-privilege", "rbac", "k8s-namespace", "authentication-vs-authorization", "secrets-management"]
---

A **service account** is an identity for software instead of a person. When an application calls a cloud API, reads from a database, or deploys to a cluster, it has to prove who it is. A human logs in; a program can't, so it uses a service account — a non-human principal with its own credentials and permissions. In cloud platforms these are often called IAM service accounts or roles.

Attach an [IAM policy](/t/iam-policy) to the account, and the workload can do exactly those actions:

```text
service account: reports-loader
  policy: read from bucket "reports", write to dataset "analytics"
```

Kubernetes has its own **ServiceAccount** objects. A pod runs as one, which [RBAC](/t/rbac) uses to decide what it may do against the cluster API. It's a different mechanism from cloud IAM, though modern clusters can link the two so a pod assumes a cloud identity without any static key — often called workload identity or IRSA depending on the platform.

The classic mistakes:

- Long-lived keys. Downloading a JSON key for a service account and pasting it into config is the common path to a leak. Prefer short-lived credentials that are issued to the workload, and rotate anything static (see [secrets management](/t/secrets-management)).
- One account shared by many apps. Their permissions blur together, and you can't tell which app did what. Give each workload its own identity.
- Over-broad permissions. A service account is easy to give `*`; resist. Apply [least privilege](/t/least-privilege) and expand on demand.

Service accounts answer *who* the software is; [authentication versus authorization](/t/authentication-vs-authorization) is the pair of questions they help resolve. Scope them per environment and per [namespace](/t/k8s-namespace) where possible, and audit which ones can be assumed.
