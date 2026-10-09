---
title: "stdin, stdout, stderr"
summary: "The three standard streams every process starts with."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["standard input", "standard output", "standard error", "stdio streams"]
prereqs: ["terminal", "shell"]
related: ["pipes-and-redirection", "file-descriptor", "logging", "exit-code", "shell-scripting"]
---

Every process starts with three standard streams already open.

| Stream | Number | Default | Purpose |
|---|---|---|---|
| **stdin** | 0 | the keyboard | input to the program |
| **stdout** | 1 | the terminal | normal output |
| **stderr** | 2 | the terminal | error and diagnostic messages |

```python
import sys
name = input("Name: ")                  # reads from stdin
print("Hello")                          # writes to stdout
print("Something failed", file=sys.stderr)   # writes to stderr
```

```js
console.log("result");     // stdout
console.error("problem");  // stderr
```

## Why two output streams

It lets you separate results from messages about the results. When you redirect output to a file, errors still reach your screen:

```sh
./report > report.txt           # data goes to the file, errors show on screen
./report 2> errors.log          # errors go to a file
./report > all.log 2>&1         # both together
./report | grep total           # a pipe carries stdout only
```

([pipes and redirection](/t/pipes-and-redirection))

## Good habits for programs

- **Write data to stdout** and **diagnostics to stderr**, so output can be piped without noise.
- **Read from stdin** when no filename is given, so your tool works in pipelines.
- **Set a non-zero [exit code](/t/exit-code)** on errors.
- In containers and cloud platforms, **log to stdout and stderr**, and let the platform collect them ([logging](/t/logging), [twelve-factor app](/t/twelve-factor-app)).

## Under the hood

They're file descriptors 0, 1 and 2 ([file descriptors](/t/file-descriptor)), and redirection just reconnects them to files or pipes.

Output may be **buffered**: when stdout is a file or pipe, text can appear late, or be lost if the program crashes before flushing. In Python, `flush=True` or `python -u` helps when debugging.
