---
title: "Subresource Integrity"
summary: "Verifying that third-party scripts haven't been tampered with."
levels: { frontend: mid-level }
---

Subresource Integrity (SRI) lets a browser verify that a fetched script or stylesheet matches a cryptographic hash declared by the page. If the downloaded bytes do not match, the browser refuses to use that resource. This can reduce risk when loading static assets from a third-party content delivery network.

An integrity attribute is tied to exact file contents, so legitimate updates require updating the hash as well. Cross-origin resource rules also apply: the hosting setup must permit the browser to validate and load the asset. SRI is most useful for versioned, immutable resources; it is a poor fit for a URL whose contents change without a corresponding application deployment.

For example, if a page includes a pinned library file, the build can generate its integrity hash and include it alongside the URL. Do not copy a hash from an untrusted page or guess one. Automate generation and review it with dependency updates, otherwise teams may remove the protection to unblock a release.

Frontend developers usually configure SRI in HTML or the bundler; backend and platform teams may control templates and CDN behavior. SRI does not protect inline scripts, first-party code already compromised, or every dynamically loaded dependency. Pair it with dependency review and a suitable [Content Security Policy](/t/security-headers).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
