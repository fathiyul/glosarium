---
title: "Migration Tools"
summary: "Tools like Flyway, Alembic, Prisma Migrate and Rails migrations."
levels: { backend: junior, data-engineer: junior }
aliases: ["database migration tool"]
prereqs: ["schema-migration"]
related: ["schema-migration", "rollback-migration", "expand-contract-migration", "seed-data"]
---

A migration tool applies changes to your database schema in a controlled order. Each change is a file in version control, and the tool keeps a record of which ones have run in each database. Flyway, Alembic (for Python and SQLAlchemy), Prisma Migrate and Rails migrations all work this way, with different file formats and commands.

Alembic, as one example, works like this:

```sh
alembic revision --autogenerate -m "add email to users"   # write a migration file
alembic upgrade head                                       # apply all pending migrations
```

The `--autogenerate` step compares your models with the database and writes a draft. Read the draft before you apply it, because autogeneration can miss changes, such as some renames, and it won't know what you intended.

The classic mistake is editing a migration after it has already run in a shared environment. The tool then sees a file it has already recorded as applied, and the databases drift apart. Make a new migration for each further change instead. For the reasoning behind schema changes, see [schema migration](/t/schema-migration).
