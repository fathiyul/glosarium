---
title: "Database"
summary: "Organized, persistent storage for data."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
prereqs: ["variable"]
related: ["relational-database", "schema", "database-client", "crud"]
---

A database is an organized, persistent store for data. Persistent means the data survives when the program that wrote it stops, and organized means it's structured so you can find, filter and change specific pieces quickly.

Applications use databases so that data doesn't live only in memory or in a loose file. When a user saves a profile, the app writes it to the database. When they come back the next day, the app reads it from there.

Databases come in several kinds, each suited to different work. [Relational databases](/t/relational-database) store data in tables and are queried with SQL. Other kinds store documents, key-value pairs or graphs. Pick based on how you need to read and write the data, not on what's fashionable.

The classic mistake is treating a database as a dump for everything. Storing unrelated data in one table, or keeping whole records as opaque text blobs, makes the data hard to query and easy to corrupt. Give the data a [schema](/t/schema), and let the database enforce the rules you care about.
