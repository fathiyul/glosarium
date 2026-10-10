---
title: "Data Governance"
summary: "The policies and roles that decide how data is managed and used."
levels: { data-engineer: mid-level }
aliases: ["data governance framework", "data management policies", "governing data", "data stewardship policy"]
prereqs: ["data-ownership", "data-classification"]
related: ["data-ownership", "data-catalog", "data-classification", "data-quality", "data-lineage", "gdpr"]
---

Data governance is the set of policies, roles and processes that decide how data is managed and used across an organisation: who can access it, what it means, how good it must be, how long it is kept, and who is accountable when something goes wrong. It is more organisational than technical, though tooling makes it practical.

Without it, things drift. Every team copies the customer table, defines "active customer" differently, and grants its own access. The classic failure: a regulator or an executive asks "where does this personal data live, who can see it, and who approved it?", and no one can answer.

## What governance covers

- Ownership: a named person or team accountable for each important dataset ([data ownership](/t/data-ownership)).
- Definitions and metadata: a shared [data dictionary](/t/data-dictionary) and [catalog](/t/data-catalog) so terms and columns mean the same thing ([metadata types](/t/metadata-types)).
- Classification and access: labelling sensitivity and enforcing least privilege ([data classification](/t/data-classification), [column-level security](/t/column-level-security)).
- Quality and promises: quality checks and service levels ([data quality](/t/data-quality), [data SLA](/t/data-sla)).
- Lineage and audit: knowing where data came from and what changed ([data lineage](/t/data-lineage)).
- Privacy and retention: collecting only what is needed and deleting it on time ([privacy by design](/t/privacy-by-design), [data retention](/t/data-retention), [GDPR](/t/gdpr)).
- Lifecycle and change: contracts, deprecation, and approval for new uses.

## Trade-offs

Governance that is only documents and committees slows everyone down and gets bypassed. Governance that is absent produces chaos, breaches and untrustworthy numbers. The workable middle is to **match control to sensitivity and value**: strict rules and enforcement for restricted and regulated data, lighter guidance for the rest. Embed the rules in the tools people already use, so compliance is the default rather than an extra step.

Start with the data that matters most and the obligations you actually have, and grow from there. An unused policy is not governance.
