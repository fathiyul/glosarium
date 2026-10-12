---
title: "OpenAPI"
summary: "A standard format for describing REST APIs."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["openapi", "swagger", "openapi spec"]
prereqs: ["rest", "json-schema"]
related: ["api-contract", "api-documentation", "api-client-sdk"]
---

**OpenAPI** (formerly Swagger) is the standard description format for REST APIs: endpoints, parameters, request/response schemas, auth, all in one machine-readable document. From it flow interactive docs, client SDKs, server stubs, mocks and contract tests — one source of truth feeding the whole ecosystem.

```yaml
paths:
  /orders/{id}:
    get:
      parameters: [{name: id, in: path, required: true, schema: {type: integer}}]
      responses: {'200': {description: ok, content: {application/json: {schema: {$ref: '#/components/schemas/Order'}}}}}
```

Its power is leverage: write the description once, generate everything. Its failure mode is drift — a spec describing last quarter's API is worse than none, because generated clients and tests then encode lies.

The classic mistakes:

- Spec drifting from reality. The top OpenAPI failure. Generate the spec from code annotations, or test conformance in CI — never maintain it by hand alongside separately.
- Documenting only the happy path. Missing error schemas, auth requirements and edge statuses leaves consumers guessing exactly where they need certainty. Spec the failures.
- Ignoring examples. Schemas without examples are abstract; examples make integration concrete. Include them per resource and per error.
- No versioning story. A spec that silently mutates breaks generated clients. Version the API and the spec together.
- Writing YAML by hand at scale. Large hand-edited specs accumulate inconsistency. Prefer code-first generation with review, or split and `$ref` composition.
- Assuming generation equals quality. Generated SDKs need ergonomic review; generated docs need prose. The spec is raw material, not finished product.
- Skipping validation. An invalid spec breaks every downstream tool. Lint and validate it in CI.

**How to use it:** spec as source of truth, generated from code or strictly conformance-tested, with examples, errors and auth covered. Done right, it's the contract, the docs and the SDK factory in one file.
