---
title: "Mass Assignment"
summary: "Clients setting fields they shouldn't, like isAdmin."
levels: { backend: mid-level }
---

Mass assignment occurs when an application copies many client-supplied fields directly onto a model or database record. If the model contains fields the API did not intend to expose, a caller may set values such as `is_admin`, `owner_id`, or `billing_status` by adding them to the request.

The safer pattern is an explicit input schema or allowlist for each operation. A profile update may accept a display name and locale, while role changes belong in a separate privileged workflow. Do not treat validation of field types as authorization: a correctly typed boolean can still be a forbidden field.

For example, if the frontend sends `{ "displayName": "Sam" }`, a malicious caller can send the same request plus `{ "isAdmin": true }`. The backend must ignore or reject fields outside the endpoint's contract, even when the user interface never displays them. Separate request DTOs from persistence models so internal columns do not become writable by accident.

Backend developers should test unexpected fields and authorization boundaries whenever an API model changes. Frontend developers should send only the documented fields, but cannot enforce the server's security policy. Explicit schemas require maintenance as products evolve; that cost is small compared with exposing an internal field. See [broken access control](/t/broken-access-control).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
