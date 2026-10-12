---
title: "Data Quality"
summary: "Making sure data is accurate, complete and fresh."
levels: { backend: senior, data-engineer: junior , data-scientist: junior }
aliases: ["data quality management", "DQ", "quality of data", "trustworthy data"]
prereqs: ["data-profiling"]
related: ["data-quality-dimensions", "data-tests", "data-observability", "data-contract", "data-freshness", "data-reconciliation"]
core: [data-engineer]
also: [data-reliability]
---

**Data quality** is whether data is **fit for the purpose it's used for**: accurate, complete, consistent, timely, valid and unique. Bad data leads
to bad decisions, and often goes unnoticed because charts look fine even when the numbers underneath are wrong.

Typical symptoms: duplicate customers, a revenue figure that disagrees with finance, a dashboard showing yesterday's numbers, a join that silently
drops rows.

## Where quality problems come from

- **At the source**: bugs, manual entry errors, missing validation.
- **In transit**: lost, duplicated or late records.
- **In transformation**: wrong joins, wrong filters, definitions that changed.
- **In meaning**: two teams using the same word differently.

## Working on quality

1. **Measure it**: profile the data and define what "good" means ([quality dimensions](/t/data-quality-dimensions)).
2. **Test it automatically** in the pipeline ([data tests](/t/data-tests)), and don't publish data that fails critical checks.
3. **Monitor it** for drift, freshness and unusual volumes ([data observability](/t/data-observability)).
4. **Agree on expectations** with the producers of the data ([data contracts](/t/data-contract)).
5. **Fix problems at the source** when possible, instead of patching them downstream forever.
6. **Assign ownership**, so someone is responsible.
7. **Reconcile** against independent numbers regularly ([data reconciliation](/t/data-reconciliation)).

Perfection isn't the goal. The target is "good enough for each use, and we know when it isn't". Tell consumers about known issues, and
make quality visible.
