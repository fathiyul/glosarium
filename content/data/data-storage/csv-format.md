---
title: "CSV"
summary: "The simplest tabular format, and its quoting, encoding and type pitfalls."
levels: { data-engineer: junior, backend: junior , data-scientist: junior }
aliases: ["CSV files", "comma-separated values format", "CSV file format", "delimited files", "TSV"]
prereqs: ["file-ingestion"]
related: ["csv-import-export", "row-vs-columnar-formats", "json-lines", "compression-codecs", "schema-drift"]
core: [data-engineer]
---

**CSV** is a plain-text table: one record per line, fields separated by a delimiter (usually a comma). Every tool can read and write it,
which makes it the universal exchange format, and a frequent source of data problems.

```csv
order_id,customer,amount,created_at
917,"Smith, Ana",129.50,2024-06-01T09:30:00Z
918,Bo,,2024-06-01T09:31:12Z
```

## What CSV doesn't give you

- **No types.** Everything is text. Is `007` the number 7 or an ID? Is `2024-06-01` a date? Is the empty field null or an
  empty string?
- **No schema.** Nothing guarantees column order or names across files, and columns can be added, reordered or renamed without
  warning ([schema drift](/t/schema-drift)).
- **No standard.** Delimiters (`,` `;` tab), quoting, escaping, line endings and encodings vary. A newline inside a quoted field breaks naive line-based readers.
- **No compression or indexing**, so it's large and slow for analytics.

## Pitfalls for data pipelines

| Pitfall | Example |
|---|---|
| Encoding | UTF-8 vs Windows-1252 vs a BOM at the start of the file |
| Delimiter inside data | A comma in `Smith, Ana`, hence the quotes |
| Locale numbers and dates | `1.234,50` or `03/04/2024` |
| Leading zeros and big numbers | IDs mangled by spreadsheets: `00123` → `123`, long numbers → `1.23E+15` |
| Header problems | Missing, duplicated or changed names |
| Type inference | A reader that guesses types from the first 100 rows, then fails on row 5,000 |

## Good practice

- **Provide an explicit schema when reading**, instead of relying on inference. Specify types, null markers, the delimiter and the encoding.
- **Use a real CSV parser** (never `split(",")`), as in [CSV import/export](/t/csv-import-export).
- **Validate** headers, row counts and types on arrival, and quarantine bad rows.
- **Prefer ISO 8601 dates** and UTC, plain decimal points, and `.` or a documented null marker.
- **Compress** (gzip), but note that a gzip-compressed file typically can't be split for parallel reading.
- **Convert to a typed, columnar format** (Parquet) once it's in your platform, and keep the original CSV in the
  [landing zone](/t/landing-zone). See [row vs columnar formats](/t/row-vs-columnar-formats).

When you can choose, ask producers for something better: [JSON lines](/t/json-lines), Avro or Parquet. CSV is fine for small, simple,
human-inspected data.
