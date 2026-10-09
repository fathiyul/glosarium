---
title: "File Uploads"
summary: "Accepting, validating and storing files from users."
levels: { backend: junior, frontend: junior }
prereqs: ["multipart-form-data"]
related: ["multipart-form-data", "s3", "ephemeral-filesystem", "static-assets"]
also: [files-media]
---

A file upload sends a file from the user's device to your server, usually as [multipart form data](/t/multipart-form-data). The file comes from someone you don't trust, so treat it as untrusted input.

On the frontend, a file input is the start of the upload:

```html
<form method="post" action="/avatar" enctype="multipart/form-data">
  <input type="file" name="avatar" accept="image/png,image/jpeg">
  <button>Upload</button>
</form>
```

The `accept` attribute only filters the file picker. It doesn't stop anyone from sending another file, so the server has to check on its own. On the backend:

- **Limit the size** before the whole file is read into memory.
- **Check the actual content** of the file, not just its extension. `photo.png` can contain anything.
- **Don't use the user's filename as the storage path.** Generate a name yourself, so a crafted filename can't point outside your storage folder.
- **Store the file outside the application code**, in object storage such as [S3](/t/s3) or a dedicated volume. See [ephemeral filesystem](/t/ephemeral-filesystem) for why.

The classic mistake is trusting the extension and the filename, then saving the upload to a path built from them. Validate, rename and store the file, and only then record it in your database.
