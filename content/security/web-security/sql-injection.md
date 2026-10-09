---
title: "SQL Injection"
summary: "Attackers running SQL through unescaped input; prevented with parameterized queries."
levels: { backend: junior, frontend: junior }
aliases: ["SQLi", "SQL injection attack", "injection attack"]
prereqs: ["select-query", "input-validation"]
related: ["parameterized-query", "prepared-statement", "orm", "input-sanitization", "least-privilege", "owasp-top-10"]
core: [backend]
---

**SQL injection** happens when user input becomes part of a SQL command, so an attacker can change what the query *does*.

```python
# vulnerable: building SQL with string formatting
email = request.args["email"]
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
```

If the attacker sends `x' OR '1'='1`, the query becomes:

```sql
SELECT * FROM users WHERE email = 'x' OR '1'='1'      -- returns every user
```

With more effort, injection can read other tables, change or delete data, bypass logins
(`admin'--`) and sometimes run commands on the database server. It's been a top web vulnerability for decades, and it's entirely
avoidable.

## The fix: parameterized queries

Send the SQL and the values **separately**, so the database never treats input as code:

```python
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))      # placeholders, not f-strings
```

```js
await db.query("SELECT * FROM users WHERE email = $1", [email]);
```

The value is bound as data. No matter what it contains, it can't change the structure of the query
([parameterized queries](/t/parameterized-query), [prepared statements](/t/prepared-statement)).

## Details that matter

- **Don't try to escape input yourself** or block "bad words". Filters get bypassed. Use parameters.
- **ORMs protect you in normal use** ([ORM](/t/orm)), but raw SQL fragments, string-built `ORDER BY` clauses and `.raw()`
  or `.extra()` escapes reintroduce the risk.
- **Placeholders only work for values**, not table or column names, or `ASC`/`DESC`. For those, validate against a fixed
  allow-list:

```python
ALLOWED = {"created_at", "total_cents"}
sort = request.args.get("sort", "created_at")
if sort not in ALLOWED:
    raise ValueError("bad sort")
query = f"SELECT * FROM orders ORDER BY {sort}"
```

- **Limit the damage** with a database user that has only the permissions the app needs, so even a successful injection
  can't drop tables ([least privilege](/t/least-privilege)).
- Don't show database error messages to users, since they help attackers.
- Injection exists beyond SQL: shell commands, LDAP, NoSQL queries and templates have the same shape of problem
  ([command injection](/t/command-injection)).

Code review habit: any query built with `+`, f-strings or `.format()` is suspicious.
