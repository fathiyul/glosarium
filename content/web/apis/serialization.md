---
title: "Serialization"
summary: "Converting objects to bytes or text for storage or transfer."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["serialisation", "marshalling", "encoding data", "deserialization"]
prereqs: ["json", "data-type"]
related: ["json", "protocol-buffers", "avro", "yaml", "schema-evolution", "insecure-deserialization"]
---

Serialization converts an in-memory object (a dictionary, a class instance, a list) into bytes or text that can be stored or sent. Deserialization does the reverse. You need it whenever data leaves your program's memory: writing a file, calling an API, putting a message on a queue, caching.

```python
import json
user = {"id": 42, "name": "Ana", "tags": ["admin"]}

text = json.dumps(user)             # serialize: '{"id": 42, "name": "Ana", "tags": ["admin"]}'
back = json.loads(text)             # deserialize: a dictionary again
```

## Common formats

| Format | Style | Good for |
|---|---|---|
| [JSON](/t/json) | text | web APIs, config; human-readable |
| [YAML](/t/yaml) | text | configuration |
| XML | text | older systems, documents |
| [Protocol Buffers](/t/protocol-buffers), [Avro](/t/avro), [MessagePack](/t/messagepack) | binary | compact and fast, with schemas |
| CSV, Parquet | tabular | data exchange and analytics |
| Language-specific (Python `pickle`, Java serialization) | binary | within one language only |

## Things to watch

- **Not everything can be serialized.** Functions, open connections and cyclic references need special handling. Dates and decimals have no JSON type, so choose a representation ([ISO 8601](/t/iso-8601)).
- **Precision**: large integers and floats can change in JSON ([money precision](/t/money-precision)).
- **Compatibility over time**: stored or exchanged data outlives code, so changes to its shape need care ([schema evolution](/t/schema-evolution)).
- **Never deserialize untrusted data with formats that can run code**, such as `pickle` or Java's native serialization. It can lead to remote code execution ([insecure deserialization](/t/insecure-deserialization)).
- **Validate after deserializing** ([runtime validation](/t/runtime-validation)).
- **Size and speed**: text formats are bigger and slower than binary ones.
- **Encoding**: use UTF-8 ([character encoding](/t/character-encoding)).

Frameworks usually serialize for you (an API returns an object, and it becomes JSON), but knowing what happens explains many bugs.
