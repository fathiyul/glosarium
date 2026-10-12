---
title: "Managed Ingestion Connectors"
summary: "Tools like Fivetran or Airbyte that sync SaaS and database sources for you."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["Fivetran", "Airbyte", "ELT connectors", "managed connectors"]
prereqs: ["data-ingestion"]
related: ["data-ingestion", "api-ingestion", "log-based-cdc", "schema-drift", "build-vs-buy-data-tools", "etl-vs-elt", "full-vs-incremental-load"]
---

Managed ingestion connectors are prebuilt integrations that copy data from a source (Salesforce, Stripe, Postgres, Google Ads, and hundreds more) into your warehouse. Tools like Fivetran and Airbyte provide them, and you configure a source, a destination and a schedule instead of writing code.

```
Source: Stripe  ──connector (hourly)──▶  warehouse.raw.stripe_charges, ...
```

The tool deals with the unglamorous parts: authentication, paging through the API, rate limits, retries, incremental syncs, and often schema changes. Data usually lands "raw", and you transform it afterwards (the ELT pattern; see [ETL vs ELT](/t/etl-vs-elt)).

## When it's a good fit

- A common SaaS source that thousands of other teams also use, so the connector is well-tested.
- A small team that would rather spend time on modelling than on maintaining API scripts.

## Trade-offs to think about

- **Cost.** Many are priced by data volume or rows changed. A chatty table can get expensive, so watch usage.
- **Control.** You can't always change how data is extracted, which fields are included, or how deletes are represented.
- **Gaps.** A connector may not cover an endpoint or custom field you need, and then you build that part yourself.
- **Schema changes.** Source changes can appear as new or altered columns. Plan for [schema drift](/t/schema-drift).
- Compare the alternatives. Hand-written pipelines give full control but you maintain them. See [build vs buy](/t/build-vs-buy-data-tools).

## Habits

- Keep the raw copy untouched and do cleanup in separate models.
- Monitor sync failures and freshness; "no data arrived" can be silent.
- Understand whether a connector does full or [incremental loads](/t/full-vs-incremental-load), and how it detects deletes.
- Check the vendor's current docs, since behaviour and pricing change.
