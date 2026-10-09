---
title: "Terminal / Command Line"
summary: "Controlling your computer and tools through text commands."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["command line", "CLI", "console", "command prompt"]
prereqs: ["basic-shell-commands"]
related: ["shell", "basic-shell-commands", "ssh", "terminal-editors", "pipes-and-redirection"]
---

The terminal (also called the command line or console) is a text window where you control your computer and tools by typing commands, instead of clicking. Inside it runs a [shell](/t/shell) that interprets what you type.

```
ana@laptop:~/project$ ls
README.md  src  tests
ana@laptop:~/project$ git status
```

## Why developers use it

- **It's how many tools work**: Git, package managers, build tools, containers, cloud CLIs, SSH.
- **Scriptable.** Anything you type can be saved in a script and repeated ([shell scripting](/t/shell-scripting)).
- **Fast** once you know the commands, and combinable ([pipes](/t/pipes-and-redirection)).
- **Works everywhere**, including remote servers with no desktop ([SSH](/t/ssh)).
- **Reproducible**: instructions in docs can be copy-pasted.

## Names that get mixed up

| Term | Meaning |
|---|---|
| **Terminal (emulator)** | the window or app: Terminal.app, Windows Terminal, iTerm, the VS Code panel |
| **Shell** | the program inside that interprets commands: bash, zsh ([shell](/t/shell)) |
| **CLI** | a program you use through commands, such as `git` or `docker` |
| **Console** | an older word, often a synonym for terminal |

## Getting comfortable

- Learn the basics: moving around, listing, copying, searching ([basic shell commands](/t/basic-shell-commands)).
- Use **Tab completion** and the **up arrow / Ctrl+R** history.
- **Read what a command does** before pasting it, especially anything with `sudo` or `rm`.
- Use `--help` and `man` when unsure ([getting help](/t/man-pages)).
- Know how to stop things: **Ctrl+C** interrupts a running command.
- On Windows, WSL gives a Linux shell, and PowerShell is the native one.

You don't need to memorize hundreds of commands. A couple dozen, plus the habit of looking things up, covers most days.
