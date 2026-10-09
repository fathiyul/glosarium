---
title: "Shell"
summary: "The program interpreting your commands: bash, zsh, fish."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["bash", "zsh", "fish", "command interpreter"]
prereqs: ["terminal"]
related: ["terminal", "basic-shell-commands", "shell-scripting", "environment-variable", "pipes-and-redirection"]
---

The shell is the program that reads the commands you type, runs them and shows the results. The terminal is the window; the shell is what's inside it ([terminal](/t/terminal)).

Common shells:

| Shell | Notes |
|---|---|
| **bash** | the long-time default on Linux, and widely used in scripts |
| **zsh** | the default on macOS, with nice completion and customization |
| **fish** | friendly out of the box, with a different syntax |
| **PowerShell** | Windows-focused, passes objects rather than text |
| **sh** | the minimal, portable POSIX shell |

```sh
echo $SHELL            # your login shell
```

## What a shell does

- **Runs programs**, finding them through the [PATH](/t/path-variable).
- **Expands things** before running: `*.txt` becomes a list of files, `$HOME` becomes your home directory, `~` becomes the path.
- **Connects commands** with [pipes and redirection](/t/pipes-and-redirection).
- **Holds variables and settings** ([environment variables](/t/environment-variable)).
- **Offers history and completion**: the up arrow, `Ctrl+R`, and Tab.
- **Runs scripts**: files of commands, with variables, conditions and loops ([shell scripting](/t/shell-scripting)).
- Provides **built-in commands** like `cd` and `export`, which can't be separate programs.

## Gotchas

- **Spaces and quoting**: `rm -rf $DIR/*` with an empty or space-containing `$DIR` does something unexpected. Quote variables: `"$DIR"`.
- **Syntax differs** between shells. A bash script may not run in `sh` or fish.
- **Startup files** (`.bashrc`, `.zshrc`) set your environment, and differ for login and non-login shells.
- **Wildcards are expanded by the shell**, not by the program.

Learning a few shell basics pays off for years: it's how you drive servers, containers, CI and most developer tools ([basic shell commands](/t/basic-shell-commands)).
