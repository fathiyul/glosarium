---
title: "Stored, Reflected and DOM XSS"
summary: "The three kinds of XSS and where each comes from."
levels: { backend: mid-level, frontend: mid-level }
---

Cross-site scripting (XSS) is a class of bugs where attacker-controlled content is interpreted as executable script in a user's browser under your site's origin. Stored XSS persists in application data and runs when someone views it; reflected XSS is returned in a response to a crafted request; DOM-based XSS happens when client-side code sends unsafe data into a dangerous browser API.

The category describes where the unsafe data travels, not three separate fixes. Encode output for the context where it is inserted, use safe templating defaults, and avoid APIs that interpret strings as HTML or script. Input validation can reject malformed data, but it cannot replace context-aware output handling. A Content Security Policy can limit some consequences, but does not make unsafe rendering safe.

For example, displaying a user comment as text is different from assigning it to `innerHTML`. A framework may escape text by default, while an explicit “raw HTML” escape hatch restores the risk. Stored content can affect many users, so sanitize rich text with a purpose-built sanitizer and a narrowly defined format.

Backend developers should understand templates and API consumers; frontend developers should audit DOM sinks and unsafe rendering APIs. Test with security tooling and code review rather than relying on a single payload. See [security headers](/t/security-headers) and [input sanitization](/t/input-sanitization).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
