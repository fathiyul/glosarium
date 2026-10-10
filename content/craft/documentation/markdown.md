---
title: "Markdown"
summary: "The plain-text formatting syntax used for READMEs, docs and PRs."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["Markdown syntax", ".md", "GitHub Flavored Markdown", "GFM"]
related: ["readme", "docs-as-code", "technical-writing", "pr-description"]
core: [backend, frontend, data-engineer]
---

**Markdown** is a lightweight way to write formatted text in plain characters. It's used for
READMEs, documentation, pull request descriptions, issues and notes, and it stays readable
even before it's rendered.

````markdown
# Heading 1
## Heading 2

Some **bold**, some *italic*, and `inline code`.

- A bullet
- Another bullet
  1. A nested numbered item

[Link text](https://example.com)
![Alt text](diagram.png)

> A quote

```python
print("a code block, with the language after the opening fence")
```

| Name | Role |
|------|------|
| Ana  | Dev  |
````

## Things to know

- **Blank lines matter.** Separate paragraphs, lists and code blocks with one.
- **Use fenced code blocks** (three backticks) with a language name for syntax highlighting.
- **Tables, task lists (`- [ ]`) and strikethrough** are extensions (GitHub Flavored Markdown). Not
  every renderer supports them, since Markdown isn't one strict standard. Check how your platform
  renders it.
- **Line breaks:** a single newline usually joins lines into one paragraph. End a line with two
  spaces or leave a blank line to break.
- **Escape special characters** with a backslash (`\*`) when you want them literally.
- **Use relative links** for files within the same repo (`[setup](docs/setup.md)`).

Previews in your editor or on GitHub let you check the result. Write headings in order
(`#`, then `##`), because tools build tables of contents and navigation from them.

Docs-as-code teams keep Markdown files next to the code in Git, reviewed like any change
(see [docs as code](/t/docs-as-code)).
