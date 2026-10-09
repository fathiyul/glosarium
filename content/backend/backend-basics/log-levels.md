---
title: "Log Levels"
summary: "DEBUG, INFO, WARN and ERROR, and when to use each."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["logging levels", "DEBUG INFO WARN ERROR", "severity levels", "log severity"]
prereqs: ["logging"]
related: ["logging", "structured-logging", "log-rotation", "observability", "app-configuration"]
core: [backend]
also: [observability]
---

**Log levels** label each log message with its importance, so you can filter. In production you might keep only the
important ones; when debugging, you turn on the detailed ones.

| Level | Meaning | Example |
|---|---|---|
| **DEBUG** | Detail for developers diagnosing a problem | `Fetched 3 rows for user 42` |
| **INFO** | Normal, notable events | `Order 917 created`, `Server started on :8000` |
| **WARNING** (WARN) | Something unexpected, but handled; might need attention | `Payment provider slow, retrying (attempt 2)` |
| **ERROR** | An operation failed | `Could not save order 917: database timeout` |
| **CRITICAL** (FATAL) | The application can't continue | `Cannot connect to the database; exiting` |

(Names vary slightly by language: Python has WARNING and CRITICAL, others WARN and FATAL.)

```python
import logging
log = logging.getLogger(__name__)

log.debug("cache miss for key %s", key)
log.info("order %s created", order.id)
log.warning("retrying payment (attempt %d)", attempt)
log.error("failed to save order %s", order.id, exc_info=True)
```

## Choosing a level

- **ERROR should mean "someone may need to look at this."** If errors are constant noise, people stop reading
  them, and the real ones get lost. A user typing a wrong password isn't an ERROR. It's normal (INFO or WARNING, or
  nothing at all).
- **A failure you handled** (a retry that succeeded) is a WARNING, not an ERROR.
- **INFO should tell the story** of the app: lifecycle events and business actions, without every detail.
- **DEBUG can be verbose**, because it's off in production by default.

## Configuring

Set the minimum level through configuration, such as `LOG_LEVEL=INFO`
([configuration](/t/app-configuration)). Anything below it is dropped. That lets you raise detail temporarily on a
problem without redeploying code.

Don't log secrets or personal data at *any* level. Levels are also what alerts are often built on, for example
"alert on ERROR rate". See [logging](/t/logging) and [structured logging](/t/structured-logging).
