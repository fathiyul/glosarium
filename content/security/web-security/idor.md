---
title: "IDOR"
summary: "Reaching other users' data by changing an ID; a missing authorization check."
levels: { backend: junior, frontend: junior }
aliases: ["Insecure Direct Object Reference", "insecure direct object reference", "BOLA", "broken object level authorization"]
prereqs: ["authentication-vs-authorization", "endpoint"]
related: ["broken-access-control", "never-trust-the-client", "rbac", "owasp-top-10", "business-logic-flaws"]
core: [backend]
---

**IDOR** (Insecure Direct Object Reference) is when changing an ID in a request lets you reach someone else's data, because the server never
checked that you're allowed to see *that* record. It's a specific case of missing authorization, and it's one of the most
common real-world vulnerabilities. APIs often call it **BOLA** (broken object-level authorization).

```
GET /api/invoices/1041        ← your invoice
GET /api/invoices/1042        ← someone else's. If this works, it's an IDOR
```

The server only asked "is this person logged in?" (authentication) and never "does this invoice belong to them?"
(authorization). See [authentication vs authorization](/t/authentication-vs-authorization).

## The vulnerable and the fixed version

```python
# vulnerable
@app.get("/invoices/{invoice_id}")
def get_invoice(invoice_id: int, user = Depends(current_user)):
    return db.get(Invoice, invoice_id)

# fixed: check ownership (or permission)
@app.get("/invoices/{invoice_id}")
def get_invoice(invoice_id: int, user = Depends(current_user)):
    invoice = db.get(Invoice, invoice_id)
    if invoice is None or invoice.owner_id != user.id:
        raise HTTPException(404)          # 404 avoids confirming that it exists
    return invoice
```

An even better habit: put the owner in the query itself, so the record is *unreachable* otherwise:

```sql
SELECT * FROM invoices WHERE id = :id AND owner_id = :current_user_id;
```

## Common misconceptions

- **"The IDs are random UUIDs, so nobody can guess them."** Unguessable IDs make attacks harder, but they leak
  through URLs, logs, emails and shared links. They are **not** an access control.
- **"The frontend doesn't show that button."** Hiding things in the UI protects nothing
  ([never trust the client](/t/never-trust-the-client)).
- **Only checking reads.** Updates and deletes (`PUT /orders/55`, `DELETE ...`) need the same check, and so do
  indirect references (an `order_id` in a request body or a nested path).

## How to prevent and find them

- **Check authorization on every endpoint, for every object**, in a consistent, central place, not ad hoc.
- **Test with two accounts**: log in as user A, then try to access user B's IDs. This simple test catches most of them.
- Don't accept IDs you can derive from the session (use "my profile", not `/users/{id}`).
- Write automated tests for access rules ([API testing](/t/api-testing)).

See [broken access control](/t/broken-access-control) for the wider category.
