---
title: "Image Processing"
summary: "Resizing, cropping and converting images on upload."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["image processing", "image resizing", "image transformation"]
prereqs: ["file-uploads", "object-storage"]
related: ["cdn", "object-storage", "mime-type", "file-uploads"]
---

**Image processing** turns an uploaded image into the sizes and formats a product needs: thumbnails, previews, responsive variants, optimised web formats. Users upload one large image; the system generates the versions the UI actually displays.

```text
upload original → generate variants (thumbnail, medium, large, webp) → store → serve
```

The common approaches: process **on upload** (generate all variants immediately — predictable, but up-front work), or **on demand** (transform when a variant is first requested, then cache — lazy and flexible), often via a CDN's image service or a dedicated transformation service. Variants are stored in [object storage](/t/object-storage) and served through a [CDN](/t/cdn).

The classic mistakes:

- Serving the original full-size image everywhere. Shipping a 5 MB photo to a thumbnail slot wastes bandwidth and slows pages. Generate and serve appropriately sized variants.
- Processing synchronously in the request. Resizing large images is CPU-heavy and slow; doing it inline blocks the request and can time out. Do it in a background job (see [job-queue](/t/job-queue)).
- Trusting uploaded files. Images are an attack surface: decompression bombs (a tiny file that expands to enormous memory), malicious metadata, and non-image files with an image extension. Validate type, cap dimensions, and use a hardened library.
- Ignoring orientation and colour. EXIF orientation (photos taken sideways), colour profiles and transparency need handling, or images display wrong.
- Generating too many variants. Every size × format multiplies storage and processing; generate what the UI uses, not everything.
- Not caching derivatives. On-demand transforms must be cached, or every request re-renders the image. Cache by transform parameters.
- Forgetting formats. Modern formats (like WebP/AVIF) can be far smaller; serving only JPEG/PNG wastes bandwidth. Generate modern formats with fallbacks.
- Losing the original. Keep the original (or a high-quality master) so you can regenerate variants when sizes or formats change; don't discard it.

**How to process:** validate and cap uploads, generate the needed variants (often asynchronously), store them, serve via CDN, and cache on-demand transforms by parameters. It's a file-upload-adjacent concern with real security and performance implications — see [file uploads](/t/file-uploads) and [mime types](/t/mime-type).
