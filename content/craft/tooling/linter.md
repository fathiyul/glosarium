---
title: "Linter"
summary: "A tool that flags likely bugs and style issues."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["linting", "lint", "ESLint", "Ruff", "Pylint", "flake8"]
prereqs: ["readability"]
related: ["formatter", "static-analysis", "pre-commit-hooks", "code-smell", "code-style-consistency"]
core: [backend, frontend, data-engineer]
---

A **linter** reads your code *without running it* and flags likely bugs, risky patterns and
style problems.

```js
// ESLint output
 3:7  error  'total' is assigned a value but never used   no-unused-vars
 9:5  error  Expected '===' and instead saw '=='           eqeqeq
```

```sh
npx eslint .        # JavaScript / TypeScript
ruff check .        # Python (others: flake8, pylint)
```

## What they catch

- Unused variables and imports.
- Use of an undefined name (often a typo).
- Unreachable code.
- Risky patterns, like `==` in JavaScript, bare `except:` in Python, or comparing to `None`
  with `==`.
- Team conventions: naming and import order.

A linter is a tireless reviewer for the boring things, leaving humans to look at design and logic.

## Linter vs formatter

A [formatter](/t/formatter) rewrites *layout*. A linter reports *problems*, and some can
auto-fix the simple ones (`--fix`). Use both.

## Using it well

- **Run it in your editor** so you see warnings as you type.
- **Run it in CI** so rules apply to everyone.
- **Fix warnings; don't silence them.** If you disable a rule on a line, add a comment saying why.
- **Start with a recommended preset** rather than turning on every rule. Too many noisy rules get ignored.
- **Treat a warning as a question.** Sometimes the linter is wrong, but check first.

Linters are a light form of [static analysis](/t/static-analysis); heavier tools do deeper
checks such as type analysis and security scanning. They won't tell you whether your program
does the right thing; that's what tests are for.
