---
title: "YAGNI (You Aren't Gonna Need It)"
summary: "Don't build things before you need them."
levels: { backend: junior, frontend: junior }
aliases: ["You Aren't Gonna Need It", "You Ain't Gonna Need It"]
prereqs: ["kiss"]
related: ["kiss", "premature-abstraction", "premature-optimization", "dry", "framework-independence"]
core: [backend, frontend]
---

**YAGNI** ("You Aren't Gonna Need It") says: don't build something because you *might* need it
later. Build it when you actually do. It comes from Extreme Programming.

```python
# Needed today
def send_welcome_email(user):
    ...

# Built "just in case", used by nothing
class NotificationManager:
    def __init__(self, channels=("email", "sms", "push", "slack"), retry_policy=None,
                 template_engine=None, plugins=None): ...
```

The second one has four channels, a plugin system and a template engine, and the product only
sends one email.

## Why guessing is expensive

- **You're probably wrong** about what the future needs, so the extra code doesn't fit
  when the real requirement arrives.
- **Extra code has a cost now.** It has to be written, tested, read, maintained and
  debugged, even if it's never used.
- **It makes the real work harder**, by adding more things to understand.
- Waiting is cheap if your code is easy to change.

## Typical offenders

- Configuration options nobody asked for.
- Generic frameworks built for one use case.
- Database columns or API fields "for later".
- Abstractions with only one implementation.

## What YAGNI doesn't mean

It is not "skip tests", "write messy code" or "ignore the design". Good structure, clear
names and tests are what *make* it cheap to add features later. And some things are expensive
to retrofit (security, data models you can't easily migrate, public API shapes), so
think about those up front.

Ask: "Is there a requirement today that needs this?" If not, leave it out. Related ideas:
[KISS](/t/kiss) and [premature abstraction](/t/premature-abstraction).
