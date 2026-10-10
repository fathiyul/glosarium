---
title: "PDF Generation"
summary: "Producing PDFs like invoices and reports."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["pdf generation", "generating pdfs", "server-side pdf"]
prereqs: ["file-uploads", "object-storage"]
related: ["invoices-receipts", "object-storage", "job-queue"]
---

**PDF generation** creates a PDF document on the server — an invoice, a receipt, a report, a shipping label, a ticket. Because PDFs render identically everywhere and are printable and archivable, they're the standard format for these documents.

The usual approaches:

- Template → PDF — render an HTML/other template (with a headless browser or a templating engine) and convert to PDF. Familiar to web developers, good for rich layouts.
- PDF library — build the document programmatically with a PDF library, placing text and elements. More control, less HTML/CSS convenience.
- Document templating — fill a pre-designed template (with placeholders) with data; good when the layout is fixed.

```text
data → template → render → PDF → store → serve / attach
```

The classic mistakes:

- Generating in the request synchronously. PDF rendering is CPU-heavy; doing it inline can block the request and time out. For anything non-trivial, generate in a background job (see [job-queue](/t/job-queue)) and hand back a link.
- Font and script issues. PDFs embed fonts; missing fonts or non-Latin scripts (CJK, Arabic, emoji) render as boxes unless the font is included and the text shaping supported. Test with real content.
- Page-break and layout surprises. Long tables, headers/footers and page breaks are where HTML-to-PDF gets fiddly; design templates with pagination in mind.
- Not versioning/archiving the generated file. Financial documents (invoices) should be stored immutably, not regenerated on the fly each time — the rendered file *is* the record (see [invoices and receipts](/t/invoices-receipts)).
- Assuming pixel-perfect across engines. Different renderers/libraries produce subtly different output; pin your renderer and test.
- Security of the renderer. A headless browser rendering untrusted HTML can be an attack surface; don't render user-provided HTML unsandboxed.
- Ignoring accessibility and text. Scanned or image-only PDFs aren't searchable or accessible; generate real text where possible.
- Large batches in memory. Generating thousands of PDFs at once exhausts memory; stream/store each and process in batches.

**How to generate:** choose a template-based or library approach, render in a background job for anything heavy, embed fonts, store the result in [object storage](/t/object-storage), and serve or attach it. For documents that are records (invoices), archive the exact PDF rather than regenerating. See [file uploads](/t/file-uploads) and [data export](/t/data-export).
