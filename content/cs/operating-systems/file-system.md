---
title: "File System"
summary: "How files and directories are stored and organized."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["filesystem", "ext4", "NTFS"]
prereqs: ["operating-system", "storage-devices"]
related: ["file-permissions", "inode", "symlink", "linux-directory-structure", "disks-mounts"]
---

A file system is how an operating system stores, names and organizes data on a storage device. It turns a pile of numbered blocks on a disk into the files and folders you know.

```
/
├── home/
│   └── ana/
│       └── notes.txt
└── etc/
    └── hosts
```

## What it does

- **Names and paths**: `/home/ana/notes.txt` identifies a file, in a tree of directories.
- **Tracks where the data is**: a file's contents may be scattered in blocks, and the file system remembers which.
- **Stores metadata**: size, timestamps, owner and [permissions](/t/file-permissions).
- **Allocates and frees space** as files grow, shrink and are deleted.
- **Keeps things consistent** after a crash, often with a journal of pending changes.

## Common file systems

| File system | Where |
|---|---|
| ext4, XFS, Btrfs | Linux |
| APFS | macOS |
| NTFS | Windows |
| FAT32, exFAT | USB sticks and memory cards (portable, simple) |
| tmpfs | a file system in RAM |
| Network file systems (NFS, SMB) | files on another machine |

Different file systems differ in maximum file size, case sensitivity, supported features and speed.

## Things developers run into

- **Case sensitivity**: Linux treats `File.txt` and `file.txt` as different. Windows and macOS (by default) don't, causing bugs that appear only after deployment.
- **Path separators**: `/` on Unix, `\` on Windows. Use your language's path functions.
- **Running out of space or inodes**: a disk can be "full" even with free bytes if it runs out of file entries ([inodes](/t/inode)).
- **Atomicity**: writing a file isn't atomic. A crash mid-write leaves it half-written. Write to a temp file and rename.
- **Slow with millions of files** in one folder, in some file systems.
- **Containers and volumes** mount file systems into places ([Docker volumes](/t/docker-volume)).
- **Object storage** (like S3) is not a file system, although it looks similar ([object storage](/t/object-storage)).

See [Linux directory structure](/t/linux-directory-structure) for where things live.
