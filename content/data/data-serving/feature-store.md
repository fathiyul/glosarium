---
title: "Feature Store"
summary: "A shared store of ML features, consistent between training and serving."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["ML feature store", "feature stores", "online feature store", "offline feature store", "Feast"]
prereqs: ["data-product", "aggregate-tables"]
related: ["training-data", "aggregate-tables", "data-serving", "data-versioning", "data-freshness", "data-quality"]
core: [data-engineer]
---

In machine learning, **features** are the input values a model uses (a customer's orders in the last 30 days, average basket size, days since signup). A **feature store** is a system that **defines, computes, stores and serves features** consistently, for **training** models and for **real-time predictions**, and lets teams **share and reuse** them.

## The problems it addresses

**1. Training–serving skew.** Features computed one way in a notebook for training ("30-day order count" via a SQL query) and another way in production code for live predictions often **don't match exactly**, so the model behaves worse in production than in testing. A feature store computes each feature from **one definition**, used in both places.

**2. Point-in-time correctness (avoiding leakage).** When building a training set, a feature must be the value **as of the time of each training example**, not the latest value. Otherwise you leak the future into training and get an overly optimistic model. Feature stores support **point-in-time joins** (as-of joins) ([training data](/t/training-data)).

```
example: "customer 42 churned on 2024-03-01"
feature "orders_last_30d" must be computed as of 2024-03-01, not today.
```

**3. Duplication and inconsistency.** Every team rebuilds "customer lifetime value" differently.

**4. Latency.** Online prediction needs features in milliseconds, which warehouses can't provide.

## Typical architecture

```
raw data / streams ──► feature pipelines (batch + streaming transformations) ──► OFFLINE store (warehouse/lake) ──► training sets
                                                                       └────► ONLINE store (low-latency key-value) ──► model serving
 feature registry: names, definitions, owners, versions, documentation
```

- **Offline store**: large historical data for training and batch scoring.
- **Online store**: the latest feature values per entity (user, item) in a fast key-value store, for real-time inference.
- **Registry / catalog**: definitions, metadata and lineage ([data catalog](/t/data-catalog)).
- **Materialization**: jobs that compute features and populate both stores, kept in sync.

Examples include open-source Feast, and feature store capabilities in cloud and data platforms.

## When you need one

- **Several models share features**, and teams keep reimplementing them.
- **Real-time inference** with features computed from streams or recent history.
- **Skew or leakage problems** have been hurting models.
- A larger ML organization needing governance of features.

## When you probably don't

- A **single model**, batch scoring, with features that live in tables already. A well-organized warehouse table and good pipelines may be plenty ([aggregate tables](/t/aggregate-tables)).
- Small teams where the overhead exceeds the benefit.

## Practical concerns

- **Freshness requirements** per feature, and how late data affects them ([data freshness](/t/data-freshness), [late-arriving data](/t/late-arriving-data)).
- **Backfilling** new features over history.
- **Feature quality and monitoring**: drift, nulls, distributions ([data observability](/t/data-observability)).
- **Ownership and documentation** for each feature ([data products](/t/data-product)).
- **Cost of the online store** and of serving at scale.
- **Versioning**: changing a feature's definition changes model behavior ([data versioning](/t/data-versioning)).

It's an operational data platform component. The principle ("define features once, compute them consistently, and join them correctly in time") is valuable even without the product.
