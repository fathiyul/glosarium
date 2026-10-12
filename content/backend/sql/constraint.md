---
title: "Constraints"
summary: "Database rules like NOT NULL, UNIQUE and CHECK."
levels: { backend: junior, data-engineer: junior , data-scientist: junior }
prereqs: ["schema"]
related: ["schema", "null", "junction-table", "relational-database"]
---

A constraint is a rule the database enforces on a table. If a write would break a rule, the database rejects it. The common ones are:

- `NOT NULL`: the column must have a value.
- `UNIQUE`: no two rows can share the same value in this column.
- `PRIMARY KEY`: identifies each row, and is both unique and not NULL.
- `FOREIGN KEY`: the value must match a row in another table.
- `CHECK`: the value must pass a condition.

```sql
CREATE TABLE users (
  id     INTEGER PRIMARY KEY,
  email  TEXT NOT NULL UNIQUE,
  age    INTEGER CHECK (age >= 0)
);

INSERT INTO users (id, email, age) VALUES (1, 'ada@example.com', -5);
-- Error: the CHECK constraint rejects a negative age
```

The database enforces these rules for every writer, whether that's your app, a script, or someone running SQL by hand. That's the main reason to use them.

The classic mistake is relying on application code alone. Validation in a form or an API handler is still useful, but it only protects the paths that go through that code. Use constraints for the rules that must always hold, and keep application validation for better error messages. Constraints are part of your [schema](/t/schema), so they should be reviewed like any other change.
