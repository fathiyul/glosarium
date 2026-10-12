---
title: "Compression Codecs (Snappy, Zstd, Gzip)"
summary: "Trading CPU for smaller files, and which codecs are splittable."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Snappy", "Zstd", "gzip", "compression codec", "LZ4", "zstandard", "file compression"]
prereqs: ["parquet", "row-vs-columnar-formats"]
related: ["parquet", "orc", "row-vs-columnar-formats", "file-compaction", "csv-format", "columnar-storage"]
core: [data-engineer]
---

A **compression codec** is the algorithm used to shrink data. In data engineering, you pick one for files (Parquet, CSV, JSON lines), messages and backups. The trade-off is **CPU time and speed vs storage size**.

| Codec | Compression ratio | Speed | Notes |
|---|---|---|---|
| **Gzip** | Good | Slowish | Ubiquitous and widely compatible |
| **Snappy** | Moderate | Very fast | Long-time default in many Parquet and Hadoop-era tools. Optimized for speed |
| **LZ4** | Moderate | Extremely fast | Common where throughput matters most |
| **Zstd (Zstandard)** | Very good, tunable | Fast | A strong modern choice: good ratios with high speed, with adjustable levels |
| **Bzip2** | High | Slow | Rarely worth it today |

Exact numbers depend on your data. **Test on your own files** rather than trusting general rankings.

## Splittability

Distributed engines read **different parts of a big file in parallel**. This works only if the format can be **split**:

- **A compressed text file** (`orders.csv.gz`) generally **can't be split**: one task must read it from the start, so a huge gzip file becomes a bottleneck. Use many moderately sized files instead.
- **Columnar formats like Parquet and ORC compress inside** (per column chunk) and carry their own structure, so the **file stays splittable regardless of the codec**. This is a major reason to convert to Parquet ([Parquet](/t/parquet)).

## How to choose

- For **analytical files** (Parquet), **Zstd** or **Snappy** are the usual choices: Snappy for the fastest reads and writes, Zstd for smaller files at similar speed. Gzip when you need broad compatibility.
- For **cold storage and archives**, favor higher compression levels (smaller files; slower to write).
- For **hot paths** (streaming messages, shuffles, temporary data), favor speed (LZ4 or Snappy).
- For **text transfer** (CSV or JSON files shared with partners), gzip is the lingua franca.

```python
df.to_parquet("orders.parquet", compression="zstd")
```

## Things to remember

- **Columnar data compresses better** than row data, since similar values are stored together ([row vs columnar](/t/row-vs-columnar-formats)).
- **Compression saves storage and I/O**, which often makes queries *faster* even though decompression costs CPU, since disk and network are slower than CPUs.
- Already-compressed data (images, video, encrypted data) doesn't compress further.
- Both writers and readers need support for the codec you choose, so check your engines' compatibility.
- Don't compress tiny files into smaller tiny files. The real fix is fewer, larger files ([file compaction](/t/file-compaction)).
