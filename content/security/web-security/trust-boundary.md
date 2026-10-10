---
title: "Trust Boundary"
summary: "Where data crosses from untrusted to trusted; validate there."
levels: { backend: mid-level, frontend: mid-level }
---

A trust boundary is a point where data or control crosses between components with different assumptions or privileges. Examples include a browser request entering an API, one service calling another, a file arriving from a customer, or an administrator action crossing into a production environment.

Treat data as untrusted when it crosses a boundary, even if it came from another internal service. Validate its shape and meaning, authenticate the caller, authorize the requested action, and apply limits appropriate to the resource. “Internal network” is not proof that a request is safe: services can be misconfigured, compromised, or called with unexpected data.

For example, a backend that reads a user ID from a frontend request should not assume the ID belongs to the authenticated user. It must check that relationship before returning data. Similarly, a queue consumer should validate messages because producers can change or malformed messages can be replayed.

Backend developers should map boundaries across APIs, queues, storage, and privileged jobs. Frontend developers should understand that browser-side checks improve usability but cannot establish server trust. Adding validation everywhere has maintenance cost, so define schemas and shared policies at clear boundaries instead of repeating ad hoc checks. This concept is useful in threat modeling and complements [defense in depth](/t/defense-in-depth) and [broken access control](/t/broken-access-control).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
