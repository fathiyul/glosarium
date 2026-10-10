---
title: "Object Storage"
summary: "Storing files as objects, as in S3."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["blob storage", "S3-compatible storage"]
prereqs: ["file-storage"]
related: ["file-storage", "s3", "static-assets", "mime-type"]
---

Object storage keeps files, called objects, in containers called buckets. Each object has a name (its key), its bytes, and metadata such as a content type. You read and write objects over an HTTP API. Amazon S3 is the best-known service, and many other providers offer APIs compatible with it.

```
bucket: product-images
key:    products/42/cover.jpg     -> the image bytes + metadata
```

The keys look like paths, with slashes such as `products/42/`, but there are no real folders underneath. A "folder" is just a shared prefix in the key names. That's why listing a prefix is cheap, and why renaming a "folder" means copying and deleting every object in it.

The classic mistake is treating object storage like a local disk. Objects are generally written and replaced whole, not edited in place, so it's a poor fit for a file that changes many times a second. It also isn't a database for lots of small, frequently changing records. Use it for files that are written once and read many times, and pair it with [file storage](/t/file-storage) decisions and a [MIME type](/t/mime-type) for each object.
