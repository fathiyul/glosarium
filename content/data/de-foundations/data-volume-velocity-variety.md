---
title: "Volume, Velocity, Variety"
summary: "The three dimensions that make data \"big\", and which one is actually your problem."
levels: { data-engineer: junior }
aliases: ["3 Vs", "three Vs of big data", "big data 3 Vs"]
prereqs: ["data-engineering"]
related: ["bounded-vs-unbounded", "structured-semi-unstructured", "batch-vs-streaming-ingestion", "distributed-computing", "single-node-engines"]
---

Volume, velocity and variety are the three classic dimensions that make data "big":

| | Question | Examples of "hard" |
|---|---|---|
| **Volume** | How much data? | Terabytes to petabytes, billions of rows |
| **Velocity** | How fast does it arrive and need processing? | Thousands of events per second; answers needed in seconds |
| **Variety** | How many shapes and sources? | Tables, JSON, logs, images, text, many systems |

They matter because each one pushes you toward a different solution.

- High **volume** needs storage and processing that spread across machines, such as a [distributed engine](/t/distributed-computing).
- High velocity needs streaming rather than nightly batches. See [batch vs streaming ingestion](/t/batch-vs-streaming-ingestion).
- High variety needs flexible ingestion and careful modelling to bring different formats together. See [structured vs semi-structured data](/t/structured-semi-unstructured).

## Which one is actually your problem?

This is the useful question. Most teams have one problem, or none. The classic mistake is adopting a big, complex distributed system "because we do big data" when the data would fit on one machine.

A rough check: a modern laptop or single server can process datasets of many gigabytes, sometimes more, with tools like [pandas](/t/pandas) or a [single-node engine](/t/single-node-engines), far faster than a cluster for the same job. Reach for distributed tools when you have measured that you've outgrown one machine.

Variety is the easiest to underestimate: ten source systems with ten definitions of "customer" can be harder than a billion clean rows.

Some people add more Vs (veracity, value). The first three are the common core; the extra ones are less standardized.
