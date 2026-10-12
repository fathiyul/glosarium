---
title: "XML"
summary: "A verbose markup format still common in enterprise and legacy systems."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["xml", "extensible markup language", "xml schema"]
prereqs: ["http", "json"]
related: ["soap", "json-schema", "json"]
---

**XML** is a strict, namespaced markup format with schemas (XSD), transforms (XSLT), and signatures — verbose, precise, and deeply embedded in enterprise integration, document formats (Office, SVG, RSS/Atom, sitemaps) and legacy APIs. Where JSON is loose and terse, XML is explicit and validated.

```xml
<order xmlns="https://example.com/orders">
  <id>42</id><total currency="USD">19.99</total>
</order>
```

Its strengths — namespaces mixing vocabularies safely, schemas enforcing structure, canonicalisation for signatures — are exactly what regulated document exchange needs. Its weaknesses (verbosity, parsing cost, complexity) are why new APIs choose JSON.

The classic mistakes:

- XXE vulnerabilities. XML parsers resolving external entities can read local files or SSRF internal services. Disable external entities and DTDs unless genuinely needed — this is XML's signature vulnerability class.
- Billion-laughs expansion. Entity expansion bombs turn kilobytes into gigabytes. Limit entity expansion in every parser.
- Choosing XML for new JSON-shaped APIs. Verbosity tax on every request, weaker browser ergonomics, no advantage for simple CRUD. Default new APIs to JSON.
- Ignoring namespaces. Same tag, different namespace, different meaning — naive tag-name matching misroutes documents. Handle namespaces properly.
- Hand-rolling parsing. Regex over XML breaks on legal-but-unexpected forms (CDATA, entities, attribute order). Always use a real parser.
- Schema drift. An XSD nobody enforces is decoration. Validate at boundaries or drop the pretence.
- Assuming it's dead. Sitemaps, feeds, Office docs, SAML, SOAP integrations and plenty of bank/government endpoints are XML for the foreseeable future. Know it well enough to integrate safely.

**Its place:** document interchange with validation and signatures, and the legacy/enterprise surface that isn't migrating. Parse with hardened libraries, kill external entities, and prefer JSON for anything new and web-shaped.
