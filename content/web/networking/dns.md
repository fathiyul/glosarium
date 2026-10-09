---
title: "DNS"
summary: "The internet's phone book, turning names into IP addresses."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Domain Name System", "name resolution", "domain name system"]
prereqs: ["domain-name", "ip-address"]
related: ["dns-record-types", "dns-ttl", "domain-name", "ip-address", "localhost"]
core: [backend]
---

**DNS** (the Domain Name System) turns names people use (`example.com`) into the IP addresses
computers connect to (`93.184.216.34`). Think of it as the internet's phone book.

When your browser opens `example.com`:

1. It checks its own cache, then the operating system's.
2. It asks a **DNS resolver** (usually run by your ISP, company or a public provider).
3. If the resolver doesn't know, it asks the DNS servers in turn, from the root, to the
   servers for `.com`, to the servers responsible for `example.com`.
4. The answer comes back (and is cached for a while), and the browser connects to that IP.

## Seeing it for yourself

```sh
dig example.com            # or: nslookup example.com
dig example.com MX         # ask for a specific record type
```

## What a developer needs to know

- **Records.** A domain has several: `A` (name → IPv4), `AAAA` (IPv6), `CNAME` (alias to
  another name), `MX` (mail), `TXT` (verification, email settings). See
  [record types](/t/dns-record-types).
- **TTL.** Each answer is cached for a set time. After you change a record, old answers
  may live on until it expires ([DNS TTL](/t/dns-ttl)). This is why changes "take time to propagate".
- **Failures look like other things.** "Could not resolve host" or `ENOTFOUND` means the name
  didn't resolve. It's not necessarily a server down. DNS problems are a classic cause of
  mysterious outages.
- **`localhost` resolves locally**, without asking the internet ([localhost](/t/localhost)).

When a site "works for me but not for them", or works by IP but not by name, check DNS
first. DNS is easy to forget because it works until it doesn't.
