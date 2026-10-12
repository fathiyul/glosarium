---
title: "JSON Schema"
summary: "A vocabulary for validating the structure of JSON."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["json schema", "json validation", "schema validation"]
prereqs: ["json", "input-validation"]
related: ["openapi", "input-validation", "api-contract"]
---

**JSON Schema** declares the expected shape of JSON: types, required fields, formats, ranges, nesting. Validators enforce it at boundaries — requests, configs, events, files — so malformed data fails fast with a clear error instead of corrupting downstream logic.

```json
{ "type": "object", "required": ["id", "email"],
  "properties": { "id": {"type": "integer"},
                  "email": {"type": "string", "format": "email"} } }
```

Beyond validation it generates documentation, drives code and test generation, and versions alongside the data it describes. [OpenAPI](/t/openapi) embeds it for request/response bodies.

The classic mistakes:

- Validating nowhere. A schema nobody enforces is documentation with extra steps. Wire it into request validation, consumers, or CI — at least one enforcement point.
- Over-strict schemas. Rejecting unknown fields (`additionalProperties: false` everywhere) breaks additive evolution; clients can't add a field without breaking old validators. Allow extension where compatible.
- Under-strict schemas. `{"type": "object"}` validates everything and nothing. Constrain what matters: required fields, types, formats, ranges.
- `format` as validation. In many validators `format: email` is annotation-only, not enforced. Assert what's critical with patterns or real checks.
- Schema drift. The schema says one thing, the code another, the docs a third. Generate one from another, or test conformance.
- Giant all-or-nothing schemas. A 2000-line schema for a whole API is unreviewable. Compose small reusable definitions (`$ref`) per resource.
- Ignoring error quality. Raw validator errors are cryptic. Map them to user-facing messages at the boundary.

**How to use it:** schema per resource/event, enforced at ingress, tolerant of additive fields, composed from shared definitions. It's the cheapest contract an API or pipeline can have — validation that pays for itself the first time it rejects garbage early.
