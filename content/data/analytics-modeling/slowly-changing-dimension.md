---
title: "Slowly Changing Dimension (SCD)"
summary: "Handling attributes that change over time, like a customer's address."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["SCD", "slowly changing dimensions", "changing dimensions", "dimension history", "tracking dimension changes"]
prereqs: ["dimension-table"]
related: ["scd-types", "surrogate-key-dw", "dimension-table", "fact-table", "dimensional-modeling", "record-history"]
core: [data-engineer]
---

Dimension attributes aren't fixed forever. A customer moves, a product changes category, an employee changes department, a store is reassigned to a new region. They change **slowly** (not with every transaction), but they do change, and your reports need to decide what that means for **past** data.

The question: when a customer moves from Jakarta to Singapore, **should last year's orders count toward Jakarta or Singapore?**

- If **Singapore** (the current value): history gets rewritten whenever things change. Last year's Jakarta revenue shrinks retroactively.
- If **Jakarta** (the value at the time): reports reflect what was true when each order happened.

Neither is universally right. It depends on the business question. A **slowly changing dimension (SCD)** is a dimension designed with an explicit answer for each attribute.

## The approaches

The standard patterns ([SCD types](/t/scd-types)):

| Approach | In short |
|---|---|
| **Type 1** | Overwrite the old value. Simple, but history is lost |
| **Type 2** | Add a new row for each version, with validity dates. History preserved |
| **Type 3** | Keep a "previous value" column |

For Type 2, facts reference the **version** of the dimension row that was current at the time of the event, using a surrogate key ([surrogate keys](/t/surrogate-key-dw)).

## How to decide per attribute

Ask the people who use the report: *"If this value changes, should old transactions show the old value or the new one?"*

- **Region used to attribute sales to a sales team** → probably the value at the time (Type 2).
- **A misspelled name that was corrected** → overwrite (Type 1).
- **Current account manager for outreach** → the latest value (Type 1).

Decide **per column**, not per table, and document it ([documenting datasets](/t/documenting-datasets)).

## Practical considerations

- **You need to detect changes.** Source systems that overwrite rows in place leave no history unless you capture snapshots or changes ([change data capture](/t/change-data-capture), snapshots).
- **History starts when you start tracking.** You can't reconstruct what you never recorded.
- **Late-arriving changes** (a move recorded after the fact) complicate things, since facts may need re-pointing.
- **Track only what matters.** Type 2 on every column creates a version for each trivial change.
- **Test**: for each business key, exactly one current row, and non-overlapping validity ranges.
- Compare with keeping a full audit trail of row changes in an application database ([record history](/t/record-history)). SCDs are the analytical, query-friendly version.
