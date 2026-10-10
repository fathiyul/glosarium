---
title: "Presigned URL"
summary: "A temporary URL letting clients upload or download directly from storage."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["presigned url", "signed url", "pre-signed url"]
prereqs: ["object-storage", "file-uploads"]
related: ["object-storage", "s3", "file-uploads"]
---

A **presigned URL** is a temporary, cryptographically signed link that grants time-limited access to a specific object in [object storage](/t/object-storage) — upload or download — without exposing your storage credentials. Your backend generates the URL (signed with its credentials) and hands it to the client, which then talks to storage directly.

```text
client → backend: "I want to upload photo.jpg"
backend → client: presigned PUT URL (valid 5 min, this key only)
client → object storage: PUT photo.jpg directly   (no app proxying)
```

The benefit is that large file transfers bypass your application servers entirely. The client uploads straight to storage, or downloads straight from it, so your app doesn't stream gigabytes through itself, and it doesn't need to hold a connection open for a long transfer.

The classic mistakes:

- Proxying uploads through the app instead. Streaming large files through application servers wastes bandwidth and memory and ties up workers. Presigned URLs let the client transfer directly (see [streaming large files](/t/streaming-large-files)).
- Over-long or unexpiring links. A presigned URL is a credential; if it never expires or lasts for days, it can leak the object. Keep lifetimes short and scope tightly.
- Over-broad permissions. A presigned URL should allow exactly one operation on one key; a URL that allows listing or a whole-bucket prefix is a security hole.
- Skipping validation after upload. Because the client uploads directly to storage, your validation (content type, size, virus scan) must happen *after* the upload — the client bypassed your server. Don't assume the file is safe because storage accepted it.
- Trusting the client's declared type. The client controls the upload; validate the actual content (magic bytes, size) server-side after it lands (see [mime type](/t/mime-type)).
- Not handling the upload completion. With direct upload, your system must be told when the object is ready (the client signals, or storage events fire) before it's served or processed.
- Public buckets as a shortcut. Making a bucket public instead of using signed URLs exposes everything; use signed URLs (or a CDN with access control) for private objects.

**How to use it:** backend authorizes the request, generates a short-lived signed URL scoped to one operation/key, the client transfers directly, then the backend confirms and validates the object before serving it. It's the standard pattern for secure, efficient file handling — offloading transfer from the app while keeping access controlled. See [file uploads](/t/file-uploads).
