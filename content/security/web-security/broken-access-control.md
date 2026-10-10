---
title: "Broken Access Control"
summary: "The #1 OWASP risk: users acting outside their permissions."
levels: { backend: mid-level, frontend: mid-level }
---

Broken access control occurs when an application lets a user perform an action or read an object outside the permissions they should have. Authentication establishes who is making a request; authorization decides whether that identity may perform this specific action on this specific resource.

A classic failure is an endpoint like `/invoices/4821` that checks only that the caller is logged in, not that invoice 4821 belongs to them or their organization. Hiding the link in the interface does nothing if the API accepts a modified identifier. Enforce access checks on the server for every request, including background jobs and alternate API routes.

Use deny-by-default rules and centralize policy where that makes it easier to apply consistently. Test both allowed and denied cases: one user's object, another user's object, missing membership, changed role, and administrative actions. Consider relationship changes and cached responses, which can leave stale access decisions.

Backend developers own resource-level authorization and should avoid trusting client-provided role flags. Frontend developers should not treat disabled buttons as a security control and should avoid exposing sensitive data before authorization. The trade-off is additional policy complexity and checks; skipping them is not a safe performance optimization. See [access-control models](/t/access-control-models), [RBAC](/t/rbac), and [IDOR](/t/idor).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
