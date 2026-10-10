---
title: "Bulk Loading (COPY)"
summary: "Loading large amounts of data much faster than row-by-row inserts."
levels: { backend: mid-level, data-engineer: junior }
also: [ingestion]
aliases: ["COPY command", "LOAD DATA"]
prereqs: ["crud"]
related: ["transaction", "constraint", "ingestion-connectors"]
---

Bulk loading moves a large file of rows into a table in one operation, instead of sending one `INSERT` per row. Each `INSERT` is a separate round trip and, unless you batch them, a separate transaction, so loading millions of rows that way is slow.

PostgreSQL has a `COPY` command for this. MySQL uses `LOAD DATA`. The syntax differs:

```sql
-- PostgreSQL: the file is read by the database server, so the path must be on that machine
COPY orders FROM '/data/orders.csv' WITH (FORMAT csv, HEADER true);

-- MySQL: LOAD DATA INFILE, subject to server permissions
LOAD DATA INFILE '/data/orders.csv'
INTO TABLE orders
FIELDS TERMINATED BY ','
IGNORE 1 LINES;
```

Both read the file on the database server, so the server must be able to see it and the database user needs permission to load from it. To load a file from your own machine instead, use the client-side variants: `\copy` in `psql`, or `LOAD DATA LOCAL INFILE` in MySQL (which must be enabled). Check the options for your database and version rather than copying either example as-is.

The classic mistake is loading with one transaction per row, with autocommit on, which makes each row its own commit. Load in batches, and wrap each batch in a [transaction](/t/transaction) so a failure can be rolled back. Be aware that [constraints](/t/constraint) still run during the load, so a single bad row can stop it. Some teams drop non-essential indexes before a large load and rebuild them afterward, which is often faster, though the right approach depends on the data and the database.
