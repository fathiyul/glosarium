---
title: "Declarative vs Imperative Infrastructure"
summary: "Describing the end state vs listing the steps."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["declarative vs imperative", "declarative infrastructure", "imperative infrastructure"]
prereqs: ["infrastructure-as-code", "idempotence"]
related: ["terraform", "configuration-drift", "immutable-infrastructure", "ansible", "gitops"]
---

There are two ways to tell a tool what you want. **Imperative** instructions list the steps: create this, install that, start the other, in order. **Declarative** configuration describes the end state you want, and the tool works out the steps to get there.

```sh
# imperative: a sequence of commands
gcloud compute instances create web-1 --zone us-central1-a
gcloud compute firewall-rules create allow-http --allow tcp:80
```

```hcl
# declarative: the desired resources
resource "google_compute_instance" "web" {
  name = "web-1"
  zone = "us-central1-a"
}
```

The declarative form says *what*, not *how*. On each run the tool compares the real world to your description and changes only what differs — the basis of [idempotence](/t/idempotence). That's why [Terraform](/t/terraform), Kubernetes and Ansible feel declarative: you re-run them, and they converge rather than repeat.

The classic mistake is mixing the two without realizing it. Running imperative commands alongside a declarative tool means the tool sees changes it didn't make and tries to undo them, or flags [drift](/t/configuration-drift). Pick one source of truth.

Two more traps:

- Expecting declarative tools to infer intent. If you rename a resource, the tool may see "delete old, create new" rather than "rename", because it only knows states, not your reasoning. Plan for that.
- Assuming order doesn't matter. You still describe dependencies (this before that); the tool just figures out the rest.

**When to use which:** declarative for infrastructure you want to keep and reproduce — networks, clusters, environments. Imperative for genuinely one-off, sequence-sensitive scripts, like a data migration. Most modern [infrastructure as code](/t/infrastructure-as-code) is declarative and lives in version control, often with a [GitOps](/t/gitops) workflow.
