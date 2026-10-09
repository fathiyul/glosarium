---
title: "Master Data Management"
summary: "Keeping one authoritative version of core entities like customers and products."
levels: { data-engineer: senior }
aliases: ["MDM", "master data", "golden record", "entity resolution for master data", "reference and master data"]
prereqs: ["data-governance", "conformed-dimension"]
related: ["reference-data", "conformed-dimension", "identity-resolution", "data-governance", "data-ownership", "deduplication"]
core: [data-engineer]
---

**Master data** is the **core business entities that many systems share**: customers, products, suppliers, employees, locations, accounts. **Master data management (MDM)** is the practice of keeping **one authoritative, consistent version** of each (a "golden record") across the organization, instead of a dozen slightly different copies in different systems.

The problem: the CRM, billing, support and marketing systems each have their own record of "the customer", with different IDs, spellings, addresses and statuses. "Ana Putri" in one is "A. Putri" in another. A report asking "how many customers do we have?" gets different answers. Marketing emails a customer who closed their account.

## What MDM involves

1. **Identify and match** records that refer to the same real-world entity across systems: **entity resolution**, using deterministic rules (same tax ID) and fuzzy matching (similar names and addresses) ([identity resolution](/t/identity-resolution), [deduplication](/t/deduplication)).
2. **Merge** them into one golden record, with **survivorship rules** deciding which source wins for each attribute (the billing system's address, the CRM's name, the most recent phone number).
3. **Assign a stable master ID**, and keep a **cross-reference** from each source system's ID to it.
4. **Govern it**: who may change master data, with approval workflows, validation rules and a steward to resolve conflicts ([data ownership](/t/data-ownership)).
5. **Distribute** it: publish the master data to the systems and analytics that need it.
6. **Manage hierarchies and relationships**: product categories, organization structures, parent and child accounts.

## Architectural styles

| Style | How |
|---|---|
| **Registry** | Leave data in source systems. MDM keeps an index of matches and the cross-reference |
| **Consolidation** | Copy and merge into a central hub (often for analytics), without changing sources |
| **Coexistence** | A hub is the master, and changes sync back to sources |
| **Centralized (transactional)** | Create and edit master data only in the hub, and other systems consume it |

## Why it matters for analytics

- **Consistent dimensions**: a clean master customer or product feeds [conformed dimensions](/t/conformed-dimension), so numbers from different processes line up.
- **Trustworthy counts and joins**, without double-counting entities.
- **Compliance**: knowing everything held about a person, for access and deletion requests ([right to erasure](/t/right-to-erasure)).

## Challenges

- **Organizational, not just technical**: departments disagree on definitions and each wants to own "their" customer. Needs executive sponsorship and governance ([data governance](/t/data-governance)).
- **Matching is hard.** False matches merge different people (bad), and missed matches leave duplicates (also bad). Tune and review.
- **Quality of source data** limits everything.
- **Change over time**: people move, companies merge, products are renamed. Keep history ([slowly changing dimensions](/t/slowly-changing-dimension)).
- **Cost and scope creep**: a big-bang MDM programme can take years. Start with **one domain** (customers or products) that causes the most pain, and show value.

**Reference data** (country codes, currency lists, status values) is related but simpler: stable lookup lists managed centrally ([reference data](/t/reference-data)).
