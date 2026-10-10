---
title: "DAC, MAC and PBAC"
summary: "Owner-controlled, centrally mandated and policy-based access control."
levels: { backend: senior }
---

DAC, MAC, and PBAC describe different approaches to deciding who can access a resource. In Discretionary Access Control (DAC), an owner or delegate can grant access. Mandatory Access Control (MAC) uses centrally enforced classifications and rules that users cannot override. Policy-Based Access Control (PBAC) evaluates explicit policies, often using roles, attributes, and context; terminology can vary between organizations.

These labels are useful for discussing where authority lives, but a real application may combine models. A document owner might share a file (DAC), while a central policy prevents access to records above a user's clearance (MAC). A policy engine may also check time, location, or employment status. Be precise about your system's actual semantics rather than selecting a model name as a substitute for design.

Choose a model that matches governance needs and operational complexity. Centrally mandated rules offer consistency but can be rigid; owner-managed sharing is flexible but can spread access widely. Policy-based systems are expressive but need clear ownership, testing, and auditability.

Backend engineers should enforce decisions at the API and resource boundary. Define defaults for missing attributes and conflicts between policies. See [ABAC](/t/abac), [RBAC](/t/rbac), and [ReBAC](/t/rebac).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
