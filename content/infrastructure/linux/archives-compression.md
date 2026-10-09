---
title: "Archiving and Compression (tar, gzip, zip)"
summary: "Bundling and compressing files."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["tar", "gzip", "zip", "tar.gz", "tarball"]
prereqs: ["file-system"]
related: ["scp-rsync", "basic-shell-commands", "file-system", "stdin-stdout-stderr", "disk-usage"]
---

Two separate jobs that are often combined:

- **Archiving** bundles many files into one file. `tar` does this.
- **Compression** makes data smaller. `gzip` does this (to a single stream of data).

A `.tar.gz` (or `.tgz`) is an archive that has then been compressed. `zip` does both in one format and is common when sharing with Windows users.

```sh
tar -czf backup.tar.gz project/      # create (c), gzip (z), to file (f)
tar -tzf backup.tar.gz               # list contents (t) without extracting
tar -xzf backup.tar.gz               # extract (x)
tar -xzf backup.tar.gz -C /tmp/out   # extract into another directory

gzip big.log                         # replaces big.log with big.log.gz
gunzip big.log.gz                    # reverse

zip -r site.zip site/                # zip a directory
unzip site.zip
```

Memory aid: `c`reate, `x`tract, `t`ist, `z` = gzip, `f` = the filename comes next. Put `f` last in the option group, since it takes the next argument.

## Mistakes to avoid

- **Extracting into the wrong place.** Run `tar -tzf` first to see whether the archive has a top-level folder or spills many files into the current directory.
- **Forgetting `-r` with zip.** Without it, a directory is added empty.
- **Only compressing what compresses.** Text, logs and JSON shrink a lot; JPEGs, videos and already-compressed archives barely shrink.
- **Trusting archives from strangers.** Look at the paths inside before extracting.

Compression trades CPU time for size, so it is useful for backups, log rotation and transfers over slow links. See [scp and rsync](/t/scp-rsync) for moving the result.
