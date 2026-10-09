---
title: "Go to Definition / Find References"
summary: "Navigating code by symbol instead of searching text."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["find references", "find usages", "code navigation"]
prereqs: ["ide"]
related: ["ide", "language-server", "reading-a-codebase", "rename-refactoring", "grep-ripgrep"]
---

Go to definition jumps from a name to where it's defined: a function, class, variable or type. Find references does the reverse: it lists everywhere that name is used. Together they let you navigate code by meaning, not by searching for text.

In VS Code, `F12` is go to definition, `Shift+F12` finds references, and hovering shows a quick summary. JetBrains IDEs use `Ctrl+B` (or Cmd+B) and `Alt+F7`. Most editors also have "go to implementation", "go to type definition" and "peek", which shows the definition in a small panel without leaving your place.

## Why it beats text search

Searching for `save` finds every word "save": comments, strings, unrelated functions. Find references uses the language's rules, so it finds exactly the uses of this `save` method, and not other things with the same name.

## What it's used for

- **Reading unfamiliar code**: follow a call down to its implementation ([reading a codebase](/t/reading-a-codebase)).
- **Seeing impact before a change**: who calls this function?
- **Safe renames and refactors**, since the same machinery powers them ([rename](/t/rename-refactoring), [IDE refactoring](/t/automated-refactoring)).
- **Understanding libraries**: jump into a dependency's source to see what it really does.

## How it works

Editors ask a language server that understands your project's code ([language server](/t/language-server)). If it doesn't work, check that the project is opened at the right root, dependencies are installed, and the language extension is running.

## Limits

- **Dynamic code** (`getattr`, reflection, strings used as names) can't always be resolved.
- **Cross-service calls** (an HTTP request to another repository) need text search.
- Generated code and untyped languages give weaker results.

Fall back to [grep or ripgrep](/t/grep-ripgrep) when navigation can't follow the link.
