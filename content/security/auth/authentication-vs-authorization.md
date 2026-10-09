---
title: Authentication vs Authorization
summary: Authentication proves who you are; authorization decides what you may do.
levels: { backend: junior, frontend: junior }
aliases: [AuthN vs AuthZ]
related: [http-401-vs-403, session, jwt, rbac]
core: [backend, frontend]
---

**Authentication (AuthN)** answers *"who are you?"* You check a password, a token, a
fingerprint, and end up with an identity: *this request is from user 42.*

**Authorization (AuthZ)** answers *"may you do this?"* Given user 42, can they delete
order 917? That depends on rules: they own it, they're an admin, their plan allows it.

They're separate steps, and authentication always comes first: you can't decide what
someone may do until you know who they are.

## Why juniors should care

The classic bug is doing authentication and forgetting authorization:

```python
@app.delete("/orders/{order_id}")
def delete_order(order_id: int, user = Depends(current_user)):  # authenticated ✓
    db.delete(Order, order_id)                                   # authorized? ✗
```

Any logged-in user can delete *anyone's* order by changing the ID in the URL. This is
called **IDOR** (Insecure Direct Object Reference) and is one of the most common real-world
vulnerabilities. The fix is one check:

```python
    order = db.get(Order, order_id)
    if order.owner_id != user.id:
        raise HTTPException(403)
```

**Rule of thumb:** every endpoint that touches a specific record should ask "does this
user have access to *this* record?", not just "is someone logged in?"
