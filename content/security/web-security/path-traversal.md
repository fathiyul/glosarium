---
title: "Path Traversal"
summary: "Reaching files outside an allowed directory with ../."
levels: { backend: mid-level }
---

Path traversal is a flaw that lets an attacker use a path such as `../` to reach files outside the directory an application intended to expose. It often appears in download, image, archive extraction, and template-loading endpoints that join a user-provided name to a filesystem path.

Do not treat string replacement of `../` as a complete defense. Encodings, platform separators, symlinks, and normalization rules complicate path handling. Prefer mapping an opaque identifier to a server-controlled file path. If a path must be accepted, normalize it using the platform's path library, resolve it against a fixed base directory, and verify the resolved path remains inside that base before opening it. Consider symlink behavior and races in the specific environment.

For example, a download API should look up a document ID the caller is authorized to access rather than accept `?file=...` and concatenate it into a storage path. Authorization matters too: being inside the correct directory does not mean the caller may read that file.

Backend developers should test encoded and platform-specific paths and run the service with limited filesystem permissions. Frontend-side filtering is not security. See [file upload security](/t/file-upload-security) and [broken access control](/t/broken-access-control).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
