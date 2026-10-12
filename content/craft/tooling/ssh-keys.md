---
title: "SSH Keys"
summary: "Key pairs for passwordless authentication to servers and Git hosts."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["SSH key pair", "ssh-keygen", "public key authentication"]
prereqs: ["ssh", "credential"]
related: ["ssh", "credential", "git-clone", "secrets-in-git"]
---

An SSH key is a pair of files used to prove who you are, without sending a password. You keep the private key secret and put the public key on the servers or services that should trust you, such as a Linux server or GitHub.

```sh
ssh-keygen -t ed25519 -C "ana@example.com"
# creates  ~/.ssh/id_ed25519       (private: never share)
#          ~/.ssh/id_ed25519.pub   (public: safe to share)

cat ~/.ssh/id_ed25519.pub          # paste this into GitHub, GitLab or the server's authorized_keys
ssh -T git@github.com              # test the connection
```

When you connect, the server sends a challenge that only the holder of the private key can answer. The private key never leaves your machine.

## Using them

- **Servers**: add your public key to `~/.ssh/authorized_keys` on the server, then `ssh user@host` logs you in ([SSH](/t/ssh)).
- **Git hosts**: add the public key in your account settings, then clone with SSH URLs (`git@github.com:acme/shop.git`) ([git clone](/t/git-clone)).

## Good practice

- **Protect the private key with a passphrase**, so a stolen file isn't enough. An agent (`ssh-agent`) remembers it for your session.
- **Never commit or share the private key**, or paste it into chat, tickets or CI logs ([secrets in Git](/t/secrets-in-git)). If it leaks, remove its public half from everywhere, and make a new pair.
- **Use a modern type**: Ed25519 is a good default (RSA with at least 3072 bits is the older alternative).
- **One key per device**, so you can revoke one without affecting others.
- **Right permissions**: `chmod 600 ~/.ssh/id_ed25519`. SSH refuses keys that other users can read.
- **Use a config file** (`~/.ssh/config`) to name hosts and choose which key goes where.
- **Remove old keys** from servers when people leave.

For automation, use separate, limited keys (deploy keys) rather than someone's personal key ([least privilege](/t/least-privilege)).
