---
title: "Static Content Hosting"
summary: "Serving files straight from storage or a CDN instead of your app."
levels: { backend: junior, frontend: junior }
aliases: ["static hosting", "static file hosting"]
prereqs: ["static-assets"]
related: ["object-storage", "cdn", "static-assets", "build-artifact"]
---

Static content hosting serves files that don't change per request, such as HTML, CSS, JavaScript, images and downloads, directly from storage or a CDN. Your application server isn't involved in delivering them.

A typical setup uploads the build output to object storage and puts a CDN in front of it:

```
build output (dist/) --upload--> object storage --> CDN --> users
```

This is often cheaper and faster than serving the same files through your app. The app only handles requests that need computation, such as API calls and personalized pages.

The classic mistake is routing static files through the application server out of habit. It works at small scale, but every image request then uses application capacity and adds latency for distant users. The opposite mistake is hosting static files without cache headers, so every visit re-downloads them. Set lifetimes that match how often each file changes. See [object storage](/t/object-storage) and the [CDN](/t/cdn) concept for the pieces.
