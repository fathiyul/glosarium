---
title: "Error Tracking"
summary: "Tools like Sentry that group and report exceptions."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["exception tracking", "crash reporting", "Sentry", "Rollbar", "Bugsnag", "error monitoring"]
prereqs: ["logging", "stack-trace"]
related: ["observability", "alerting", "source-map", "structured-logging", "no-sensitive-data-in-logs", "apm"]
core: [backend, frontend]
---

**Error tracking** tools (Sentry is a well-known example; others include Rollbar, Bugsnag and Honeybadger) catch unhandled exceptions
and failures from your running application, group them, and tell you about them with the context needed to fix them.

Without one, you learn about a bug when a user complains, if they do. With one, you get this:

```
TypeError: Cannot read properties of undefined (reading 'name')
  at renderUser (profile.js:42)         ← the stack trace, mapped back to source
  Seen 214 times, affecting 57 users
  First seen: release 2.8.1 · Last seen: 3 minutes ago
  Browser: Safari 17 · URL: /profile · User: id 8841
```

## What they do for you

- **Capture** errors automatically from the backend and frontend, with the [stack trace](/t/stack-trace) and the
  request or page involved.
- **Group** identical errors into one issue (usually by comparing stack traces), so 10,000 occurrences are one
  line, not 10,000.
- **Add context**: which release, environment, user (ID only), browser, and **breadcrumbs** (the actions and requests leading up to the error).
- **Alert** when a new error appears, or a known one spikes ([alerting](/t/alerting)).
- **Track releases**, so you can see "this started in 2.8.1" and whether a fix worked.

## Setting it up well

- **Tag every event with release and environment**, so production issues aren't mixed with development noise.
- **Upload [source maps](/t/source-map)** for frontend code, or the traces are unreadable.
- **Scrub sensitive data** (passwords, tokens, personal data) before events leave your system
  ([keeping sensitive data out of logs](/t/no-sensitive-data-in-logs)). Request bodies and headers can contain secrets.
- **Don't swallow exceptions.** An error caught and ignored never reaches the tracker. Catch to handle it; if you can't, let it
  propagate or report it deliberately.
- **Add your own context** for important operations (order ID, tenant).

## Using it day to day

- **Triage**: fix what affects the most users or the most important flows first. Ignore known harmless noise explicitly (and
  don't just leave it) so that real alerts stand out ([alert fatigue](/t/alert-fatigue)).
- **Resolve issues** when fixed, so a regression reopens them.
- Errors are one part of the picture. Logs, metrics and traces give the rest ([observability](/t/observability)).

Production sampling and quotas exist because high traffic can generate huge numbers of events, so know your plan's limits.
