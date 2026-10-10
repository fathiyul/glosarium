---
title: "IAM Policy"
summary: "A document granting permissions on resources."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["iam policies", "permission policy", "json policy"]
prereqs: ["iam", "service-account"]
related: ["least-privilege", "rbac", "secrets-management", "shared-responsibility-model"]
---

An **IAM policy** is a document that says who may do what, on which resources, under what conditions. In cloud platforms it's usually JSON attached to an identity — a user, a group, a [service account](/t/service-account) or a role — and it's evaluated on every API call. The exact shape varies by provider, but the ideas are the same.

A typical statement names the effect (allow or deny), the actions, and the resources:

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::reports-bucket/*"
}
```

Here "s3" and "arn" are AWS terms; Google Cloud and Azure use their own equivalents. The concept — permit these actions on these resources — is common to all.

The classic mistake is the broad policy:

```json
{ "Effect": "Allow", "Action": "*", "Resource": "*" }
```

It works, so it ships, and now a single leaked credential can read every bucket and delete every database. Wildcards are the most common finding in cloud security reviews. Grant the narrowest set that the workload needs — [least privilege](/t/least-privilege) — and add permissions as they're proven necessary.

More traps:

- **Attaching broad policies to assumable roles.** If a role is over-permissive and can be assumed by the wrong principal, the boundary doesn't help.
- **Forgetting explicit denies and boundaries.** Many providers let an explicit `Deny` override — or an outer boundary cap an inner policy — so read the evaluation rules rather than guessing.
- **Long-lived keys.** Even a tight policy is risky with a stolen static key; prefer short-lived credentials (see [secrets management](/t/secrets-management)).

Policies are how much of the [shared responsibility model](/t/shared-responsibility-model) becomes yours: the provider secures the platform, but you decide who inside it can act. In Kubernetes, the comparable mechanism is [RBAC](/t/rbac).
