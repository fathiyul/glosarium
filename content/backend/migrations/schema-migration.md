---
title: "Schema Migration"
summary: "A versioned script that changes the database schema."
levels: { backend: junior, data-engineer: junior }
aliases: ["database migration", "DB migration", "migrations", "schema change", "Alembic", "Flyway", "Liquibase"]
prereqs: ["relational-database", "sql-sublanguages"]
related: ["migration-tools", "expand-contract-migration", "zero-downtime-migration", "rollback-migration", "backfill", "migration-locks"]
core: [backend]
---

A **schema migration** is a versioned script that changes the structure of your database: add a table, add a column, create an index.
Instead of editing the database by hand, you commit migrations next to the code, so every environment evolves
the same way, in the same order.

```sql
-- 0007_add_phone_to_users.sql
ALTER TABLE users ADD COLUMN phone TEXT;
CREATE INDEX idx_users_phone ON users (phone);
```

A migration tool keeps a table of which migrations have run, and applies the pending ones in order:

```sh
alembic upgrade head        # Python / SQLAlchemy
python manage.py migrate    # Django
npx prisma migrate deploy   # Prisma
flyway migrate              # Flyway (SQL files, JVM)
```

(See [migration tools](/t/migration-tools).) Many ORMs can generate a migration by comparing your models to the
database. Always read what it generated.

## Rules

- **Never edit a migration that's already been applied** anywhere else. Write a new one. Otherwise environments
  diverge.
- **Keep them small and focused.** One logical change per migration.
- **Run them automatically in deployment**, in all environments, not by hand on production.
- **Migrations run in the same order** everywhere, so don't renumber or reorder them after sharing.
- **Test them** on a copy of production-like data, including the time and locks they take.
- **Keep the app compatible.** During a deploy, old and new code run at once, so schema changes should work with
  both: add things first, remove things later ([expand and contract](/t/expand-contract-migration)).

## Dangerous operations on big tables

Some changes take heavy locks or rewrite the whole table (adding a column with a default, creating a non-concurrent index,
changing a column type), blocking reads and writes while they run. Know what your database does, and use
online techniques where needed ([zero-downtime migrations](/t/zero-downtime-migration), [migration locks](/t/migration-locks)).

## Rolling back

"Down" migrations are useful in development, but in production you usually **roll forward** with a new fix. Dropping a column
can't be undone ([rollback](/t/rollback-migration)).

Filling data into new columns is a separate step ([backfill](/t/backfill)).
