---
title: "ABAC"
summary: "Attribute-Based Access Control: decisions based on attributes of user, resource and context."
levels: { backend: senior }
related: [rbac, rebac]
---

Attribute-Based Access Control (ABAC) makes authorization decisions using attributes about the subject, resource, action, and sometimes context. A policy might allow a clinician to view a record when they are assigned to the patient, the record belongs to their facility, and the request is made for an approved purpose.

ABAC can express rules that do not fit a simple role list, but policy complexity grows quickly. Define trusted sources for each attribute, how fresh they are, and what happens when one is missing. If a client can set its own `department=finance` claim, that value cannot safely drive an authorization decision. Evaluate policies on the server using verified identity and authoritative resource data.

Keep policies reviewable and test both allow and deny cases, including boundary combinations and changed attributes. Log decisions with enough context for investigation without recording unnecessary sensitive values. A policy engine can improve consistency, but it does not make vague business rules precise automatically.

Backend engineers should separate policy evaluation from request parsing and avoid broad fallback rules. Use ABAC when dynamic context is important; a simpler [RBAC](/t/rbac) model may be easier when permissions map cleanly to stable roles. [ReBAC](/t/rebac) focuses on relationships such as membership or ownership and may complement ABAC.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
