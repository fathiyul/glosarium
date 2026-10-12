---
title: "Binary and Hexadecimal"
summary: "Base-2 and base-16 number systems."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["binary", "hexadecimal", "hex", "base 2", "base 16"]
prereqs: ["integer"]
related: ["bits-and-bytes", "bitwise-operation", "integer", "ascii", "utf-8"]
---

Everyday numbers use base 10: ten digits (0-9), where each place is worth ten times the one to its right. Computers use **binary** (base 2), with just 0 and 1, because that matches on and off in hardware. **Hexadecimal** (base 16) is a compact way to write binary.

## Binary

Each place is a power of two: 1, 2, 4, 8, 16...

```
1011 in binary = 1×8 + 0×4 + 1×2 + 1×1 = 11
```

```python
bin(11)            # '0b1011'
int("1011", 2)     # 11
0b1011             # 11 written as a literal
```

| Decimal | Binary |
|---|---|
| 0 | 0 |
| 1 | 1 |
| 2 | 10 |
| 5 | 101 |
| 8 | 1000 |
| 255 | 11111111 |

## Hexadecimal

Uses 0-9 and A-F (A=10 ... F=15). **One hex digit is exactly four bits**, so a byte is two hex digits.

```
11111111 (binary) = FF (hex) = 255 (decimal)
0xFF               # hex literal in many languages
```

```python
hex(255)           # '0xff'
int("ff", 16)      # 255
```

## Where you meet them

- **Colors**: `#ff8800` is three bytes: red 255, green 136, blue 0.
- **Memory addresses and hashes**: written in hex (`3f9c2a1`).
- **Permissions**: file modes like `755` (octal, base 8).
- **Bit flags and masks** ([bitwise operations](/t/bitwise-operation)).
- **Debugging bytes**: hex dumps show raw data ([bits and bytes](/t/bits-and-bytes), [ASCII](/t/ascii)).
- **IPv6 addresses and MAC addresses.**

## Handy facts

- n bits can represent 2ⁿ values: 8 bits give 256 (0-255).
- Powers of two (1, 2, 4, 8, 16, 32, 64, 128, 256, 1024) are worth memorizing.
- A prefix such as `0x` (hex) or `0b` (binary) says which base a literal is in.
