---
title: "Fuzzing"
summary: "Feeding random inputs to find crashes and vulnerabilities."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["fuzzing", "fuzz testing", "fuzzer"]
prereqs: ["unit-test", "property-based-testing"]
related: ["cve", "buffer-overflow", "regression-test", "testing-trophy"]
---

**Fuzzing** feeds a program huge numbers of random or mutated inputs to see what breaks. Instead of writing examples you thought of, a fuzzer generates inputs you didn't — malformed data, extreme lengths, edge encodings — and watches for crashes, hangs and assertion failures. It's especially effective at finding memory-safety bugs and parser vulnerabilities.

The powerful modern form is **coverage-guided** fuzzing: the fuzzer instruments the program to see which code paths each input reaches, and uses that feedback to generate inputs that explore *new* paths. It keeps a **corpus** of interesting inputs and mutates them, getting steadily deeper into the code.

```text
corpus of inputs → mutate → run → did it reach new code? → keep & mutate again
                                 → did it crash? → report
```

The classic mistakes:

- No oracle beyond crashes. A fuzzer's default signal is "the program crashed". That catches memory bugs and panics but not wrong answers. Adding assertions ("the parse must round-trip") turns it into a stronger test — which blurs into [property-based testing](/t/property-based-testing).
- Not providing a seed corpus. Starting from real, valid inputs reaches interesting code far faster than pure randomness, which mostly fails at the first byte.
- Ignoring sanitizers. Fuzzing is most valuable paired with run-time checkers (address/undefined-behaviour sanitizers) that turn silent corruption into a loud report. Without them, many memory bugs don't crash and go unseen.
- Non-determinism. A fuzzer that hits time, randomness or network will report unreproducible issues. Make the input path deterministic so a finding can be replayed.
- Treating it as a one-off. Fuzzing pays off continuously: run it in CI on the parser, keep the corpus, and re-run as code changes.

**When it shines:** any code that consumes untrusted or complex input — parsers, decoders, serializers, file-format readers, network framers, cryptography. That's exactly where a crafted input can become a [CVE](/t/cve) or a [buffer overflow](/t/buffer-overflow). It complements [unit tests](/t/unit-test): those check what you thought of; fuzzing finds what you didn't.
