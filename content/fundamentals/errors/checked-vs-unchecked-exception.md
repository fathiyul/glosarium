---
title: "Checked vs Unchecked Exceptions"
summary: "Whether the compiler forces you to handle an exception."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["checked exception", "unchecked exception"]
prereqs: ["error-handling"]
related: ["result-type", "defensive-programming", "error-boundary"]
---

Java divides exceptions into two groups. A checked exception must either be caught or declared in the method signature with `throws`, and the compiler enforces that. An unchecked exception, which descends from `RuntimeException`, doesn't have to be declared or caught.

```java
// Checked: the caller must handle IOException or declare it
public String readConfig(String path) throws IOException {
    return Files.readString(Path.of(path));
}

// Unchecked: no declaration needed, and nothing forces the caller to catch it
public int parseLimit(String s) {
    if (s.isEmpty()) throw new IllegalArgumentException("empty limit");
    return Integer.parseInt(s);
}
```

Python has no checked exceptions. Every exception can be raised and caught freely, and the signature doesn't say what it might raise. Other languages, such as C# and Kotlin, also treat exceptions as unchecked.

The trade-off is forced handling against noise. Checked exceptions make failure paths visible, so a reader sees that `readConfig` can fail. But they spread through the code, and developers often respond by catching and ignoring them, or wrapping them in an unchecked exception, which defeats the purpose. Unchecked exceptions keep signatures short, but callers may not know what to expect.

The classic mistake is an empty `catch` block, written to satisfy the compiler. The error disappears, and the program carries on in an unknown state. Handle the exception where you can do something useful, and otherwise let it propagate. [Result types](/t/result-type) make the failure explicit in the return value, without exceptions at all.
