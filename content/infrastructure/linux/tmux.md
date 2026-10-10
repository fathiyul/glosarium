---
title: "tmux / screen"
summary: "Keeping terminal sessions running after you disconnect."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["tmux", "screen", "terminal multiplexer"]
prereqs: ["ssh", "basic-shell-commands"]
related: ["remote-debugging", "linux", "systemd"]
---

**tmux** (and its older sibling, **screen**) is a terminal multiplexer: it runs a shell inside a session that lives on the server, independent of your connection. You can split the terminal into windows and panes, detach, close your laptop, and reattach later with everything still running.

```sh
tmux new -s work        # start a session named "work"
# Ctrl-b then d         # detach; the session keeps running
tmux ls                 # list sessions
tmux attach -t work     # reattach
tmux kill-session -t work
```

Inside a session every command starts with the prefix `Ctrl-b`: `c` new window, `n`/`p` next/previous, `%` split vertically, `"` split horizontally.

The classic mistake is starting a long job over a plain [SSH](/t/ssh) connection:

```sh
ssh server
./migrate.py            # hours-long job
# laptop sleeps, connection drops, process gets SIGHUP and dies
```

Running it inside `tmux` first keeps the process alive and lets you check on it from any machine. The same trick protects you from flaky VPNs and accidentally closed terminals.

Two things to get right:

- **It doesn't survive a reboot.** The session lives on the remote machine; restart that machine and the session is gone. For services that must come back, use [systemd](/t/systemd), not tmux.
- **Don't leave sessions you've forgotten.** A lingering session with a root shell is a small security risk.

tmux is for interactive work and long-running one-off jobs. When something must always be up, that's a service manager's job; tmux is for you. It pairs well with [remote debugging](/t/remote-debugging) when you're poking at a live box.
