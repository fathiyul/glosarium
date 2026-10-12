---
title: "Formatter"
summary: "A tool that rewrites code to a consistent style automatically."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["code formatter", "auto formatter", "Prettier", "Black", "gofmt"]
prereqs: ["readability"]
related: ["linter", "code-style-consistency", "pre-commit-hooks", "editorconfig", "static-analysis"]
core: [backend, frontend, data-engineer]
---

A **formatter** rewrites your code into one consistent layout (indentation, spacing, line
breaks, quote style) automatically. You stop thinking about style and stop arguing about it.

```python
# before
def  add( a,b ):
    return {'sum':a+b,
      'inputs':[a,b]}

# after Black / ruff format
def add(a, b):
    return {"sum": a + b, "inputs": [a, b]}
```

Common ones: **Prettier** (JavaScript, TypeScript, CSS, Markdown), **Black** and
**Ruff** (Python), **gofmt** (Go), **rustfmt** (Rust).

## Why use one

- **No style debates** in code reviews. The tool decides.
- **Smaller diffs**: only real changes show up, not whitespace noise.
- **Consistency** across the team and over time ([style consistency](/t/code-style-consistency)).

## Making it automatic

- Turn on **format on save** in your editor.
- Run it in a **pre-commit hook** ([pre-commit hooks](/t/pre-commit-hooks)), so nothing
  unformatted is committed.
- Check it in **CI** (`prettier --check .`, `black --check .`), so the build fails if someone forgot.

```sh
npx prettier --write .
black .
```

## Notes

- A formatter changes *layout*. It does not find bugs. That's the job of a [linter](/t/linter).
  They work together, and their rules should not fight each other.
- Keep configuration minimal. Use the default settings unless the team has reasons not to.
- When you first add a formatter to an existing project, do it in its own commit so it doesn't
  bury real changes (and so `git blame` can skip it).
- Settings can be shared via `.editorconfig` or the tool's config file.
