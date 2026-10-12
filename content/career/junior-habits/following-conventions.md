---
title: "Following Team Conventions"
summary: "Matching the existing style even when you'd do it differently."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["team conventions", "coding conventions", "matching existing style", "consistency with codebase", "code style guide"]
prereqs: ["readability"]
related: ["code-style-consistency", "formatter", "linter", "code-review", "clean-code", "onboarding-yourself"]
core: [backend, frontend, data-engineer]
---

Every codebase has its own habits: naming, folder structure, how errors are handled, how tests are written, how commits and branches are named. As a newcomer,
**match them, even when you'd do it differently**. Consistency makes code easier for everyone to read than any individual's "better" way.

```python
# The codebase everywhere uses `get_user_or_404(...)` to fetch records.
# You'd prefer a different pattern. Use theirs anyway:
user = get_user_or_404(user_id)

# Not a new pattern next to the old one:
user = db.query(User).filter_by(id=user_id).first()
if user is None: raise NotFound()
```

## What counts as a convention

- **Formatting and style**, ideally enforced automatically ([formatter](/t/formatter), [linter](/t/linter)).
- **Naming** for files, functions, tests, branches and commits.
- **Architecture habits**: where logic lives, how layers are organized.
- **Error handling and logging** patterns.
- **Tests**: structure, naming, which tools.
- **Process**: PR size, review expectations, how tickets are written.

## How to find them

- **Read similar code** before writing yours, and copy the shape of an existing example.
- **Look for written guidance**: contributing guide, style guide, README, architecture notes.
- **Run the project's tools** (linter, formatter) and fix what they flag.
- **Read feedback in code reviews** ([receiving code review](/t/receiving-code-review)). Repeated comments reveal unwritten rules.
- **Ask**, if something seems inconsistent: "I noticed A and B both exist. Which should I follow?"

## What if you think the convention is bad?

That's fine and useful, but separate the two things:

1. **Follow it in your change.**
2. **Propose the change separately**, with reasons, to the team ("Could we move to X? Here's why"). If the team agrees, change it
   everywhere (ideally with automation), not just in your corner.

Don't introduce a new style in one file because you like it. You end up with two ways of doing everything. See [code style consistency](/t/code-style-consistency).
Exceptions are real bugs, security issues and conventions that actively cause harm, which you should raise rather than copy.
