---
title: "Mock Server"
summary: "A fake API that returns canned responses, for testing clients in isolation."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["API mock server", "mock API"]
prereqs: ["test-double"]
related: ["stub-double", "fake", "contract-testing", "integration-test"]
---

A mock server is a fake HTTP API that a client can call during tests. You configure it with the requests it should expect and the responses to return, and the client talks to it as if it were the real service. It lets you test a frontend or a client library without the real backend running.

```javascript
// Illustrative: the setup depends on your mock-server tool
server.on("GET", "/api/users/42", { status: 200, body: { id: 42, name: "Ada" } });

const user = await client.getUser(42);
// assert: the client parsed the response into the expected shape
```

This is a [stub](/t/stub-double) at the network level. It returns fixed answers, so it's good for error handling, such as a 500 response or a slow reply, which is hard to trigger against the real service. It also lets frontend work proceed before the backend is finished.

The trade-off is drift. A mock server only knows what you told it, so the responses can stop matching the real API as the backend changes. The test still passes, and the client breaks in production. Recording real responses or validating against the API's schema reduces this, and [contract testing](/t/contract-testing) addresses it more directly.

The classic mistake is writing mock responses by hand from memory, then trusting them. Copy real responses, keep them updated, and keep a smaller set of [integration tests](/t/integration-test) that call the real service in a shared test environment. A mock server is for isolation, not proof that the two sides work together.
