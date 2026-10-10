---
title: "Insecure Deserialization"
summary: "Deserializing untrusted data in a way that executes code."
levels: { backend: senior }
---

Insecure deserialization occurs when an application turns untrusted serialized data into complex objects without controlling what types or behavior can be created. In some languages and libraries, object reconstruction can invoke constructors, hooks, or other behavior; a crafted payload may lead to code execution or other serious effects. Impact depends on the format and implementation.

Prefer simple data formats with explicit schemas, such as JSON mapped into known request types, rather than accepting arbitrary native object graphs from untrusted sources. Validate the schema and reject unexpected fields or types. Signing data can detect modification by parties without the key, but does not make a dangerous deserializer safe if an attacker can submit any valid signed message through an exposed feature.

A risky pattern is accepting a serialized object from a cookie or request body and directly restoring it into runtime objects. If compatibility requires a legacy format, isolate the code, constrain allowed types, and plan a migration. Never use serialization as a substitute for authorization; a valid object may still request an operation the caller cannot perform.

Backend developers should inventory serializers at API, cache, queue, and session boundaries and use maintained libraries. Frontend developers should not assume client-generated structured data is trustworthy. See [trust boundary](/t/trust-boundary) and [dependency scanning](/t/dependency-scanning).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
