---
title: "Production Consoles"
summary: "Interactive shells against live data, like a Rails or Django console, and their dangers."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["production console", "rails console", "django shell"]
prereqs: ["adhoc-production-queries", "break-glass-access"]
related: ["one-off-script", "production-data-fix", "read-replica", "least-privilege", "backups"]
---

A **production console** is an interactive shell into the running application with access to live data and real objects: `rails console`, Django's shell, `psql`, a language REPL pointed at the production database. It's genuinely useful — you can inspect state, reproduce a bug, or check what a model returns — because it has the app's full context, not just raw SQL.

It's also one of the easiest ways to cause an incident. A console executes whatever you type immediately, with no review, no staging step and often no transaction. A mistyped method call can update every row.

```ruby
# looks harmless, touches every user
User.find_each { |u| u.update(active: false) }
```

Habits that keep a console useful without being lethal:

- Default to read-only. Query and inspect; don't write. Use a [read replica](/t/read-replica) where possible.
- Never run bulk writes from the console. Write a [one-off script](/t/one-off-script) and review it instead (see [fixing data in production](/t/production-data-fix)).
- Wrap anything that does write in a transaction you can roll back before committing.
- Know what your query does before you run it. Check the scope: `.where(...).count` before `.update_all`.
- Use [break-glass access](/t/break-glass-access), not standing production credentials. Access should be granted, logged and time-limited.
- Don't paste live data around. Console output can contain personal data; keep it out of chats and tickets.

The classic mistakes are treating the console as a safe place "just to look" (then writing from it), and using it as the default way to change data instead of a reviewed script. The more you rely on a console for writes, the fewer changes go through review and the less anyone can reconstruct what happened.

Used carefully, a console is an excellent debugging tool. The rule of thumb: **read freely, write from a script.** Close it when you're done and prefer access that expires, following [least privilege](/t/least-privilege).
