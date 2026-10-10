---
title: "Hard Link vs Symbolic Link"
summary: "Two names for the same file vs a pointer to a path."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["hardlink", "symlink", "soft link"]
prereqs: ["inode", "file-system"]
related: ["symlink", "disk-usage", "linux-directory-structure", "file-permissions"]
---

On Unix a filename is a directory entry pointing to an [inode](/t/inode) — the record that holds a file's metadata and where its data lives. "Link" here means attaching a name to an inode.

A **hard link** is another name for the same inode. Both names are equal; there is no "original". `ln report.txt report-copy.txt` gives you two names for one file, and the data is freed only when the last link is removed (the inode's link count reaches zero). Hard links can't cross filesystems, and normally you can't make one for a directory.

```sh
ln report.txt hard.txt      # hard link: same file, same data
ln -s report.txt soft.txt   # symbolic link: a file containing the path "report.txt"
ls -li                      # inode numbers and link counts
```

A **symbolic (soft) link** is a small file whose contents are a path. It can point across filesystems, to directories, or at something that doesn't exist (a "dangling" link). Editing through a symlink edits the target, but removing the link (`rm soft.txt`) leaves the target alone.

The classic mistakes are in copying and deleting. `cp` follows a symlink and copies the *target's* contents; `cp -a` preserves the link as a link. And a symlink to a directory can surprise recursive commands, so be careful how you delete or traverse it.

Use hard links for cheap duplicates on the same disk — backup and dedup tools work this way. Use symlinks for stable paths, such as a `current` link pointing at `releases/v2`, and for configuration that should be swapped without moving files. See the [directory structure](/t/linux-directory-structure) and [file permissions](/t/file-permissions).
