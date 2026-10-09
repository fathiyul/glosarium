---
title: "File Permissions"
summary: "Read, write and execute rights for user, group and others."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["chmod", "Unix permissions", "rwx", "file mode"]
prereqs: ["basic-shell-commands"]
related: ["users-groups", "sudo-root", "ssh-keys", "least-privilege", "linux-directory-structure"]
---

On Linux and macOS, every file has permissions saying who can read it, write it and execute it. They're set separately for three classes: the owner (user), the owner's group, and everyone else (others).

```sh
ls -l
# -rwxr-xr-- 1 ana devs 1204 Oct 10 09:00 deploy.sh
#  │└┬┘└┬┘└┬┘
#  │ │  │  └─ others: r--  (read only)
#  │ │  └──── group:  r-x  (read and execute)
#  │ └─────── owner:  rwx  (read, write, execute)
#  └───────── file type: - is a regular file, d is a directory
```

| Letter | On a file | On a directory |
|---|---|---|
| `r` | read the contents | list the files in it |
| `w` | change the contents | create and delete files in it |
| `x` | run it as a program | enter it (`cd`) |

## Changing them

```sh
chmod +x script.sh            # make it executable
chmod u+w,g-w file            # owner can write, group can't
chmod 644 notes.txt           # numeric form
chmod 755 deploy.sh
chown ana:devs file           # change owner and group (usually needs sudo)
```

The numbers add up per class: read = 4, write = 2, execute = 1.

| Mode | Meaning |
|---|---|
| `644` | owner read/write, everyone else read |
| `755` | owner all, others read/execute (scripts, directories) |
| `600` | owner read/write only (private files) |
| `700` | owner only (private directories) |

## Common problems

- **"Permission denied"** when running a script: it needs `x` (`chmod +x`), or you aren't the right user.
- **SSH keys** must be private (`chmod 600 ~/.ssh/id_ed25519`), or SSH refuses them ([SSH keys](/t/ssh-keys)).
- **A web server can't read your files**: its user lacks read permission or directory `x`.
- **`chmod 777` "fixes" everything** by letting everybody do anything. It's insecure. Find the right owner and mode instead ([least privilege](/t/least-privilege)).
- **Don't run things as root** to get around permissions ([sudo and root](/t/sudo-root)).
- Containers and mounted volumes can map users differently, causing mismatches.
