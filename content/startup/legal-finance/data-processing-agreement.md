---
title: "Data Processing Agreement"
summary: "The contract covering how you handle a business customer's personal data."
levels: { tech-entrepreneur: pmf }
aliases: ["data processing agreement", "DPA", "data processing addendum"]
prereqs: ["privacy-policy", "master-service-agreement"]
related: ["privacy-policy", "master-service-agreement", "uu-pdp", "gdpr"]
---

A **data processing agreement (DPA)** governs how you (the processor) handle personal data on a business customer's (the controller's) behalf: what you may do with it, where it lives, who else touches it (sub-processors), how breaches are handled, and what happens at termination (return or delete). Enterprise deals stall without one; regulated customers cannot legally buy without one.

```text
covers:  scope + purposes only · security measures · sub-processor list + change notice
         breach cooperation + audit rights + return/deletion at end + cross-border terms
```

Maintain a standard DPA reflecting your actual architecture (regions, sub-processors, retention) so sales answers "send your DPA" in hours. Custom redlines per deal scale poorly — standardize the 90% and negotiate the remainder deliberately.

The classic mistakes:

- No DPA to send. Enterprise procurement asks; scrambling a first draft mid-deal delays quarters and signals immaturity. Draft with counsel before the first enterprise conversation.
- Promises architecture cannot keep. "EU-only storage" while backups replicate globally, or deletion promises the database cannot execute. Every DPA clause needs an engineering owner confirming feasibility.
- Sub-processor sprawl undisclosed. Fifteen analytics, support and AI tools touching customer data, half unknown to legal. Inventory processors continuously; publish the list; notify changes per the DPA's terms.
- Deletion theater. "Deleted" rows flagged active, backups retained indefinitely, logs full of PII. Deletion must work end-to-end (primary, replicas, backups on rotation, logs) or the clause is a lie waiting for an audit.
- One-sided review. Signing customer DPAs shifting unlimited liability and audit burdens without reading. Review every word; DPAs allocate breach costs that dwarf the contract value.

**Pair with:** real [privacy practice](/t/privacy-policy) (the DPA describes operations that must exist), [UU PDP](/t/uu-pdp)/GDPR alignment per market, and security posture ([baseline](/t/startup-security-baseline)) that makes the promises true.
