---
title: "Reverse ETL Use Cases"
summary: "Syncing warehouse data to CRMs, ad tools and support systems."
levels: { data-engineer: mid-level }
aliases: ["reverse ETL examples", "warehouse to CRM", "data activation", "operational analytics"]
prereqs: ["reverse-etl", "data-serving"]
related: ["customer-data-platform", "feature-store", "semantic-layer", "data-warehouse", "idempotent-pipeline"]
---

[Reverse ETL](/t/reverse-etl) pushes modelled data from the warehouse back into the operational tools people work in every day, such as a CRM, an ad platform or a support desk. The warehouse is good at combining many sources; the tools are where action happens. This page lists the common cases and the traps.

Typical examples:

- Sales: sync a lead score or account health flag into the CRM so reps see who to call.
- Marketing: push an audience segment into an ad platform or email tool to target it.
- Support: add a customer's plan tier or churn risk to the support system so agents have context.
- Product and lifecycle: flag at-risk accounts or power users for a campaign.

## The classic mistake

Syncing a raw or duplicated table straight into the tool. Operational systems usually expect **one row per entity** and a stable key, so if you push the same customer twice you get duplicate records, and if you push a stale value you overwrite a good one. Build the payload as a clean, deduplicated dataset keyed by a stable id, and make the sync [idempotent](/t/idempotent-pipeline) so reruns update rather than duplicate.

## Design points

- Transform first. Do the joins and logic in the warehouse, and sync the finished result, not raw events. A [semantic layer](/t/semantic-layer) or modelled tables give one agreed definition.
- Choose the key carefully. Match the target system's identifier (email, account id) and handle missing or changed keys.
- Decide the cadence. Most syncs run on a schedule, so the tool is minutes to hours behind. If the tool must react in seconds, use events or streaming instead.
- Respect the **source of truth**. Some fields are owned by the CRM; overwriting them from the warehouse causes fights. Write only the fields the warehouse owns ([data ownership](/t/data-ownership)).
- Handle privacy. Personal data leaving the warehouse widens its reach. Apply [governance](/t/data-governance) rules and mask or omit [PII](/t/pii) where it is not needed.

## When not to use it

Reverse ETL is for pushing warehouse results to SaaS tools. If the destination already has the data, or the data already flows in through a [customer data platform](/t/customer-data-platform), you may be duplicating a pipeline. If you need real-time behaviour, or the operational system should stay the system of record, events or an API are a better fit. And if nobody has agreed what the field means, you are just moving disagreement downstream.
