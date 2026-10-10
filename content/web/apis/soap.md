---
title: "SOAP"
summary: "An older XML-based protocol for web services."
levels: { backend: senior }
aliases: ["soap", "soap api", "simple object access protocol"]
prereqs: ["xml", "rpc"]
related: ["xml", "openapi", "tls"]
---

**SOAP** is XML messaging with an envelope, strict contracts (**WSDL** describes operations and types exactly), and a WS-* extension universe (security, transactions, reliable delivery). Where REST is loose and web-native, SOAP is rigorous and enterprise: banks, telcos, governments and healthcare run on it, and will for decades.

```xml
<soap:Envelope><soap:Body>
  <GetOrder><id>42</id></GetOrder>
</soap:Body></soap:Envelope>
```

Its virtues are contract strictness (machine-verifiable interfaces), transport independence, and standardised security/reliability — genuinely valuable where regulation and multi-vendor integration dominate. Its costs are verbosity, complexity, and tooling that peaked a decade ago.

The classic mistakes:

- Choosing SOAP for new web APIs. The verbosity, complexity and weak browser/mobile ergonomics tax every integration. Default new work to REST or GraphQL.
- XXE and parser attacks. SOAP is XML, inheriting its vulnerability classes — external entities, expansion bombs. Harden parsers (disable DTDs/entities) before anything else.
- Ignoring WSDL drift. A WSDL nobody regenerates from code (or validates against) lies like any stale contract. Generate or conformance-test it.
- **WS-* sprawl.** Adopting the full security/transaction stack where HTTPS + tokens + idempotency would do multiplies complexity hundredfold. Use the minimum that satisfies the actual requirements.
- Versioning by namespace chaos. New namespaces per version without a client migration story fragments integrations. Version deliberately with coexistence periods.
- Assuming it's dead. Entire industries transact SOAP daily; "rewrite it in REST" is a multi-year programme, not a sprint. Integrate respectfully.
- No message-level security where required. Transport TLS protects the pipe; some SOAP flows need message signatures for intermediaries and non-repudiation. Know which your counterparty requires.

**Its place:** regulated, multi-vendor, enterprise integration where strict contracts and WS-* features are required — and everywhere legacy demands it. Build new things on modern styles; meet SOAP systems with hardened parsers and exact contracts.
