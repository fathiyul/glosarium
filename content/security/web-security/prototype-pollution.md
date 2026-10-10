---
title: "Prototype Pollution"
summary: "Injecting properties into JavaScript's Object prototype."
levels: { backend: mid-level, frontend: senior }
---

Prototype pollution is a JavaScript vulnerability where attacker-controlled keys modify an object's prototype or influence properties inherited by other objects. Later code may treat a polluted property as trusted configuration, potentially causing authorization mistakes, unsafe HTML handling, or other effects depending on the application and vulnerable library.

Risk often appears in recursive merge, query-string parsing, or object-building code that accepts arbitrary keys. Special property names such as `__proto__`, `constructor`, and `prototype` deserve careful handling, but filtering only those strings is not a substitute for a safe data model. Use maintained libraries, avoid merging untrusted objects into privileged configuration, and prefer `Map` or null-prototype objects for dictionaries where appropriate.

A JSON object is data, but code that recursively assigns its fields can turn it into behavior. Validate the expected schema and allowlist keys before merging. Test the exact library and runtime path because exploitability depends on how properties are copied and later consumed.

Backend developers using JavaScript runtimes should inventory parsing and merge dependencies and keep them updated. Frontend developers should ensure untrusted data cannot affect rendering or application configuration. Avoid claiming that every prototype pollution bug leads to code execution; impact varies. See [dependency scanning](/t/dependency-scanning) and [trust boundaries](/t/trust-boundary).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
