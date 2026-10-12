---
title: "JSON"
summary: "The text data format most APIs speak."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["JavaScript Object Notation", "JSON data", "JSON format"]
related: ["request-response-body", "json-schema", "serialization", "rest", "xml", "yaml"]
core: [backend, frontend]
---

**JSON** (JavaScript Object Notation) is a text format for structured data, and the format most web
APIs use. It's easy for people to read and for programs to parse.

```json
{
  "id": 42,
  "name": "Ana",
  "active": true,
  "tags": ["admin", "beta"],
  "address": { "city": "Jakarta", "zip": null }
}
```

## The rules

JSON has only six kinds of value:

| Type | Example |
|---|---|
| Object | `{ "key": "value" }` |
| Array | `[1, 2, 3]` |
| String | `"hello"` (double quotes only) |
| Number | `42`, `-1.5`, `2e3` |
| Boolean | `true`, `false` |
| Null | `null` |

Strict syntax trips people up. JSON does **not** allow:

- single quotes (`'name'`),
- **trailing commas** (`[1, 2,]`),
- **comments**,
- unquoted keys,
- `undefined`, `NaN` or functions.

It has **no date type**: dates travel as strings (usually [ISO 8601](/t/iso-8601)) or numbers, and
you convert them yourself.

## Using it in code

```js
const obj = JSON.parse('{"id": 42}');        // text → object
const text = JSON.stringify(obj);            // object → text
```

```python
import json
obj = json.loads('{"id": 42}')
text = json.dumps(obj)
```

Parsing invalid JSON throws, so handle that when the input isn't under your control.

## Gotchas

- **Big numbers**: JavaScript reads JSON numbers as doubles, so integers above 2^53 lose precision
  (see [floating point](/t/floating-point)). Send huge IDs as strings.
- **Money**: use integers (cents) or strings, not floats.
- Send `Content-Type: application/json` with it.
- A [JSON Schema](/t/json-schema) can describe and validate the expected shape.

For config files that humans edit, [YAML](/t/yaml) is popular because it allows comments.
