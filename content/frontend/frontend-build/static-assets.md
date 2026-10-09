---
title: "Static Assets"
summary: "Images, fonts and files served as-is."
levels: { backend: junior, frontend: junior }
prereqs: ["http-caching"]
related: ["http-caching", "cache-control", "ephemeral-filesystem", "build-artifact"]
---

Static assets are files that go to the browser unchanged: images, fonts, icons, PDFs and similar. They don't need code to run on the server, so the server or a CDN can send them straight out.

On the frontend, many build tools have a folder such as `public/` whose contents are copied as they are. When your code imports an asset, the build often renames it with a content hash, such as `logo.3f9a1c.png`. The name changes whenever the file changes, so browsers can cache it for a long time without ever showing an old version.

```html
<img src="/images/logo.3f9a1c.png" alt="Example Shop logo">
```

On the backend, serve assets with the correct content type and [caching headers](/t/cache-control), or push them to object storage behind a CDN rather than sending them through your application code.

The classic mistake is saving user-uploaded files in the same folder as the application code. A server that's rebuilt or replaced during a deployment can lose those files. Keep uploads in storage that outlives the application, as described in [ephemeral filesystem](/t/ephemeral-filesystem).
