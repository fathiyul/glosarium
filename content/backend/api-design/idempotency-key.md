---
title: "Idempotency Key"
summary: "A client-supplied ID that makes retried requests safe."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["Idempotency-Key header", "idempotent requests", "idempotency keys", "safe retries"]
prereqs: ["http-methods", "double-submit"]
related: ["double-submit", "idempotence", "safe-idempotent-methods", "retry-with-backoff", "unique-constraint-guard", "idempotent-consumer"]
core: [backend]
---

Networks fail **after** the server has done the work but **before** the client sees the answer. If the client retries a `POST /payments`, you may charge twice. An **idempotency key** makes retrying safe: the client sends a unique key per *intended action*, and the server guarantees that the same key
produces the **effect only once**, returning the same response each time.

```http
POST /payments
Idempotency-Key: 6f1c0b9e-3f6a-4f45-9a07-1d2b4c5e7a10
Content-Type: application/json

{ "amount": 5000, "currency": "USD", "customer": "cus_42" }
```

The first call is processed. A retry with the **same key** returns the **stored result** instead of charging again. (Payment APIs such as Stripe's popularized this pattern, and an `Idempotency-Key` header is also the subject of an IETF draft.)

## How a server implements it

```python
def create_payment(request, user):
    key = request.headers["Idempotency-Key"]
    record = db.get_idempotency(user.id, key)
    if record:
        if record.request_hash != hash_of(request.body):
            return error(422, "Key reused with a different request")
        if record.status == "in_progress":
            return error(409, "A request with this key is still being processed")
        return record.stored_response                      # replay the earlier answer

    db.insert_idempotency(user.id, key, hash_of(request.body), status="in_progress")   # unique (user_id, key)
    response = do_the_payment(request)
    db.complete_idempotency(user.id, key, response)
    return response
```

Key details:

- **Store the key with the response** (status code and body), scoped to the caller. The scope matters, so one user's keys can't collide with another's.
- **A unique constraint** on `(user, key)` makes the "claim" atomic, so two simultaneous retries can't both run ([unique constraints](/t/unique-constraint-guard), [race conditions](/t/race-condition)).
- **Compare the request body.** The same key with a different payload is a client bug. Reject it.
- **Handle in-flight requests**: a second request that arrives while the first is still running should wait or get a clear "in progress" response.
- **Expire keys** after a window (such as 24 hours), so the table doesn't grow forever.
- **Save the result in the same transaction as the work**, or you can end up with the work done and no record.

## Client side

- **Generate the key once per user intent** (a UUID when the user clicks "Pay"), and **reuse it for every retry** of that action, not a new one each time ([double submit](/t/double-submit)).
- Retry with backoff ([retry with backoff](/t/retry-with-backoff)).

`GET`, `PUT` and `DELETE` are already idempotent by definition, so keys matter mainly for `POST` and other non-idempotent operations ([safe and idempotent methods](/t/safe-idempotent-methods)). The same idea applies to message consumers ([idempotent consumer](/t/idempotent-consumer)).
