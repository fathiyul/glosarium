---
title: "Structured Output"
summary: "Getting models to return valid JSON matching a schema."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["structured output", "JSON output", "constrained output"]
prereqs: ["prompt-engineering", "json-schema"]
related: ["json-schema", "tool-calling", "llm-evals"]
---
**Structured output** asks a model to return data in a defined shape — typically JSON that conforms to a schema — instead of free text. Downstream code can then parse and validate the result like any other input, which makes model output usable inside ordinary software pipelines.

```text
prompt + schema → model → JSON object → validate against schema → use
```

Two levels of enforcement exist. Asking for JSON in the prompt is a request the model may not honour. Constrained decoding or a schema-enforcing feature makes invalid output far less likely, though it does not guarantee the content is correct.

The classic mistakes:

- Parsing without validating. A well-formed JSON object can still have wrong types, missing fields or invented values. Validate against the schema and handle failures.
- Confusing valid with correct. Schema conformance says the shape is right, not that the values are true. Evaluate content separately.
- Over-complex schemas. Deeply nested or heavily optional structures are error-prone. Keep fields flat and well named where possible.
- No retry or repair path. Occasional failures are normal. Define a retry, a repair prompt or a fallback rather than crashing.
- Ignoring enum and range constraints. Free strings where an enum belongs let the model drift. Constrain values in the schema.

**Practice:** define the schema as the contract, validate every response, and test the failure paths as carefully as the happy path.

Log the raw response alongside the parsed result for every failure. Those logs show whether the model drifts from the schema in predictable ways, which can usually be fixed with a clearer field description rather than a more complicated retry loop.
