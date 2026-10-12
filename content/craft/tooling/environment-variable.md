---
title: "Environment Variable"
summary: "A key-value setting passed to processes from their environment."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["env var", "env vars", "environment variables", "ENV", ".env"]
prereqs: ["shell"]
related: ["path-variable", "dev-environment-setup", "shell", "lockfile"]
core: [backend, data-engineer]
also: [backend-basics]
---

An **environment variable** is a named string setting that the operating system passes to every
program it starts. It lets you change how a program behaves, such as which database to talk to,
without changing its code.

```sh
export DATABASE_URL="postgres://localhost/app_dev"
python app.py                            # the program inherits DATABASE_URL

API_KEY=abc123 python app.py             # set for this one command only
```

Reading them in code:

```python
import os
db_url = os.environ["DATABASE_URL"]            # KeyError if missing: fails fast
debug = os.environ.get("DEBUG", "false") == "true"
```

```js
const dbUrl = process.env.DATABASE_URL;        // undefined if missing
```

## Why they're used

- **The same code runs everywhere** (laptop, test, production) with different settings.
- **Secrets stay out of source code and Git.** Passwords and API keys belong in the environment
  or a secrets manager, never in the repository.

## Points to remember

- **Values are always strings.** `"false"` and `"0"` are still non-empty strings, so convert
  them yourself.
- **Missing variables should fail loudly** at startup, not as a confusing error later.
- **`.env` files** are a convenience for local development. Tools such as `python-dotenv` or
  your framework load them into the environment. Add `.env` to [.gitignore](/t/gitignore) and
  commit a `.env.example` with fake values.
- **They're inherited**, not shared. Setting a variable in one terminal doesn't affect
  another; changing it after a program starts has no effect on that program.
- They can show up in logs, crash reports and process listings, so don't print them.

`PATH` is the best-known one: see [PATH](/t/path-variable).
