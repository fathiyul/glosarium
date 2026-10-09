---
title: "Input Validation"
summary: "Checking every input at the boundary before using it."
levels: { backend: junior, frontend: junior }
aliases: ["validating input", "request validation", "data validation", "sanitizing input"]
prereqs: ["request-response-body"]
related: ["sql-injection", "parameterized-query", "form-validation", "error-response-format", "dto", "fail-fast"]
core: [backend]
also: [web-security]
---

**Input validation** means checking everything that comes from outside your code before you use it: request bodies, query
parameters, headers, uploaded files, webhooks and messages. Assume it can be missing, malformed, oversized or hostile.

The check belongs at the **boundary**: reject bad input right where it enters, so the rest of your code can trust
what it gets.

```python
from pydantic import BaseModel, Field, EmailStr   # one common library; others work too

class SignupIn(BaseModel):
    email: EmailStr
    age: int = Field(ge=13, le=120)
    name: str = Field(min_length=1, max_length=100)
```

A request that doesn't fit gets a `400` or `422` with a message saying which field is wrong
([error response format](/t/error-response-format)).

## What to check

- **Presence and type**: is it there, and is it a number or a string?
- **Format**: email, UUID, date.
- **Range and length**: min/max values, maximum string and list sizes, upload size limits.
- **Allowed values**: an enum or a known set (`status in {"open", "closed"}`).
- **Business rules**: things the server knows, such as "that username is taken" or "end date after start date".

## Principles

- **Validate on the server, always.** Browser-side checks are only a courtesy
  ([form validation](/t/form-validation)); anyone can bypass the frontend.
- **Prefer allow-lists to block-lists.** Define what is acceptable, instead of trying to list every bad thing.
- **Reject, don't silently fix**, unless the correction is obvious and safe.
- **Validation is not a replacement for safe handling.** Even valid-looking text must never be pasted into SQL or HTML.
  Use [parameterized queries](/t/parameterized-query) ([SQL injection](/t/sql-injection)) and escape output.
- **Limit size** everywhere. Unbounded input is a denial-of-service risk.
- **Don't leak internals** in error messages (stack traces, SQL).

Turn the validated data into a typed object ([DTO](/t/dto)) at the edge, and pass that inward, not the raw dictionary.
