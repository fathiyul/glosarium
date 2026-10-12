---
title: "Structured, Semi-Structured and Unstructured Data"
summary: "Tables, JSON-like records, and free-form text, images or audio."
levels: { data-engineer: junior, backend: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["structured data", "semi-structured data", "unstructured data", "data structure types"]
prereqs: ["data-engineering"]
related: ["source-systems", "dataset", "data-volume-velocity-variety", "json", "schema-drift"]
core: [data-engineer, data-scientist]
---

Data comes in three broad shapes, based on how much structure it has.

| Type | Shape | Examples |
|---|---|---|
| **Structured** | Fixed schema: rows and columns with defined types | SQL tables, spreadsheets, CSV with a stable header |
| **Semi-structured** | Self-describing, with fields and nesting, but flexible | JSON, XML, Avro, log lines in a pattern, event payloads |
| **Unstructured** | No predefined organization | Free text, emails, PDFs, images, audio, video |

```
Structured:       id | name | total          (every row has the same columns)
Semi-structured:  {"id": 1, "items": [{"sku": "A1", "qty": 2}], "coupon": null}
Unstructured:     "Hi, my order never arrived and I'd like a refund..."
```

## Why the difference matters

- **Structured data** is easy to query, validate and join, because the schema is known up front (**schema on write**: you
  enforce the shape when you store it).
- **Semi-structured data** is flexible. Different records can have different fields, and fields can be nested or repeated. It
  fits event payloads and API responses, but needs more care: fields may be missing or change type, and you often work out the
  schema when you read it (**schema on read**). Some warehouses have special types for querying JSON.
- **Unstructured data** has to be processed before it can be analyzed: extracting text, running models over images or audio, creating
  embeddings. It's usually stored as files in object storage with metadata on the side.

## What to do about it

- Land raw semi-structured data **as it arrived**, then parse it into structured tables in a transformation step. Keeping the raw
  copy lets you re-parse when you find a mistake.
- **Expect schemas to drift** in semi-structured sources: new fields, renamed fields, changed types
  ([schema drift](/t/schema-drift)).
- **Choose formats that carry types and schemas** for storage between pipeline stages (columnar formats and Avro) over loose text where you can.
- Most real systems mix all three: a support ticket has structured fields (id, status), semi-structured metadata and an unstructured message.

Most of the analytical value in a business is still in structured data, but unstructured content, such as text and
documents, is increasingly a source for analysis and for AI applications. See [data volume, velocity and
variety](/t/data-volume-velocity-variety).
