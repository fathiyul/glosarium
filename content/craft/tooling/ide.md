---
title: "IDE / Code Editor"
summary: "Your main tool for editing, navigating, refactoring and debugging."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["IDE", "code editor", "VS Code", "IntelliJ", "text editor"]
prereqs: ["basic-shell-commands"]
related: ["keyboard-shortcuts", "go-to-definition", "automated-refactoring", "debugger", "language-server"]
---

An IDE (integrated development environment) is the application where you write code. It combines an editor with tools you need all day: navigation, autocomplete, refactoring, a debugger, version control and a terminal. A code editor is lighter, and many gain IDE features through extensions.

Common ones: VS Code (an editor with a huge extension ecosystem), the JetBrains family (IntelliJ IDEA, PyCharm, WebStorm), Visual Studio, Xcode, and terminal editors such as Vim and Neovim ([terminal editors](/t/terminal-editors)).

## What an IDE does for you

- **Autocomplete and inline errors**, powered by a [language server](/t/language-server).
- **[Go to definition and find references](/t/go-to-definition).**
- **[Safe refactoring](/t/automated-refactoring)**: rename, extract, move.
- **A [debugger](/t/debugger)** with breakpoints and variable inspection.
- **Running and debugging tests** with a click.
- **Git integration**: diffs, staging, blame ([Git](/t/git)).
- **Formatting and linting** on save ([formatter](/t/formatter), [linter](/t/linter)).
- **An integrated terminal.**

## Choosing

There's no single best one. Pick what suits your language and habits, and a tool your team can help with. Many people use one IDE for a language that benefits from deep analysis (Java, Kotlin, C#), and a lighter editor elsewhere.

## Getting more from it

- **Learn the shortcuts** for what you do constantly ([keyboard shortcuts](/t/keyboard-shortcuts)).
- **Use the debugger** instead of only print statements.
- **Share settings** that matter to the team: formatter config, recommended extensions, [EditorConfig](/t/editorconfig), in the repository.
- **Don't over-install extensions.** They slow the editor and can be a security risk, so trust the source.
- **Keep it updated**, and learn the command palette.

Being comfortable in your editor is a multiplier on everything else you do ([dev environment setup](/t/dev-environment-setup)).
