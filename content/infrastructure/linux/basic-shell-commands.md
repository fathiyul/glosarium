---
title: "Basic Shell Commands"
summary: "ls, cd, cp, mv, rm, cat, less and find."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["shell commands", "terminal commands", "ls cd cp mv rm", "command line basics", "bash commands"]
prereqs: ["shell", "terminal"]
related: ["pipes-and-redirection", "linux-directory-structure", "text-processing-tools", "man-pages", "grep-ripgrep", "managing-processes"]
core: [backend]
---

A handful of commands cover most of what you'll do in a terminal.

## Moving around

```sh
pwd                    # print the working directory (where am I?)
ls                     # list files        ls -l: details      ls -a: include hidden (.dotfiles)
cd projects/app        # change directory   cd ..: up one level   cd: go home   cd -: previous directory
```

Paths can be **absolute** (start at `/`: `/home/ana/app`) or **relative** to where you are (`./app`, `../other`). `~`
means your home directory.

## Working with files

```sh
mkdir -p a/b/c         # create directories (-p: make parents too)
touch notes.txt        # create an empty file (or update its timestamp)
cp a.txt b.txt         # copy               cp -r dir1 dir2: copy a directory
mv a.txt docs/         # move or rename     mv old.txt new.txt
rm file.txt            # delete a file      rm -r dir: delete a directory and its contents
```

**`rm` does not use a trash can.** Deleted means gone. Be extra careful with `rm -rf` (recursive and forced) and with wildcards.
A stray space (`rm -rf / tmp`) or a variable that turned out empty (`rm -rf "$DIR"/*`) can delete far more than you meant.
Run `ls` with the same pattern first to see what matches.

## Reading files

```sh
cat file.txt           # print the whole file
less file.txt          # page through it (q to quit, / to search)
head -n 20 file.txt    # first 20 lines
tail -n 50 app.log     # last 50 lines      tail -f app.log: follow as it grows
```

## Finding things

```sh
find . -name "*.py"            # files by name, recursively
grep -rn "TODO" src/           # text inside files (see grep/ripgrep)
which python                   # where is this command?
```

## Habits that save time

- **Tab completion**: press Tab to finish names. It also prevents typos.
- **Up arrow / Ctrl+R** to bring back and search previous commands.
- **`man ls`** or **`ls --help`** for documentation ([man pages](/t/man-pages)).
- **Ctrl+C** stops a running command. **Ctrl+L** clears the screen.
- Quote paths that contain spaces.
- Combine commands with pipes, `ls | wc -l` ([pipes and redirection](/t/pipes-and-redirection)).

Flags differ slightly between Linux, macOS and other systems, so check the manual if something behaves differently from a tutorial.
