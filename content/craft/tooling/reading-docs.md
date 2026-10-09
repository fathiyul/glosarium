---
title: "Reading Documentation"
summary: "Going to the official docs first, and knowing how to navigate them."
levels: { backend: junior, frontend: junior }
aliases: ["documentation reading", "RTFM", "reading the docs", "official documentation"]
related: ["reading-source-code", "searching-effectively", "reading-error-messages", "debugging"]
core: [backend, frontend]
---

When you're stuck or learning a tool, the official documentation should usually be your first
stop. It's more accurate and current than most blog posts and videos, and it's written by the
people who built the thing. Learning to use docs well is a core skill, not a beginner's
chore.

## Most docs have the same parts

| Part | Use it to |
|---|---|
| **Getting started / tutorial** | Learn the basics in order, first time |
| **Guides / how-tos** | Do a particular task (set up auth, deploy) |
| **Concepts / explanations** | Understand why it works as it does |
| **Reference** | Look up exact details: function signatures, options, return values, errors |

Pick the right one. Reading the reference to *learn* is slow, and reading a tutorial to find an
option name is also slow.

## Habits

- **Check the version.** Docs for v2 can be wrong for your v4. There's usually a version selector.
- **Use the search box**, and search for exact names (`useEffect`, `--force-with-lease`).
- **Read the whole section**, not just the code sample. Warnings and caveats sit in the
  surrounding text.
- **Copy examples, then change them** one thing at a time, so you know what each part does.
- **Look at the changelog or migration guide** when something stopped working after an upgrade.
- **Keep notes** on the pages you keep going back to.

## When the docs aren't enough

- Search the project's issue tracker; others may have hit your problem.
- Read the tests and examples in the repository.
- [Read the source](/t/reading-source-code). It's the final truth.
- Ask, with a clear question and a [minimal example](/t/minimal-reproducible-example).

Be wary of copying code from random sources without checking the official docs, because it might
use deprecated APIs or be wrong for your version. When you find a gap or error in the docs,
reporting it (or fixing it) helps everyone.
