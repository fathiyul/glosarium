---
title: "File-Based Ingestion"
summary: "Loading CSV, JSON or Parquet files dropped in storage or SFTP."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["file-based ingestion", "file ingestion", "SFTP ingestion", "file drops", "batch file loads"]
prereqs: ["data-ingestion", "csv-format"]
related: ["landing-zone", "schema-drift", "csv-import-export", "deduplication", "full-vs-incremental-load", "row-vs-columnar-formats"]
core: [data-engineer]
---

A lot of data still arrives as **files**: a partner uploads a CSV to an SFTP server each night, an export lands in cloud object
storage, an application writes JSON lines. File ingestion picks those up and loads them into your system.

```
partner SFTP / bucket ─► detect new files ─► validate ─► copy to landing zone ─► load into tables ─► archive
```

## What goes wrong

| Problem | Defense |
|---|---|
| **Reading a half-written file** | Wait for a completion signal: a `.done` or `_SUCCESS` marker, a final rename, or a stable size. Ask producers to upload under a temporary name, then rename |
| **Loading the same file twice** (a rerun, or a resend) | Track processed files by name and checksum, and make loads idempotent ([deduplication](/t/deduplication)) |
| **Missing files** | Alert when an expected daily file doesn't arrive by its deadline |
| **Late or out-of-order files** | Use the date inside the data or a sequence number, not just the arrival time |
| **Wrong shape**: new columns, reordered, renamed | Validate the header and types ([schema drift](/t/schema-drift)) |
| **Encoding, delimiter and quoting problems** | Set them explicitly. See [CSV](/t/csv-format) |
| **Bad rows** | Quarantine them with the reason, and don't fail the whole load silently or ignore them |
| **Huge or compressed files** | Prefer splittable or partitioned formats, and stream rather than loading into memory |

## Good habits

- **Copy the original file untouched** into the [landing zone](/t/landing-zone) first. It's your evidence and your way to replay.
- **Record metadata**: file name, size, checksum, arrival time, row count.
- **Check the row count and a checksum** against what the sender says they sent, if they tell you.
- **Archive processed files** instead of deleting them, and apply retention rules.
- **Agree on a contract** with the sender: file naming, format, schema, schedule and who to contact. Changes should be announced.
- **Secure the transfer**: SFTP or signed URLs, least-privilege credentials ([least privilege](/t/least-privilege)).
- **Prefer typed, columnar formats** (Parquet) over CSV when you control the format
  ([row vs columnar](/t/row-vs-columnar-formats)).

Importing a CSV from a user is similar but smaller in scale ([CSV import](/t/csv-import-export)).
