---
title: "MIME Type"
summary: "The standard label for a file's format, like image/png."
levels: { backend: junior, frontend: junior }
aliases: ["media type", "content type"]
prereqs: ["http-headers"]
related: ["content-type", "file-uploads", "http-headers", "file-storage"]
---

A MIME type is a standard label that describes a file's format, written as a type and a subtype separated by a slash. Examples include `text/html`, `image/png` and `application/json`. Browsers and servers use it to decide how to handle the bytes they receive.

Servers send the MIME type in the [`Content-Type` header](/t/content-type) of a response:

```http
HTTP/1.1 200 OK
Content-Type: image/png
```

When a browser receives `text/html`, it renders the content as a page. When it receives `image/png`, it displays the bytes as an image. When it receives `application/octet-stream`, it usually offers a download, because the format is unknown.

The classic mistake is trusting the file extension or the MIME type a client sends when accepting an upload. A file named `photo.png` can contain anything, and a client can claim any type it likes. Check the file's actual contents before you accept it, as covered in [file uploads](/t/file-uploads), and store the type you verified rather than the one you were given.
