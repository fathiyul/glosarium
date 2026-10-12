---
title: "EditorConfig"
summary: "A shared config for indentation and line endings across editors."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: [".editorconfig", "EditorConfig file"]
prereqs: ["formatter"]
related: ["formatter", "linter", "code-style-consistency", "ide", "git"]
---

EditorConfig is a small file, `.editorconfig`, that tells different editors the basic formatting rules for a project: indentation, line endings, final newline. Anyone who opens the project gets the same settings, whatever their editor.

```ini
# .editorconfig (in the project root)
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.py]
indent_size = 4

[Makefile]
indent_style = tab
```

Most editors support it, either built in or through a plugin.

## Why use it

- **No whitespace fights.** One person using tabs and another using spaces creates noisy diffs and merge conflicts.
- **Consistent line endings** across Windows and Unix machines.
- **Zero setup for newcomers**: clone the repository and the editor behaves.
- **Smaller, cleaner diffs** ([code style consistency](/t/code-style-consistency)).

## What it doesn't do

It covers basic whitespace and encoding. It doesn't reformat code, enforce naming or find bugs. For that, use a [formatter](/t/formatter) such as Prettier or Black, and a [linter](/t/linter). They work together: EditorConfig sets the editor, and the formatter fixes everything on save or in CI.

## Habits

- **Commit it** with the project.
- **Keep it consistent** with your formatter's settings (indent size and line width), so they don't fight.
- Use `root = true` so editors stop looking in parent folders.
- Override per file type where a language needs it (tabs in Makefiles).
