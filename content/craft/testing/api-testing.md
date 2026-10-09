---
title: "API Testing"
summary: "Calling endpoints and checking status codes, bodies and side effects."
levels: { backend: junior, frontend: junior }
aliases: ["REST API testing", "endpoint testing", "testing APIs"]
prereqs: ["endpoint", "http-status-codes"]
related: ["integration-test", "test-database", "contract-testing", "mock-server", "end-to-end-test"]
core: [backend]
also: [api-design]
---

API testing means calling your endpoints the way a client would and checking the result:
status code, response body and, just as important, what changed behind the scenes.

```python
def test_create_order(client, db):
    res = client.post("/orders", json={"item_id": 7, "quantity": 2})

    assert res.status_code == 201
    body = res.json()
    assert body["quantity"] == 2
    assert db.query(Order).count() == 1          # side effect really happened
```

## What to check

- **Status codes**: 201 for created, 400 for bad input, 401/403 for auth problems, 404 for
  missing things.
- **Response body**: the right fields and values, not just "it returned JSON".
- **Side effects**: rows written, emails queued, events published.
- **Errors**: invalid or missing input, wrong types, duplicates and unauthorized users.
  The sad paths are where most bugs live.
- **Security basics**: can user A read or change user B's data? (see
  [authentication vs authorization](/t/authentication-vs-authorization)).

## Ways to run them

| Approach | Notes |
|---|---|
| Framework test client in your test suite | Fast; runs in CI. Most backend tests use this |
| Against a running server | Closer to real, slower; good for a smoke test after deploy |
| Manual tools (curl, Postman, Insomnia) | Good for exploring; saved collections can be automated |

Use a separate [test database](/t/test-database) so tests never touch real data, and make
each test independent of the others. API tests are a kind of
[integration test](/t/integration-test): they exercise routing, validation and the database
together.
