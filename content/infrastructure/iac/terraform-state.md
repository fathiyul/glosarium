---
title: "Terraform State"
summary: "The record of what infrastructure exists, and why it must be protected."
levels: { backend: senior, data-engineer: senior }
aliases: ["Terraform state", "state file", "tfstate"]
prereqs: ["terraform", "infrastructure-as-code"]
related: ["configuration-drift", "secrets-management", "backups", "cloud-providers"]
---

**Terraform state** is the file where Terraform records the mapping between the resources in your configuration and the real resources in the cloud: "this block corresponds to that instance ID." It's how the tool knows what it manages, what already exists, and what a [`plan`](/t/terraform) should add, change or destroy. Without state, Terraform would have no memory between runs.

That makes the state file important and sensitive:

- It contains secrets. Values you set for resources (database passwords, keys) are stored in state, sometimes in plain text. Treat it as a secret in its own right (see [secrets management](/t/secrets-management)).
- Losing it is serious. Without state, Terraform doesn't know it created your resources and may try to recreate them — or you must reconstruct the mapping by hand.
- Two runs at once corrupt it. Concurrent applies write the same file; the result can be inconsistent. That's what **state locking** prevents.

The standard practice is a **remote backend**: state lives in shared, locked, versioned storage rather than on one engineer's laptop.

```hcl
# illustrative: remote state with locking
terraform {
  backend "s3" {
    bucket = "example-tfstate"
    key    = "prod/terraform.tfstate"
  }
}
```

The classic mistakes:

- Local state. State on one machine means others can't use it and it's one disk failure from gone. Use remote state.
- Committing state to Git. It holds secrets and changes constantly; committing it leaks credentials and creates constant conflicts.
- No locking. Two people applying at once can corrupt state. Enable locking with your backend.
- Editing state by hand. It's a last resort for repair, done carefully and rarely — not a normal workflow.
- Forgetting backups. Remote backends usually version state; make sure yours does, so a bad write is recoverable.

State is the reason Terraform can be [idempotent](/t/idempotence) and can detect [drift](/t/configuration-drift). Look after it like the source of truth it is.
