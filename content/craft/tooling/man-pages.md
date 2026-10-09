---
title: "Getting Help (man, --help, tldr)"
summary: "Reading a command's built-in documentation."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["man", "--help", "tldr", "manual pages"]
prereqs: ["basic-shell-commands"]
related: ["basic-shell-commands", "reading-docs", "searching-effectively", "shell", "grep-ripgrep"]
---

Command-line tools come with built-in documentation. Learning to read it means you can answer "what does this flag do?" in seconds, without leaving the terminal.

## The three levels

```sh
ls --help            # a short summary of options (works for most tools)
man ls               # the full manual page
tldr ls              # community-written, example-first cheat sheet (install it separately)
```

`man` opens a pager. Use these keys:

| Key | Does |
|---|---|
| `Space` / `b` | next / previous page |
| `/word` then `n` | search, and jump to the next match |
| `q` | quit |

## How a man page is organized

- **NAME**: one-line description.
- **SYNOPSIS**: the command's shape. Square brackets `[ ]` mean optional, `|` means "or", and `...` means repeatable.
- **DESCRIPTION** and **OPTIONS**: every flag.
- **EXAMPLES**, **SEE ALSO**, and sometimes **EXIT STATUS**.

```
SYNOPSIS
       grep [OPTION...] PATTERNS [FILE...]
```

## Finding things

```sh
man -k "copy files"     # search manual descriptions (same as apropos)
which python            # where a command lives
type cd                 # is it a built-in, an alias or a program?
```

## Tips

- **Start with `--help` or `tldr`** for quick examples, and `man` when you need the details.
- **Flags differ** between systems (GNU/Linux vs macOS). If an option isn't accepted, check the local `man` page, not an online answer for another system.
- **Shell built-ins** like `cd` are documented in the shell's own manual (`help cd` in bash).
- **Tools without man pages** often have `tool help` or online docs ([reading docs](/t/reading-docs)).
