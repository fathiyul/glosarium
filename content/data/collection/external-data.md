---
title: "External and Third-Party Data"
summary: "Data you buy, scrape or pull from partners, and the contracts and quality risks it brings."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["third-party data", "external data sources", "bought data"]
prereqs: ["source-systems"]
related: ["source-systems", "web-scraping", "api-ingestion", "file-ingestion", "data-quality", "data-governance"]
---

External or third-party data is data you did not generate yourself: datasets you buy, data shared by partners, public and open data, and data you scrape. It is a [source system](/t/source-systems) you do not control, which is exactly why it needs care.

The classic mistake is treating external data as stable and trustworthy. A partner changes a column name without telling you; a purchased list is months out of date; a public dataset stops updating. Your pipeline silently produces wrong numbers, and because you did not generate the data, you cannot fix it at the source.

## What to check before you use it

- Licence and terms: what are you allowed to do with it, and can you store or redistribute it? Some data may not be usable for certain purposes, and personal data brings privacy obligations you may have no basis for.
- Provenance and freshness: who produced it, how, and how often is it updated?
- Quality: coverage, missing values, duplicates, and how its identifiers match your own records.
- Contract: is there a stable format, an agreed [schema](/t/data-contract), and a contact when it breaks?

## How to handle it

Land the raw data unchanged, then validate and clean it in your own pipeline, and add [quality checks](/t/data-quality) at the boundary so a format change fails loudly rather than quietly. Document the source, licence and refresh cadence next to the dataset. For scraped data, see [web scraping](/t/web-scraping); for API and file delivery, see [API ingestion](/t/api-ingestion) and [file ingestion](/t/file-ingestion).

## When to avoid it

Buying data can be faster than collecting it, but it adds cost, legal exposure and quality risk, and it may be cheaper to collect the same signal yourself. Prefer a small, licensed, well-documented source over a large, unclear one.
