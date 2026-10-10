---
title: "Embedded Database"
summary: "A database that runs inside your app, like SQLite."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["embedded database", "embedded db", "in-process database"]
prereqs: ["database", "sql"]
related: ["relational-database", "key-value-store", "sql"]
---

An **embedded database** runs **in-process**, inside your application, rather than as a separate server you connect to over the network. The most common example is SQLite: your app links a library, the database is a single file on disk, and queries run locally. No server to start, no connection string, no network hop.

```text
server database:  app ──network──▶ database server ──▶ disk
embedded:         app ────────────▶ database library ──▶ file
```

Where it shines:

- Local and mobile apps — a phone app stores data in SQLite on the device.
- Tests — an in-memory or file-based embedded database gives fast, isolated tests without spinning up a server.
- Small tools and edge cases — a desktop app, a CLI, a single-process service.
- Read-heavy caches — a local copy of reference data.

The classic mistakes:

- Expecting concurrent multi-writer throughput. Embedded databases typically serialise writes (one writer at a time) because there's no server coordinating many clients. For many concurrent writers, a client/server database is the right tool.
- Treating it as a replacement for a shared database in a multi-server app. If several application instances need the same data, an embedded file can't be shared over the network safely. Use a server database.
- Ignoring durability pragmas. For speed, some embedded databases default to settings that can lose the last transactions on a crash. Set the durability options deliberately if data matters.
- Assuming the same SQL as your production database. Dialects differ; code written against SQLite may not run on PostgreSQL or MySQL unchanged. Keep SQL portable or accept the difference.
- Forgetting file-level concerns. Backup, file locking and corruption on an unclean shutdown are your problem when the database is a file.

**When to use it:** for single-process apps, mobile/desktop, tests, and small local stores — anywhere a full server database is overkill. Reach for a client/server database (see [relational database](/t/relational-database)) as soon as you need concurrent writers, network access or centralised backup. It's a different point on the same spectrum, not a lesser database.
