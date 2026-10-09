---
title: "Logging"
summary: "Recording what the application does so you can debug it later."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["application logs", "logs", "log messages", "logger"]
prereqs: ["log-levels"]
related: ["log-levels", "structured-logging", "log-rotation", "observability", "request-context", "reading-production-logs"]
core: [backend, data-engineer]
also: [observability]
---

**Logging** is your application writing a record of what it's doing, so that when something breaks (usually when you aren't
watching), you can work out what happened.

```python
import logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
log = logging.getLogger(__name__)

def charge(order):
    log.info("charging order %s for %s cents", order.id, order.total_cents)
    try:
        gateway.charge(order)
    except GatewayError:
        log.exception("charge failed for order %s", order.id)   # includes the stack trace
        raise
```

Use a logging library, not `print`: you get levels, timestamps, names, formatting and control over where output
goes.

## What makes a log useful

- **Context**: *which* order, user or request. "Payment failed" is almost useless; "Payment failed for order 917,
  reason: card declined" is actionable. Include a request or correlation ID so you can follow one request through the
  system ([request context](/t/request-context)).
- **The right [level](/t/log-levels)**, so you can filter.
- **A consistent format**, ideally [structured](/t/structured-logging) (JSON with fields) so tools can search it.
- **Errors with stack traces**, and the original error preserved.
- **Enough, but not too much.** Log decisions and failures, not every loop iteration. Excess costs money, hides
  the signal and slows things down.

## What *not* to log

- **Passwords, tokens, API keys, full card numbers** and other secrets.
- **Personal data** you don't need. Logs are copied around, kept for a long time and read by many people.
- Whole request bodies by default.

## Where logs go

In containers and cloud apps, write to **standard output** and let the platform collect them. Old-style files on a
server need [rotation](/t/log-rotation) so they don't fill the disk. Logs are one pillar of
[observability](/t/observability), together with metrics and traces.

When reading them later, see [reading production logs](/t/reading-production-logs).
