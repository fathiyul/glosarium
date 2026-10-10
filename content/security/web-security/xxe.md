---
title: "XXE"
summary: "XML parsers fetching external entities and leaking files."
levels: { backend: senior }
---

XML External Entity (XXE) vulnerabilities arise when an XML parser processes external entities from untrusted input. A crafted document may cause the parser to read local files, make network requests, or consume excessive resources, depending on parser configuration and environment.

If an endpoint accepts XML, use a maintained parser configured to disable external entity resolution and unnecessary document type declarations, unless the feature explicitly requires them. Parser defaults differ across libraries and versions, so verify the effective settings rather than assuming that “XML is just data.” If possible, prefer a simpler format for interfaces that do not need XML features.

For example, a document import feature should not let a submitted XML entity reference a local configuration file. Run parsing with limited filesystem and network access as defense in depth, and cap input size and processing time. Do not return parser errors that reveal local paths or configuration.

Backend developers should inventory XML parsing in application code and transitive libraries, including SOAP or document-processing components. Frontend developers may need to avoid sending XML to an endpoint that does not require it. Test both entity expansion and external fetch behavior with safe test cases in a controlled environment. See [SSRF](/t/ssrf) and [file upload security](/t/file-upload-security).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
