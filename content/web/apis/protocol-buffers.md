---
title: "Protocol Buffers"
summary: "A compact, schema-based binary serialization format."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["protocol buffers", "protobuf", "proto files"]
prereqs: ["rpc", "json-schema"]
related: ["grpc", "avro", "messagepack"]
---

**Protocol Buffers (protobuf)** describe structured data in `.proto` files, generate typed code in many languages, and serialise to compact binary. The schema is the source of truth; the bytes on the wire carry field *numbers*, not names — small, fast, and evolvable if you follow the rules.

```proto
message User {
  int64 id = 1;
  string email = 2;
  repeated string tags = 3;  // numbers are forever; names are for humans
}
```

Evolution is the headline feature: add new fields with fresh numbers and old binaries keep working (unknown fields are preserved and skipped). It's the foundation of [gRPC](/t/grpc) and widespread in internal services and mobile payloads.

The classic mistakes:

- Reusing or changing field numbers. The cardinal sin — old data decodes into wrong fields silently. Numbers are permanent; never reuse, never change type incompatibly.
- Required fields. Proto3 removed `required` for good reason: it breaks evolution. Use optional/defaults and validate at the application layer.
- Exposing protobuf to browsers directly. Binary payloads need gRPC-web or transcoding for the web; plain JSON APIs serve browsers better.
- No schema registry or ownership. `.proto` files scattered across repos drift; centralise, version and review them like APIs — they are APIs.
- Assuming self-description. Binary protobuf without the schema is opaque. Keep schemas available for debugging, logging and tooling.
- Enums without an unknown path. Senders add enum values; receivers built earlier must handle the unknown gracefully, not crash.
- JSON mapping surprises. The canonical JSON mapping has quirks (int64 as strings, enum names). Test the mapping your gateway actually uses.

**How to use it:** `.proto` as the versioned contract, additive evolution with fresh numbers, generated types everywhere, registry-governed. Compact bytes plus safe evolution is the whole pitch — honour the numbering discipline and it delivers.
