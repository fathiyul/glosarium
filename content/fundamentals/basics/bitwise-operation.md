---
title: "Bitwise Operation"
summary: "Operating on individual bits: AND, OR, XOR and shifts."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["bit manipulation", "bitwise operators"]
prereqs: ["binary-number"]
related: ["integer-overflow", "data-type", "character-encoding"]
---

A bitwise operation works on the individual bits of an integer. The operators are AND (`&`), OR (`|`), XOR (`^`), NOT (`~`), and the shifts `<<` and `>>`. They're fast, and they're useful for flags, masks, and packing several small values into one number.

Here are the basic operations on two 4-bit values, shown in binary:

```
  1100  (12)        1100  (12)        1100  (12)
& 1010  (10)      | 1010  (10)      ^ 1010  (10)
= 1000   (8)      = 1110  (14)      = 0110   (6)
```

AND keeps a bit only where both inputs have it. OR keeps it where either does. XOR keeps it where exactly one does. Shifts move bits left or right, so `1 << 3` is 8, and `8 >> 2` is 2.

A common use is flags, where each bit means something on its own:

```python
READ, WRITE, EXEC = 1, 2, 4          # 001, 010, 100
perms = READ | WRITE                 # 011 = 3
has_write = (perms & WRITE) != 0     # True
perms = perms & ~WRITE               # clear WRITE -> 1
```

The classic mistake is forgetting that bit operations work on fixed-width integers, so a result can overflow silently. Shifting a value past its width, or mixing signed and unsigned values, gives results you didn't expect. [Integer overflow](/t/integer-overflow) covers that. Also check operator precedence: in several languages `&` binds more loosely than `==`, so `flags & MASK == 0` may not mean what it looks like. Add parentheses.
