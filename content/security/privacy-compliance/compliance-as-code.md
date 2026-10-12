---
title: "Compliance as Code"
summary: "Automated checks that systems meet policies."
levels: { backend: staff, data-engineer: staff , data-scientist: staff }
---

Compliance as code expresses selected policy requirements as machine-checkable rules, configuration, or tests. Examples include checking that storage is encrypted, access logs are enabled, a deployment uses approved regions, or a repository contains required metadata.

Automation can catch drift consistently and produce evidence, but it only checks the rules someone encoded. A green pipeline does not prove that a legal obligation is satisfied, that the policy is correctly interpreted, or that operational procedures are followed. Keep a clear link between each automated assertion, the policy it represents, its owner, and the evidence it produces.

For example, infrastructure policy can reject a public storage bucket by default. A documented exception may be needed for a public website, but should be scoped, approved, and periodically revisited rather than bypassing the check globally. Avoid encoding ambiguous legal language as a simplistic boolean without review by compliance and engineering owners.

Backend and data engineers can make safeguards repeatable across services and datasets. Platform teams should provide actionable failures and safe exception workflows; noisy controls get disabled. Requirements vary by regulation and contract, so treat code as one evidence source within a broader compliance program. See [security review](/t/security-review), [data residency](/t/data-residency), and [SOC 2](/t/soc-2).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
