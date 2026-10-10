---
title: "File Storage"
summary: "Where uploaded files live: local disk, object storage or a CDN."
levels: { backend: junior, frontend: junior }
aliases: ["file hosting", "media storage"]
prereqs: ["file-uploads"]
related: ["file-uploads", "object-storage", "ephemeral-filesystem", "static-assets"]
---

Uploaded files have to live somewhere, and there are three common choices:

- **Local disk** on the application server. It's simple, but the files stay on one machine. If you run several servers, or replace a server, the files may not be there.
- **Object storage**, such as [S3](/t/s3) or a compatible service. Files are stored durably and separately from the application, and any server can read them.
- **A CDN** (content delivery network) in front of either. It keeps copies near users, so frequently requested files load faster. It doesn't replace the storage behind it, because the CDN has to fetch the file from somewhere.

For most web applications, object storage is the default, with a CDN added once traffic or distance makes it worthwhile. Keep the stored location in your database, not in the file name alone, so you can move files later.

The classic mistake is saving uploads to the application's own disk and assuming they'll stay there. A redeploy or a new container can remove them, which is why [ephemeral filesystems](/t/ephemeral-filesystem) are a concern. Store uploads outside the application, and serve them through the storage or CDN rather than through your application code.
