---
title: "Business Logic Vulnerabilities"
summary: "Abusing legitimate features in unintended ways."
levels: { backend: senior, frontend: senior }
---

A business-logic flaw lets someone use legitimate features in a way the product did not intend. Unlike an injection bug, the requests may be syntactically valid and use the documented workflow; the weakness is in assumptions about sequence, quantity, ownership, or state.

Imagine a checkout flow that validates the price on the product page but trusts a price sent back by the browser. A user can change the request while still using the normal endpoint. Other examples include redeeming a one-time promotion repeatedly, approving one's own request, or skipping a required step by calling endpoints out of order.

Model important workflows as explicit state transitions and enforce invariants on the server. For money or inventory, use transactional checks so concurrent requests cannot both claim the same resource. Require authorization at each action, not only at the start of a multi-step process. Tests should cover unexpected order, replay, duplicate requests, and simultaneous actions as well as the happy path.

Backend developers need product context to identify what “should happen”; frontend developers can flag assumptions encoded only in UI sequencing. The challenge is that intended behavior is not always written down, so threat modeling and abuse-case review matter. See [broken access control](/t/broken-access-control) and [idempotence](/t/idempotence).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
