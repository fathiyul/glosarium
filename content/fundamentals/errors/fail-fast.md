---
title: "Fail Fast"
summary: "Stopping loudly on problems instead of continuing in a bad state."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["fail fast principle"]
prereqs: ["defensive-programming"]
related: ["defensive-programming", "graceful-degradation", "panic", "error-swallowing"]
---

Fail fast means that when something is wrong, the program stops at the first point it can tell, with a clear error, instead of carrying on with bad data. A problem caught at startup or at the boundary is much easier to fix than one that shows up as a wrong total three steps later.

```python
def load_config(env):
    try:
        return {
            "db_url": env["DB_URL"],
            "timeout": int(env["TIMEOUT"]),
        }
    except KeyError as missing:
        raise RuntimeError(f"missing config value: {missing}") from None
```

Without the check, a missing `DB_URL` might show up as a connection error minutes later, or as a silent fallback to a local database that nobody meant to use. Failing at startup names the exact problem while the cause is still in front of you.

The trade-off is between stopping the whole program and handling one bad request. Fail-fast suits startup configuration, invariants inside your own code, and data that must be right to be useful. It's less suitable for a single user's bad input in a long-running server, where crashing the process would hurt everyone. There, validate the request and return an error for that request only.

The classic mistake is catching the error and logging it, then continuing with a default. This is error swallowing in disguise, and the program keeps running in a state its authors never tested. Stop at the first clear sign of a bad state, or make the fallback an explicit, tested choice. [Graceful degradation](/t/graceful-degradation) covers the case where continuing is the right answer.
