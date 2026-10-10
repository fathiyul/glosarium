---
title: "Data Catalog"
summary: "A searchable inventory of datasets, their meaning and their owners."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["data catalogue", "data discovery", "dataset catalog", "metadata catalog", "data inventory"]
prereqs: ["data-dictionary", "data-ownership"]
related: ["data-dictionary", "data-lineage", "data-governance", "data-catalog-metastore", "data-classification", "metadata-types"]
core: [data-engineer]
---

A **data catalog** is a **searchable inventory of your organization's datasets**: what exists, what it means, who owns it, how fresh it is, and whether you should trust it. It's the "search engine and library card catalog" for data, so people find and understand data without asking around in chat.

## What it typically holds

- **Dataset and column descriptions** (the [data dictionary](/t/data-dictionary)) and business glossary terms.
- **Owners and contacts** ([data ownership](/t/data-ownership)).
- **Technical metadata**: schemas, locations, sizes, update times ([metadata types](/t/metadata-types)).
- **[Lineage](/t/data-lineage)**: where it came from and what depends on it.
- **Quality and freshness indicators**, certifications ("trusted" or "deprecated").
- **Classification and sensitivity tags** (PII, financial) and access information ([data classification](/t/data-classification)).
- **Usage information**: popular tables, who queries them, example queries.

Much of it is **harvested automatically** from the warehouse, orchestrator and BI tools, and **enriched by people** with descriptions and tags.

## Why it matters

- **Discovery**: "is there already a table with weekly active users?" Without a catalog, people rebuild the same dataset five times, differently.
- **Trust**: knowing the owner, freshness and certification, an analyst can choose the right table.
- **Onboarding**: new people learn what data exists.
- **Governance and compliance**: knowing where sensitive data lives, who can access it, and what a change would affect ([data governance](/t/data-governance)).
- **Impact analysis** before changing or dropping a table.

## Catalog vs metastore

A **[metastore](/t/data-catalog-metastore)** is the technical registry engines use to find tables and files. A **data catalog** is the human-facing layer on top (search, documentation, lineage). Some products offer both.

## Making it useful (the hard part)

A catalog is only as good as its contents:

- **Descriptions go stale** or never get written. Embed documentation in the workflow (written in code, reviewed in pull requests) and sync it in ([documenting datasets](/t/documenting-datasets)).
- **Assign owners** who are responsible for their datasets' metadata.
- **Show quality and freshness** so users can judge at a glance.
- **Make it where people already work**: links from BI tools and the query editor.
- **Start small**: the most important, most used datasets first, rather than cataloging everything poorly.
- **Measure adoption.** An unused catalog is shelfware.
