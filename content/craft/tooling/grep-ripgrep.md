---
title: "grep / ripgrep"
summary: "Searching text across files from the terminal."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["grep", "ripgrep", "rg", "find text in files"]
prereqs: ["basic-shell-commands"]
related: ["regular-expression", "searching-effectively", "go-to-definition", "pipes-and-redirection", "reading-a-codebase"]
---

`grep` searches for text inside files, and `ripgrep` (command `rg`) is a faster, friendlier alternative. They're how you find where something is used across a codebase, or look through logs.

```sh
grep "TODO" notes.txt                    # lines containing TODO
grep -rn "send_email" src/               # search a folder recursively, show line numbers
grep -i "error" app.log                  # ignore case
grep -v "debug" app.log                  # lines that do NOT match
grep -E "ERROR|WARN" app.log             # extended regex: either word
grep -c "timeout" app.log                # just count the matching lines
grep -rn --include="*.py" "db.query" .   # only Python files

rg "send_email"                          # ripgrep: recursive by default
rg -n "TODO" -g "*.ts"                   # only TypeScript files
rg -w "id"                               # match whole words only
rg -C 3 "ValueError"                     # show 3 lines of context around each match
```

## Why ripgrep

- **Fast**, and searches the current directory recursively by default.
- **Respects `.gitignore`**, so it skips `node_modules`, build output and hidden files.
- **Colored, readable output.**

## Useful combinations

```sh
tail -n 1000 app.log | grep "req_8f3a2c"      # filter a pipe
grep -rl "oldFunction" src/ | xargs sed -i 's/oldFunction/newFunction/g'   # careful!
```

Pipes are covered in [pipes and redirection](/t/pipes-and-redirection).

## Tips

- **Patterns are regular expressions** by default, so `.` and `(` are special. Use `-F` (fixed string) to search literally ([regular expressions](/t/regular-expression)).
- **Quote the pattern** so the shell doesn't interpret it.
- **Search for the error message** or a unique string from the UI to find the code behind it.
- In an editor, project-wide search does the same with a nicer interface. For finding definitions and usages, prefer [go to definition](/t/go-to-definition).
