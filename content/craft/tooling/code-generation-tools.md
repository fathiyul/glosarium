---
title: "Code Generation"
summary: "Generating boilerplate from schemas or templates."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["codegen", "code generator"]
prereqs: ["schema"]
related: ["schema", "api-documentation", "build-artifact", "dependency-hell"]
---

Code generation means producing source code automatically from a description, such as an API schema, a database schema or a template. Clients for an API, types for a database table, and repetitive data classes can all be generated instead of written by hand.

A typical flow starts with the schema as the source of truth:

```
openapi.yaml   --generator-->   client/orders_client.py   (generated, do not edit)
```

The generated files are regenerated whenever the schema changes, so the code always matches the description.

The trade-off is control against consistency. Generated code is consistent and removes a class of hand-typing mistakes, but the output can be verbose, hard to read, and awkward to debug. Changes must go into the schema or template, not the generated file, which is a habit people often forget.

The classic mistake is editing generated files, so the next regeneration silently overwrites the changes. Mark generated files clearly, keep them out of manual edits, and either commit them or regenerate them in the build, consistently across the team. A generator that is out of date with its schema causes the same surprise, so run it in CI to catch drift.
