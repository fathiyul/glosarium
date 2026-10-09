---
title: "IAM"
summary: "Identity and access management for cloud resources."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["Identity and Access Management", "AWS IAM", "cloud IAM", "IAM roles", "IAM users"]
prereqs: ["least-privilege", "rbac"]
related: ["iam-policy", "service-account", "least-privilege", "rbac", "secrets-management", "shared-responsibility-model"]
core: [backend]
---

**IAM** (Identity and Access Management) is the cloud provider's system for controlling **who (or what) can do what, on which resources**. Every API call to create a server, read a bucket or query a database is checked against IAM. Getting it right is one of the most important parts of cloud security.

The core pieces (AWS terminology, with close equivalents on other clouds):

| Concept | Meaning |
|---|---|
| **Identity** | A person (**user**), a group, or a **role** that something can assume |
| **Policy** | A document listing allowed (or denied) **actions** on **resources**, optionally with conditions |
| **Role** | An identity with permissions, assumed temporarily by a person, service or another account |
| **Service account / workload identity** | An identity for an application, not a person ([service accounts](/t/service-account)) |

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::orders-exports/*"
}
```

This lets the holder read and write objects in one bucket. Nothing else.

## Good practice

- **Least privilege**: grant only the actions and resources needed, not `*` ([least privilege](/t/least-privilege), [IAM policies](/t/iam-policy)). Start narrow and widen when something specific fails.
- **Use roles for applications, not long-lived access keys.** A service running in the cloud gets temporary credentials automatically through its role, so there's no key to leak ([secrets management](/t/secrets-management)).
- **Give each workload its own identity**, so permissions and audit trails are separate.
- **Avoid using the root or owner account** for daily work. Protect it with MFA and lock it away.
- **Require MFA** for humans, and prefer single sign-on and groups to individual users ([SSO](/t/sso), [MFA](/t/mfa)).
- **Deny by default.** Access exists only if something allows it.
- **Review regularly**: remove unused identities and permissions. Many tools show which permissions were never used.
- **Log and monitor IAM activity** (who assumed which role, which policy changed).
- **Treat IAM changes like code**, defined in version control ([infrastructure as code](/t/infrastructure-as-code)).

## Common mistakes

- Wildcard policies (`"Action": "*", "Resource": "*"`) "to make it work".
- Access keys committed to Git or baked into images ([secrets in Git](/t/secrets-in-git)).
- One shared admin credential for the whole team.
- Forgetting that permissions across accounts and resource-based policies (like bucket policies) also apply.

IAM is part of the cloud's [shared responsibility model](/t/shared-responsibility-model): the provider secures the platform, and you configure who may use it.
