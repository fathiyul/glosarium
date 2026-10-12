---
title: "multipart/form-data"
summary: "The encoding used to upload files from forms."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["multipart form data", "multipart", "form-data"]
prereqs: ["http", "mime-type"]
related: ["file-uploads", "presigned-url", "input-validation"]
---

**multipart/form-data** is the encoding browsers use when a form includes files: the body is split into *parts* separated by a boundary string, each with its own headers (`Content-Disposition`, `Content-Type`), so text fields and binary files travel in one request.

```text
Content-Type: multipart/form-data; boundary=----abc123
------abc123
Content-Disposition: form-data; name="title"
My photo
------abc123
Content-Disposition: form-data; name="file"; filename="p.jpg"
Content-Type: image/jpeg
[binary bytes]
```

Servers parse it with dedicated multipart parsers — never by hand — enforcing size limits per file and overall, since a "form post" can legitimately be gigabytes.

The classic mistakes:

- Parsing it manually. Boundary handling, encodings and nested quirks are a CVE farm. Use the framework's parser.
- No size limits. Unlimited multipart parsing is a memory-exhaustion vector. Cap file size, total size and part count before parsing buffers.
- Trusting filename and Content-Type. Both come from the client. Validate magic bytes and extension server-side; sanitise filenames (no paths) before storage.
- Buffering huge uploads in the app. Holding multi-hundred-MB parts in memory kills workers. Stream to disk or object storage; better, use [presigned URLs](/t/presigned-url) so bytes bypass the app.
- Wrong encoding for the job. Plain field-only forms should use `application/x-www-form-urlencoded`; JSON APIs should send JSON. Multipart is for mixed file+field payloads.
- Forgetting CSRF. Cookie-authed multipart endpoints are classic CSRF targets — the browser happily submits them. Protect accordingly.
- Assuming order or single files. Parts arrive in order but clients vary; handle multiple files and missing fields defensively.

**How to handle it:** framework parser, strict size caps, stream large parts, validate content after receipt, and consider direct-to-storage uploads for anything big. It's the web's file envelope — convenient, attacker-shaped, and safe only with limits.
