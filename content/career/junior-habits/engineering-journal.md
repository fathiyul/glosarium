---
title: "Keeping an Engineering Journal"
summary: "Writing down what you learn, decide and get stuck on."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["dev journal", "work log"]
prereqs: ["learning-how-to-learn"]
related: ["learning-how-to-learn", "brag-document", "onboarding-yourself"]
---

An engineering journal is a running log of what you work on, what you learn, the decisions you make and where you get stuck. It can be a plain text file, a notebook or a shared document. What matters is that you write it regularly and keep it.

Short entries are enough. Note the date, what you were doing, and what you found out.

```
2026-03-04
- Login bug: the token was refreshed after the request was sent. Fixed by awaiting the refresh.
- Stuck on: why the staging DB migration hung. Checked locks, found an open transaction from a script.
- Next: ask Grace whether we should set a lock timeout.
```

A journal pays off in three ways. It helps you remember how you fixed something last time. It gives you material for performance reviews and job applications, which is why many people keep a [brag document](/t/brag-document) alongside it. And writing down a problem often makes it clearer, sometimes before you've asked anyone for help.

The classic mistake is treating the journal as a diary of everything, or giving up after a week because entries feel too small. Write what would have saved you time if you'd read it a month ago. Small, specific notes are more useful than long, occasional ones.
