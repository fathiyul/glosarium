---
title: "Apache Arrow"
summary: "An in-memory columnar format for moving data between tools without conversion."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["Arrow", "Arrow format", "Arrow IPC"]
prereqs: ["columnar-storage"]
related: ["parquet", "orc", "row-vs-columnar-formats", "apache-spark"]
---

Apache Arrow is a language-independent, in-memory [columnar](/t/columnar-storage) format, plus libraries that read and write it. Two processes that both speak Arrow can hand each other a table of data as a block of memory, with no parsing, no row-by-row copying and no conversion to an intermediate format.

The classic mistake is paying the **serialization tax** over and over. A typical data script converts a database result to JSON or CSV, loads it into pandas, writes it out as Parquet, and reads it back into Spark — several full copies. If each hop supports Arrow, the data can be shared as Arrow record batches, often with **zero copy**. That is why Arrow shows up underneath tools like pandas (through PyArrow), DuckDB, and engines such as [Spark](/t/apache-spark).

Arrow also defines an IPC format and Flight, an RPC protocol for sending Arrow data between services. Those matter when you want the same zero-copy exchange across a network.

## What it is not

- Not a storage format. Arrow is for data in memory; [Parquet](/t/parquet) and [ORC](/t/orc) are the durable on-disk columnar formats. Arrow can be written to disk (the Feather/IPC file format) but that is for fast local interchange, not long-term storage.
- Not a row store. If your access pattern is single-row lookups or frequent updates, a columnar in-memory layout is the wrong shape.
- Not free. Keeping a large table in Arrow memory can use more RAM than expected, so stream it in batches rather than materializing everything.

The trade-off is memory versus CPU: Arrow trades RAM for speed and avoids copies, which suits analytics and interop, less so tiny messages or memory-constrained jobs. When two tools share Arrow, you often get the speed-up for free; when one does not, you are back to converting.
