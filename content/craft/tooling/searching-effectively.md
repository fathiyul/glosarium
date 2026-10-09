---
title: "Searching Effectively"
summary: "Finding answers fast in error messages, issues, docs and forums."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["googling", "searching for answers", "how to search", "search skills"]
prereqs: ["reading-error-messages"]
related: ["reading-docs", "debugging", "minimal-reproducible-example", "reading-source-code"]
core: [backend, frontend, data-engineer]
---

Developers look things up all day. Searching *well* is a skill, and it often decides whether
you spend two minutes or two hours on a problem.

## Search the error, not your situation

Copy the key part of the error message, remove what's specific to you (file paths, your
variable names, IDs), and add the tool and language:

```
Bad:   "my react app shows blank page after login help"
Good:  "Cannot read properties of undefined (reading 'map')" react
```

- Put the **exact message in quotes** for an exact match.
- Include the **name and version** of the library, framework or language. Answers for
  an old major version are often wrong for yours.
- Describe what you want in the *standard words* for it. If you don't know them
  ("that thing where a function remembers variables"), search the description, and then
  note the term it leads you to ([closure](/t/closure)).

## Where to look

| Source | Good for |
|---|---|
| **Official docs** | The correct, current answer ([reading docs](/t/reading-docs)) |
| **The project's issue tracker** | Known bugs, workarounds, "is this expected?" |
| **Q&A sites and forums** | Specific errors and how-to questions |
| **Release notes / changelog** | "It broke after the upgrade" |
| **Source code and tests** | When nothing documents it ([reading source](/t/reading-source-code)) |

## Evaluating what you find

- **Check the date and version.** Is it still true?
- **Understand before pasting.** Read an answer to see *why* it works. Look at the comments
  and other answers, which often add warnings.
- **Be careful with commands** from unknown sources, especially ones using `sudo`, `curl | sh`
  or deleting things.
- If your first three searches fail, change the query; don't repeat it. Try different
  words, a narrower error or the library's name.

If you still can't find it, make a [minimal example](/t/minimal-reproducible-example) and ask.
Say what you searched and found.
