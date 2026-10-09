---
title: "Reading Production Logs"
summary: "Finding the few lines that matter among millions, by request ID, time and level."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["debugging with production logs", "searching logs", "log searching", "grep logs"]
prereqs: ["logging", "log-levels"]
related: ["log-aggregation", "correlation-id", "structured-logging", "request-context", "reproducing-prod-issues", "timezone"]
core: [backend, frontend]
---

Production logs hold millions of lines, and you need the dozen that explain a problem. The skill is **narrowing down fast**
and following one request through the noise.

## A process that works

**1. Start with a specific symptom**: an error message, a user ID, an order number, a failed request ID, and *when* it
happened. Without a time and an identifier, you'll drown.

**2. Set the time window first.** Check the **time zone**: logs are usually in UTC while the user's report is in local time
([time zones](/t/timezone)). Start narrow (a few minutes around the problem) and widen if needed.

**3. Filter by level**, to see the errors in that window, then look at what came right before them
([log levels](/t/log-levels)).

**4. Follow one request** with its **request or correlation ID**: search for the ID and read every line from every service,
in time order ([correlation ID](/t/correlation-id)). This turns a haystack into a story.

**5. Read the first error, not the loudest.** A cascade of 5,000 errors usually began with one. Find the earliest
one, and look at what changed just before (a deploy, a config change, a dependency slowing down).

**6. Form a hypothesis**, then check it against another log line or metric, instead of trusting the first pattern you see.

## Commands

On a server or exported file:

```sh
grep "req_8f3a2c" app.log                      # one request
grep -E "ERROR|CRITICAL" app.log | tail -50    # recent errors
zgrep "order 917" app.log.*.gz                 # inside rotated, compressed files
```

With [structured (JSON) logs](/t/structured-logging), use `jq`:

```sh
jq -c 'select(.level == "error" and .user_id == 42)' app.log
```

In a log platform ([log aggregation](/t/log-aggregation)), the same ideas are query filters: `level:error AND service:checkout`
over a time range, then group by message to see the most common one.

## Habits

- **Use read-only access**, and don't change anything while investigating.
- **Compare with normal**: is this error new, or has it always been there? Look at the same time yesterday.
- **Don't `tail -f` a busy production log** and stare at it. Query the time window instead.
- **Save your findings** (the request ID, the queries you used, a timeline) in the ticket.
- **Mind privacy**: logs may contain personal data. Don't paste them into public places.

If logs don't contain what you need, that's a finding: add the missing context to the logging afterwards
([logging](/t/logging)).
