---
title: "JSON Lines"
summary: "One JSON object per line, easy to stream and append."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["JSONL", "NDJSON", "newline-delimited JSON"]
prereqs: ["json"]
related: ["json", "csv-format", "row-vs-columnar-formats", "file-ingestion", "parquet", "bounded-vs-unbounded"]
---

JSON Lines (also called JSONL or NDJSON, for newline-delimited JSON) is a file format with **one complete JSON object per line**.

```
{"event": "signup", "user_id": 1, "ts": "2026-03-01T09:00:00Z"}
{"event": "login", "user_id": 1, "ts": "2026-03-01T09:05:12Z"}
{"event": "purchase", "user_id": 1, "amount": 19.99}
```

Compare with a normal JSON file holding an array: `[ {...}, {...}, {...} ]`. That file must be read as a whole before you know it is valid, and appending means editing the end of the file.

## Why data teams like it

- **Streams well.** Read it one line at a time without loading it all into memory.
- **Easy to append.** New records are just new lines.
- **Fault tolerant.** A bad line affects only that record, not the whole file.
- Splittable. A big file can be cut at line boundaries and processed in parallel.
- Flexible. Each line can have different fields, which suits logs and events.

```python
import json

with open("events.jsonl") as f:
    for line in f:
        record = json.loads(line)
        print(record["event"])
```

## Things to watch

- Newlines inside values must be escaped (`\n`); each record has to stay on one physical line. Standard JSON serializers do this for you.
- No schema. Types can drift between lines (`"amount": "19.99"` vs `19.99`), and fields come and go. Validate on ingestion. See [schema drift](/t/schema-drift).
- Bigger than binary formats. Field names repeat on each line and it compresses less efficiently than columnar formats. For analytics at scale, convert to [Parquet](/t/parquet). See [row vs columnar formats](/t/row-vs-columnar-formats).
- Compressing the files (e.g. gzip) saves space, at the cost of splitting.

It is a good "landing" format for raw event data.
