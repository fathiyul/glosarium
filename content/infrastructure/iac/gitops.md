---
title: "GitOps"
summary: "Git as the source of truth, with agents syncing the cluster to it."
levels: { backend: senior, data-engineer: senior }
aliases: ["GitOps", "gitops workflow", "git as source of truth"]
prereqs: ["infrastructure-as-code", "kubernetes"]
related: ["declarative-infrastructure", "configuration-drift", "terraform", "k8s-deployment", "helm"]
---

**GitOps** is operating systems by keeping their **desired state** in Git and letting an agent continuously reconcile the running system to match. You don't deploy by running a command against a cluster; you open a pull request that changes the Git repository, merge it, and an in-cluster agent notices and applies the change. Git becomes the **source of truth** and the audit log at once.

```text
developer ──PR──▶ Git (desired manifests) ──sync──▶ cluster
                        ▲                              │
                        └──── agent reconciles drift ──┘
```

It's a specific, popular form of [declarative infrastructure](/t/declarative-infrastructure). The core properties:

- Declarative — you store the end state, not the steps.
- Versioned and reviewed — every change is a commit, with history and review.
- Continuously reconciled — an agent keeps comparing cluster state to Git and correcting differences, which closes [drift](/t/configuration-drift) automatically.

The classic mistakes:

- Still changing things by hand. A manual `kubectl edit` is drift; the agent reverts it. That's the point, but it surprises teams new to the model.
- Secrets in Git. Plain secrets don't belong in a repository. Keep them in an external manager and reference them (see [secrets management](/t/secrets-management) and [external secrets](/t/secrets-operators)).
- One giant repository with no ownership. Everything in one place becomes a coordination bottleneck. Split by team or service where it helps.
- Treating Git as the runtime. Git holds the desired state; the agent and cluster do the work. If the agent is broken, Git alone changes nothing.

**When to use it:** it fits Kubernetes well, where [Helm](/t/helm) or plain manifests describe workloads that an agent can sync. For cloud infrastructure, [Terraform](/t/terraform) often plays the "define in Git" role with a CI pipeline applying it. The two combine: GitOps-friendly tooling for the cluster, IaC for the cloud around it.
