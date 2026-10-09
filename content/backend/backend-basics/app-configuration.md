---
title: "Configuration"
summary: "Settings that change between environments, kept out of code."
levels: { backend: junior, frontend: junior }
aliases: ["configuration", "config", "application config", "config files", "settings"]
prereqs: ["environment-variable"]
related: ["twelve-factor-app", "environments", "feature-flags", "dev-environment-setup", "input-validation"]
core: [backend]
---

**Configuration** is everything that can differ between where your app runs, without changing the code: database
URLs, API keys, ports, log levels, feature switches, timeouts. The same code runs on your laptop, in staging and in
production with different config.

```python
# bad: values baked into the code
DB_URL = "postgres://admin:hunter2@prod-db:5432/app"

# good: read from the environment
import os
DB_URL = os.environ["DATABASE_URL"]
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO")
```

## Principles

- **Keep config out of the code.** You shouldn't need to edit and rebuild source to point at a different database.
- **Never commit secrets.** Passwords and keys go in environment variables or a secrets manager, never in Git
  (see [environment variables](/t/environment-variable)).
- **Strict separation of config vs code** is one of the
  [twelve-factor app](/t/twelve-factor-app) principles, which recommend env vars.
- **Validate at startup.** Check that required settings exist and have the right type, and fail immediately with a clear
  message ([fail fast](/t/fail-fast)), instead of crashing at 3 a.m. when some code path finally needs it.
- **Provide safe defaults** for non-sensitive settings, but no defaults for secrets.
- **Keep one place** that reads config and turns it into typed values (a `Settings` class), so the rest of the code
  doesn't scatter `os.environ[...]` calls everywhere.
- **Document it**: list every setting, what it does and an example (an `.env.example` file).

## Common sources

| Source | Notes |
|---|---|
| Environment variables | Simple, universal; values are strings |
| Config files (YAML, JSON, TOML) | Good for structured, non-secret settings |
| Secrets managers | For credentials; access is controlled and audited |
| Feature-flag service | Settings that change at runtime ([feature flags](/t/feature-flags)) |

Config that varies per [environment](/t/environments) is the main reason people keep these organized.
Also see [frontend env vars](/t/frontend-env-vars) for how it differs in browsers.
