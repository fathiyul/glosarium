---
title: "Seed Data"
summary: "Initial data loaded for development or tests."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["seeding", "database seeds"]
prereqs: ["schema-migration"]
related: ["migration-tools", "schema-migration", "idempotence"]
---

Seed data is the initial set of rows a database needs to be useful. It can be reference data that the application requires, such as a list of countries or order statuses, or sample records for development, demos and tests.

```sql
-- Reference data the application requires
INSERT INTO order_statuses (code, label) VALUES
  ('pending', 'Pending'),
  ('shipped', 'Shipped'),
  ('cancelled', 'Cancelled');
```

Keep the two kinds apart. Required reference data belongs in a [migration](/t/migration-tools) so every environment gets it. Sample accounts and fake orders belong in a separate development seed script, and never in production.

Write seed scripts to be idempotent, so running them twice gives the same result instead of duplicate rows. Use a unique key and a conditional insert, or check whether the rows already exist, and see [idempotence](/t/idempotence) for the general idea.

The classic mistake is running a development seed script against production. It can create accounts with known passwords and fill real tables with fake data. Keep seed scripts clearly named, and confirm which database you're connected to before running one.
