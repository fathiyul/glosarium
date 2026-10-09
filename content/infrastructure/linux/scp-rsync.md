---
title: "Copying Files Remotely (scp, rsync)"
summary: "Moving files between machines."
levels: { backend: junior, data-engineer: junior }
aliases: ["scp", "rsync", "secure copy"]
prereqs: ["ssh"]
related: ["ssh", "ssh-keys", "archives-compression", "file-permissions", "basic-shell-commands"]
---

Both copy files between machines over [SSH](/t/ssh), using the same login you already use to reach the server.

## scp: simple one-off copy

```sh
scp report.pdf alice@server:/home/alice/        # local -> remote
scp alice@server:/var/log/app.log ./            # remote -> local
scp -r build/ alice@server:/srv/site/           # a directory (-r)
```

The syntax is `source destination`, and the remote side is written `user@host:path`.

## rsync: copy only what changed

```sh
rsync -avz build/ alice@server:/srv/site/
```

- `-a` keeps permissions, timestamps and directory structure (archive mode)
- `-v` shows what it does
- `-z` compresses during transfer

rsync compares the two sides and sends only the differences, so a second run is fast and an interrupted transfer can be resumed. Add `--progress` for a progress display.

## The classic mistake: the trailing slash

For rsync, a slash on the source changes the meaning:

```sh
rsync -a build  server:/srv/site/    # creates /srv/site/build/...
rsync -a build/ server:/srv/site/    # puts the contents directly in /srv/site/
```

## A safety habit with --delete

`--delete` makes the destination match the source by removing extra files there. Always try it first with `--dry-run` (or `-n`), because a wrong path with `--delete` removes real files.

Which to use? `scp` is fine for a single file. Use `rsync` for directories, repeated syncs, and big transfers. Check your system's documentation, since newer versions of `scp` may use a different protocol under the hood, but the command syntax stays the same.
