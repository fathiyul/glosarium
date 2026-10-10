---
title: "Data Export"
summary: "Letting users download their data, often as a background job."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
also: [product-features]
aliases: ["data export", "data download", "export my data"]
prereqs: ["object-storage", "job-queue"]
related: ["data-migration", "object-storage", "gdpr", "s3"]
---

A **data export** lets users (or admins) download their data — all their records, a report, a full account archive. It's a common product feature and often a legal requirement (data portability under [GDPR](/t/gdpr)). The hard part isn't the button; it's doing it for data that's too large to return in one HTTP response.

```text
user requests export → job generates file → store in object storage → email/serve a link
```

The standard pattern: the request enqueues a [background job](/t/job-queue) that gathers the data, writes it to a file (CSV, JSON, archive) in [object storage](/t/object-storage), and notifies the user with a **time-limited download link** (see [presigned URL](/t/presigned-url)). For small exports, it can be synchronous — but "small" is a trap.

The classic mistakes:

- Generating large exports synchronously. Building a big file in the request buffers it all in memory, blocks a worker, and may time out. Use an async job and stream the file.
- Loading everything into memory. Even in a job, holding millions of rows in memory can OOM. Stream rows to the file (see [streaming large files](/t/streaming-large-files)).
- Serving the file from the app forever. Large files should live in object storage and be served directly (or via a signed URL), not proxied through app servers.
- No expiry on the link. An export link is a data-access credential; a permanent public link can leak personal data. Make download links time-limited and access-controlled.
- Exporting more than asked. "Export everything" can include other users' data, secrets, or internal fields; scope exports to the requester's data and exclude sensitive internals.
- No notification for async exports. If the user has to guess when it's ready, the feature feels broken. Notify (email/in-app) when the file is ready.
- Forgetting cleanup and cost. Stale exports accumulate in storage and cost money; set retention to delete old export files (see [storage lifecycle](/t/storage-lifecycle)).
- Ignoring format and encoding. CSV quoting, timezones, Unicode, and large fields trip up naive exporters; test with real data.

**How to build it:** request → async job → stream the scoped data to a file in object storage → notify with a time-limited link → expire and clean up. It's a standard background-job-and-storage pattern with real privacy weight — scope narrowly, secure the link, and bound retention. See [data migration](/t/data-migration) for the related "import" side.
