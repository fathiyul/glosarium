---
title: "RBAC"
summary: "Role-Based Access Control: permissions are granted to roles, and users are given roles."
levels: { backend: mid-level }
aliases: ["role-based access control", "RBAC", "roles and permissions", "role based access"]
prereqs: ["authentication-vs-authorization"]
related: ["abac", "rebac", "access-control-models", "least-privilege", "iam-policy", "idor"]
core: [backend]
---

**Role-based access control (RBAC)** grants permissions to **roles**, and gives users one or more roles. Instead of deciding what each person can do, you decide what an "editor" can do, and assign people the editor role.

```
users ──has──► roles ──have──► permissions
Ana ──► editor ──► article:create, article:edit
Bo  ──► admin  ──► article:*, user:manage
```

```python
ROLE_PERMISSIONS = {
    "viewer": {"article:read"},
    "editor": {"article:read", "article:create", "article:edit"},
    "admin":  {"article:read", "article:create", "article:edit", "article:delete", "user:manage"},
}

def can(user, permission):
    return any(permission in ROLE_PERMISSIONS[role] for role in user.roles)

@app.delete("/articles/{id}")
def delete_article(id, user = Depends(current_user)):
    if not can(user, "article:delete"):
        raise HTTPException(403)
    ...
```

## Why it's so common

- **Simple to understand and administer**: change a role, and everyone with it is updated.
- **Fits organizations**: job functions map naturally to roles.
- **Supports least privilege**: define roles with just what's needed ([least privilege](/t/least-privilege)).
- **Easy to audit**: "who has admin?"

## Limits

- **Role explosion**: as exceptions pile up ("editor for the France site only", "admin but can't delete invoices"), you create more and more roles.
- **No context**: RBAC says "editors can edit articles", but not "only *their own* articles", or "only during business hours", or "only if the article is a draft". Those need rules on **attributes** ([ABAC](/t/abac)) or on **relationships** ([ReBAC](/t/rebac)).
- **It doesn't check object ownership.** A role check alone leaves an [IDOR](/t/idor) hole: an editor can edit *anyone's* article unless you also check the specific record.

```python
if not can(user, "article:edit") or article.author_id != user.id:    # role AND ownership
    raise HTTPException(403)
```

## Practical advice

- **Check permissions, not role names, in code** (`can(user, "article:delete")`, not `user.role == "admin"`), so you can change which roles have what without code edits.
- **Enforce on the server, on every request.** Hiding buttons in the UI isn't security ([never trust the client](/t/never-trust-the-client)).
- **Keep roles few and meaningful**, and review them periodically.
- **Deny by default.**
- **Scope roles** when needed (per organization, per project), since a role in one tenant must not apply to another.
- For the wider landscape of models, see [access control models](/t/access-control-models).
