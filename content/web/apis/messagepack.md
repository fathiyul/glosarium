---
title: "MessagePack"
summary: "A compact binary alternative to JSON."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["messagepack", "msgpack", "message pack"]
prereqs: ["json", "protocol-buffers"]
related: ["protocol-buffers", "avro", "json"]
---

**MessagePack** serialises JSON-like values (maps, arrays, strings, numbers) into compact binary — same shape as JSON, a fraction of the bytes, faster to parse. It's **schema-less**: no IDL, no codegen, values carry their own types — so any JSON document encodes directly, and dynamic languages adopt it with a library call.

```text
{"id": 7, "tags": ["a","b"]}  →  ~15 bytes binary (vs ~30 JSON)
```

That positions it between JSON (universal, verbose) and protobuf/Avro (compact, schema-bound): smaller and faster than JSON with zero contract machinery, but without evolution rules, codegen types, or cross-team governance. Caches, queues, realtime payloads and game protocols are its natural habitat.

The classic mistakes:

- Expecting schema evolution. Adding meaning to fields works only by convention — old readers can't skip what they don't understand the way protobuf can. Version explicitly or accept coupling.
- Using it as a public API format. Opaque binary with no spec punishes integrators. Public contracts deserve JSON/OpenAPI or protobuf; MessagePack serves internal, performance-sensitive paths.
- Assuming it encrypts or validates. It's encoding, not security or correctness. Validate after decode like any other input.
- Debugging without tooling. Binary isn't eyeballable; keep a decoder in the debugging path (CLI, logging hook) or every incident starts with hexdumps.
- Marginal gains on tiny payloads. Sub-hundred-byte messages save little while adding a dependency and opacity. Apply where bytes actually matter.
- Type fidelity traps. JSON-number widths, binary vs string, extension types — cross-language mappings have edges. Test the types you actually send.

**When to choose it:** internal hot paths where JSON's bytes or parse cost hurt and schemas would be overkill — caches, queues, realtime frames. Where contracts span teams or the public, prefer specified formats.
