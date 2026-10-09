---
title: "Consistency"
summary: "Doing similar things the same way across a codebase."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["consistency", "consistent style", "coding style"]
prereqs: ["readability"]
related: ["formatter", "linter", "following-conventions", "naming", "clean-code"]
---

Code style consistency means doing similar things the same way across a codebase: the same naming, structure, error handling and formatting everywhere. A codebase that looks like one person wrote it is far easier to read than one with five competing styles.

```python
# Inconsistent: three ways to say the same thing
def getUser(id): ...
def fetch_order(order_id): ...
def LoadInvoice(inv): ...

# Consistent
def get_user(user_id): ...
def get_order(order_id): ...
def get_invoice(invoice_id): ...
```

## Why it matters

- **Less to think about.** When everything follows a pattern, readers recognize it, and notice what's different.
- **Fewer pointless debates.** Style arguments in reviews waste time.
- **Easier changes.** You can search and refactor mechanically when names and patterns are uniform.
- **Smaller diffs**, without whitespace noise.
- **Fewer bugs**, since odd code stands out.

## What to be consistent about

- **Formatting**: indentation, line length, quotes.
- **Naming**: casing, verbs for functions, how to name booleans, abbreviations ([naming](/t/naming)).
- **Structure**: where files go, how modules are organized.
- **Patterns**: how errors are handled, how dependencies are passed, how tests are written.
- **API conventions**: URLs, response shapes, error formats.

## How to get it

- **Automate formatting** with a [formatter](/t/formatter) and checks with a [linter](/t/linter), and enforce them in CI. Tools don't argue.
- **Write down the decisions** that tools can't check, in a short style guide or contributing doc.
- **Follow the existing code** when you add to it ([following conventions](/t/following-conventions)).
- **Review for it**, kindly, and add automation when the same comment repeats.

## Balance

Consistency within a codebase matters more than which style you pick. If you think the convention is wrong, propose changing it everywhere, with tooling to migrate, instead of introducing a second style. Don't enforce consistency so rigidly that it blocks clear, better code in a new area. See [clean code](/t/clean-code).
