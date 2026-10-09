---
title: "Pipes and Redirection"
summary: "Chaining commands with a pipe and sending output to files with >."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["pipe", "redirect", "stdout stderr", "shell pipelines"]
prereqs: ["basic-shell-commands"]
related: ["basic-shell-commands", "grep-ripgrep", "shell", "shell-scripting", "text-processing-tools"]
---

Shell commands read from standard input (stdin), write results to standard output (stdout), and send errors to standard error (stderr). Pipes and redirection let you connect them.

## Pipes: output of one command into the next

```sh
ls | wc -l                          # count the files
cat app.log | grep ERROR | sort | uniq -c | sort -rn | head
ps aux | grep python
```

Each command does one simple job, and the pipe chains them into something powerful.

## Redirection: to and from files

```sh
echo "hello" > file.txt             # write stdout to a file (overwrites)
echo "more" >> file.txt             # append
sort < names.txt                    # read stdin from a file
command 2> errors.log               # send only errors to a file
command > out.log 2>&1              # send both to one file
command > /dev/null 2>&1            # throw all output away
```

| Symbol | Meaning |
|---|---|
| `\|` | pipe stdout into the next command |
| `>` | stdout to a file, replacing it |
| `>>` | stdout appended to a file |
| `<` | file as stdin |
| `2>` | stderr to a file |
| `2>&1` | send stderr to wherever stdout goes |

## Useful extras

```sh
command | tee output.txt            # show it AND save it
grep -r "TODO" . | head -20
curl -s https://api.example.com | jq '.items[0]'
```

## Cautions

- **`>` silently overwrites** the target file. Use `>>` or check first.
- **Pipes carry only stdout.** Error messages still show on screen unless you use `2>&1`.
- **`sudo command > /etc/file` doesn't work as expected**: the redirection runs as you, not as root. Use `sudo tee`.
- **A failed command in the middle of a pipeline** may be hidden. Use `set -o pipefail` in scripts ([shell scripting](/t/shell-scripting)).
- **Reading and writing the same file** in one command (`sort f > f`) empties it.
