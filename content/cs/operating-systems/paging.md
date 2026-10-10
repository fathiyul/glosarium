---
title: "Paging and Swap"
summary: "Moving memory pages to disk when RAM is full."
levels: { backend: senior, data-engineer: senior }
aliases: ["paging", "swap", "page fault"]
prereqs: ["virtual-memory", "ram"]
related: ["mmap", "out-of-memory", "cache-locality", "disk-usage"]
---

**Paging** is how [virtual memory](/t/virtual-memory) is managed in fixed-size chunks. Memory is divided into pages (virtual) and frames (physical), typically a few kilobytes each. The kernel maps pages to frames as needed, so a program's address space doesn't have to fit in RAM all at once.

When a program accesses a page that isn't currently in physical memory, a **page fault** occurs: the CPU traps to the kernel, which loads the page in — from the executable, a mapped file, or **swap** — and resumes the program. The first access to any page, and every access to a page that was moved out, costs a fault.

Swap is disk space used as overflow for RAM. When memory is tight, the kernel moves out pages that haven't been used recently, freeing frames for active work. Accessing a swapped-out page later means reading it back from disk.

```text
page not in RAM → page fault → kernel loads it (from file or swap) → resume
memory tight → evict cold pages to swap → they fault back if touched again
```

The classic mistakes:

- Treating swap as free extra RAM. Swap is *orders of magnitude* slower than [RAM](/t/ram) (see the [latency ladder](/t/latency-numbers)). Once a working set spills to disk, performance collapses — this is **thrashing**, where the machine spends its time moving pages instead of working.
- Relying on swap to survive memory pressure. It buys time for cold pages, but a genuinely over-sized working set will thrash or eventually hit the [OOM killer](/t/out-of-memory). It's not a solution.
- Confusing a page fault with an error. A *minor* fault (page simply needs mapping) is normal and cheap; a *major* fault (must read from disk) is expensive. High major-fault counts mean trouble.
- Ignoring page-fault metrics. They're one of the most direct signals of memory pressure, yet often unwatched compared to CPU.
- Assuming no swap means no problem. With no swap, pressure goes straight to killing processes instead of slowing down. That's a deliberate, sometimes-correct choice for predictable latency, but understand the trade.

Paging is the mechanism that makes virtual memory practical: it separates what a program *addresses* from what's *resident*. Its cost is the fault — cheap when it's just a mapping, expensive when it reaches the disk — and that's why memory-resident working sets matter so much for performance.
