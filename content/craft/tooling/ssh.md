---
title: "SSH"
summary: "Securely logging into and running commands on remote machines."
levels: { backend: junior, frontend: mid-level, data-engineer: junior }
aliases: ["Secure Shell", "ssh client", "remote login"]
prereqs: ["terminal", "shell"]
related: ["ssh-keys", "port", "firewall", "dev-containers"]
core: [backend, data-engineer]
---

**SSH** (Secure Shell) lets you log in to another machine, and run commands there, over an
encrypted connection. It's how you reach most servers.

```sh
ssh deploy@203.0.113.10          # log in as user "deploy"
ssh deploy@server.example.com
ssh -p 2222 deploy@server        # server uses a non-default port (default is 22)
ssh deploy@server "df -h"        # run one command, then disconnect
```

After connecting, your terminal acts as if you were sitting at that machine. Type `exit` to leave.

## Authentication

- **Password**: simple but weaker, and often disabled on servers.
- **Key pair** (the normal way): you have a **private key** (stays on your machine, never share)
  and a **public key** (put on the server). The server verifies you hold the private key
  without it ever being sent. See [SSH keys](/t/ssh-keys).

## First connection

The first time, SSH shows the server's **fingerprint** and asks whether to trust it. The answer is
saved in `~/.ssh/known_hosts`. If it later changes unexpectedly, SSH warns loudly: that can mean the
server was rebuilt, or that someone is intercepting the connection. Don't just delete the line;
find out which.

## Handy things

```sh
scp report.csv deploy@server:/tmp/        # copy a file to the server
scp deploy@server:/var/log/app.log .      # ...and from it
ssh -L 5432:localhost:5432 deploy@server  # forward local port 5432 to the server's database
```

A `~/.ssh/config` file lets you give hosts short names and set the user and key:

```
Host prod
  HostName 203.0.113.10
  User deploy
```

Then `ssh prod` is enough. Git over SSH uses the same keys. Be careful on production machines:
you're running real commands on a live system.
