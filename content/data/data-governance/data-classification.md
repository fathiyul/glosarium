---
title: "Data Classification"
summary: "Labeling data by sensitivity: public, internal, confidential, restricted."
levels: { data-engineer: mid-level , data-analyst: senior , data-scientist: mid-level }
aliases: ["data sensitivity classification", "sensitivity labels", "data sensitivity levels", "classifying data"]
prereqs: ["data-governance", "data-catalog"]
related: ["data-governance", "pii", "data-masking", "column-level-security", "data-catalog", "data-retention"]
---

Data classification is labelling data by how sensitive it is, so you can decide who may see it and what controls it needs. A common scheme has four levels: public (safe to share), internal (fine for employees, not outsiders), confidential (need-to-know, such as contracts or customer lists), and restricted (the most sensitive, such as payment data, health data or national IDs). Names and counts differ between organisations; what matters is that the levels are defined and used consistently.

It comes first because you cannot protect what you have not found. The classic mistake is a new column of national IDs landing in the warehouse and inheriting the default "everyone in the analysts role can read it", because nobody tagged it. Access rules, masking and retention policies then have nothing to key off.

## How it gets done

- Tag at the source or in the catalog. People mark columns and tables with a level, ideally when the dataset is created ([data catalog](/t/data-catalog), [data ownership](/t/data-ownership)).
- Detect automatically. Scanners match patterns (card numbers, emails) and classifiers guess from column names and sample values. Treat their output as a suggestion to review, not the truth.
- Propagate through lineage. A table built from restricted columns is usually restricted too, unless the transformation genuinely removes the sensitive part ([data lineage](/t/data-lineage)).
- Drive controls from the tag. The level decides masking, [column-level security](/t/column-level-security), retention and audit ([data masking](/t/data-masking), [data retention](/t/data-retention)).

Overlapping regimes have their own labels; map them to your levels rather than inventing a scheme per regulation. [PII](/t/pii) is the most common one.

## Trade-offs

**Over-classifying everything as restricted** makes data unusable and pushes people to work around the rules.

**Under-classifying leaks.** A missed tag is a silent hole, so review high-risk systems by hand.

**It goes stale.** New columns and renamed fields need re-scanning; automate it and re-check on schema changes.

**Automated detection is imperfect**, with both false positives and misses.

Start with the most sensitive data (personal, financial, health) and the most used tables, rather than trying to classify everything at once.
