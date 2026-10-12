---
title: "Bits and Bytes"
summary: "The basic units of data, and KB vs KiB."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["bit", "byte", "KB vs KiB", "kilobyte"]
prereqs: ["binary-number"]
related: ["binary-number", "character-encoding", "integer", "utf-8", "latency-numbers"]
---

A bit is the smallest unit of data: a single 0 or 1. A byte is 8 bits, enough to hold 256 different values (0-255), or one ASCII character.

Everything a computer stores (numbers, text, images, programs) is ultimately bits.

| Unit | Size |
|---|---|
| bit | 1 binary digit |
| byte (B) | 8 bits |
| kilobyte (KB) | 1,000 bytes |
| megabyte (MB) | 1,000 KB |
| gigabyte (GB) | 1,000 MB |
| terabyte (TB) | 1,000 GB |

## KB vs KiB

Computers naturally work in powers of two, which caused a long-running confusion about "kilo".

| SI (decimal) | Binary |
|---|---|
| 1 KB = 1,000 B | 1 KiB = 1,024 B |
| 1 MB = 1,000,000 B | 1 MiB = 1,048,576 B |
| 1 GB = 10⁹ B | 1 GiB = 2³⁰ B |

Operating systems and tools mix them. Disk makers use decimal GB, so a "500 GB" drive shows up as about 465 GiB. When it matters (limits, billing, quotas), check which one is meant.

## Bits vs bytes in networking

Network speeds are usually in **bits** per second (Mbps), file sizes in **bytes**. A 100 Mbps connection moves at most about 12.5 megabytes a second.

## What fits in what

- **8 bits**: 0-255 (or -128 to 127 signed).
- **32 bits**: about 4.3 billion values.
- **64 bits**: about 1.8 × 10¹⁹ values.
- **Text**: ASCII is one byte per character. UTF-8 uses one to four ([UTF-8](/t/utf-8)).

## Why it matters

- **Integer limits and overflow** come from fixed bit widths ([integers](/t/integer), [integer overflow](/t/integer-overflow)).
- **Sizes of payloads, files and memory** ([back-of-the-envelope estimation](/t/back-of-envelope)).
- **Encodings and binary protocols** deal in bytes.

See [binary and hexadecimal](/t/binary-number) for reading values.
