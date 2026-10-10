---
title: "File Upload Security"
summary: "Validating the type, size and content of uploaded files."
levels: { backend: mid-level, frontend: mid-level }
---

File-upload security is the set of checks and storage choices that prevent uploaded content from becoming a route to code execution, data exposure, or service exhaustion. The filename extension and browser-supplied MIME type are claims from the client, not proof of the file's actual content.

Set a reasonable size limit, allow only formats the product needs, and inspect content using appropriate parsers or file-signature checks. Image decoders and document parsers can have vulnerabilities too, so keep them maintained and consider isolated processing. Generate server-side storage names rather than using a user path directly. Store uploads outside executable application directories, and serve them with safe content-type and download behavior.

For example, an avatar endpoint might accept a supported image, decode and re-encode it, remove unnecessary metadata, and store it under an opaque key. Do not assume renaming `payload.php` to `payload.jpg` makes it safe. If files are public, consider whether their contents can execute in the origin's security context; a separate origin can reduce that risk.

Backend developers should enforce checks, quotas, authorization, and malware scanning where suitable. Frontend checks improve feedback but can be bypassed. Scanning adds latency and operational cost, and no single scanner proves a file harmless.

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
