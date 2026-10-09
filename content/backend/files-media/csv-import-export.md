---
title: "CSV Import / Export"
summary: "Moving tabular data in and out, with all its edge cases."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["CSV", "CSV import", "CSV export", "comma-separated values", "CSV parsing"]
prereqs: ["file-storage"]
related: ["data-export", "streaming-large-files", "mime-type", "data-profiling", "input-validation"]
core: [data-engineer]
also: [ingestion]
---

CSV (comma-separated values) is the simplest way to move tabular data between systems and people, which is exactly why every system gets it
slightly wrong. It looks easy until real data arrives.

```csv
id,name,note
1,Ana,"Likes tea, coffee"
2,Bo,"Said ""hello"""
3,Cy,"Line one
line two"
```

## Never `split(",")`

Fields can contain commas, quotes and even newlines (in quotes, with quotes doubled). Use a real CSV library:

```python
import csv
with open("customers.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        process(row["id"], row["name"])
```

## The edge cases that bite

| Problem | What to do |
|---|---|
| **Encoding.** Files from Excel may be Windows-1252 or UTF-8 with a BOM, and names turn into `Ã©` | Decide the encoding explicitly; accept or strip a BOM (`utf-8-sig`) |
| **Delimiters.** Some locales use `;` or tabs | Detect, or let the user choose |
| **Everything is text.** `007` becomes `7`, large IDs turn into `1.23E+15` when a spreadsheet opens and re-saves the file | Parse types yourself; keep IDs as strings |
| **Dates.** `03/04/2024`: March 4 or April 3? | Require ISO 8601 (`2024-04-03`) |
| **Empty vs missing vs null.** `""`, `NULL`, `N/A` | Define and document what means null |
| **Header issues.** Missing, duplicated or reordered columns | Validate headers; read by name, not position |
| **Ragged rows.** Too many or too few fields | Reject or report with the line number |
| **Decimal formats.** `1,234.50` vs `1.234,50` | Specify the format |
| **Huge files** | Stream row by row, don't load everything ([streaming large files](/t/streaming-large-files)) |

## Importing safely

- **Validate every row** ([input validation](/t/input-validation)) and **report errors by line**, so users can fix the file. Decide whether one bad row fails the
  entire import or just that row.
- Do big imports as a [background job](/t/background-job), and make them rerunnable.
- Never trust the file: limit its size and row count.

## Exporting safely

- Quote and escape properly, and write UTF-8 (consider a BOM if Excel is the audience).
- **CSV injection:** a cell beginning with `=`, `+`, `-` or `@` can be executed as a formula when opened in a spreadsheet.
  If an export contains user-provided text, neutralize those leading characters (for example, prefix with a single quote or a space).
- Stream large exports instead of building them in memory.

For machine-to-machine transfers, formats with types and schemas (JSON lines, Parquet, Avro) are safer. CSV remains the common
denominator because everyone can open it.
