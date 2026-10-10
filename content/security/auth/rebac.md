---
title: "ReBAC"
summary: "Relationship-Based Access Control, as in Google Zanzibar: access follows relationships like owner or member."
levels: { backend: senior }
related: [rbac, abac]
---

Relationship-Based Access Control (ReBAC) makes access depend on relationships between subjects and resources, such as “user is a member of team,” “team owns project,” or “document is shared with group.” A decision may traverse several relationships rather than checking a single role.

ReBAC fits collaboration products where access follows ownership, membership, and sharing. It can express rules that are awkward as a flat role list, but the relationship graph and consistency model become part of the security boundary. Define how invitations, removals, nested groups, and ownership transfers affect access, and ensure revocation is reflected within an acceptable period.

For example, a user may view a document because they belong to a team that belongs to a workspace. If membership is removed, cached decisions or copied relationships must not keep access longer than intended. Use a well-designed authorization service or a carefully tested model; do not scatter graph traversal and exceptions across handlers.

Backend engineers should make relationship writes authorized and auditable and test indirect paths, not only direct grants. ReBAC can complement [RBAC](/t/rbac) and [ABAC](/t/abac), but more expressive models need stronger tooling and observability. Choose it when relationships are central to product behavior, not just because the model is fashionable.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
