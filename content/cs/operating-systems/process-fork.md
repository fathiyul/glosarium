---
title: "fork and exec"
summary: "How Unix creates new processes by copying, then replacing, the current one."
levels: { backend: senior, data-engineer: senior }
aliases: ["fork and exec", "fork exec", "process creation"]
prereqs: ["process", "system-call"]
related: ["process-lifecycle", "virtual-memory", "daemon", "scheduler"]
---

Unix creates new processes with a two-step dance: **`fork`** copies the current process, and **`exec`** replaces that copy's program with a new one. The combination is how a shell runs a command, how a server spawns workers, and how `system()` works underneath.

- `fork` creates a near-identical child: same memory contents, same open [file descriptors](/t/file-descriptor), continuing from the same point. `fork` returns twice — `0` in the child, the child's PID in the parent — which is how a program tells which side it's on.
- `exec` (e.g. `execve`) then loads a new program into the current process, replacing its code and data but keeping its PID and file descriptors.

```c
pid_t pid = fork();
if (pid == 0) {          // child
    execvp("ls", args);  // replace child with "ls"
} else {                 // parent
    waitpid(pid, ...);   // wait for the child
}
```

The clever part is that `fork` uses **copy-on-write**: it doesn't literally copy all memory, just page-table entries, and only duplicates a page when one side writes to it. That makes `fork` cheap enough to use routinely, even for large processes.

The classic mistakes:

- Forgetting the child must `exec` or `exit`. A forked child that neither execs nor exits continues running the parent's code — often executing the wrong logic or looping.
- Not reaping children. A parent that doesn't `wait` leaves terminated children as [zombies](/t/process-lifecycle), slowly filling the process table.
- Assuming file descriptors are independent. All open descriptors are inherited by the child. A child holding a socket open keeps it alive even after the parent closes it — a classic cause of "why is this connection still here?".
- A fork bomb. A program that forks without bound (often by accident) can exhaust the process table and take down the machine. Process limits ([ulimit](/t/ulimit)) are the guardrail.
- Preferring `fork` for threads. Threads are usually created differently (a dedicated call); `fork` in a multithreaded process is subtle, because only the calling thread survives in the child.

`fork` + `exec` is the Unix way of starting programs, and it explains a lot about process behaviour: inherited descriptors, the child/parent split, and why a shell can launch a command so cheaply. It's the concrete mechanism behind the [process lifecycle](/t/process-lifecycle).
