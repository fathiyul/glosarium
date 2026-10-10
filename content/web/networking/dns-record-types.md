---
title: "DNS Record Types"
summary: "A, AAAA, CNAME, MX, TXT, NS and what each one does."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["dns records", "dns record types", "A record", "CNAME"]
prereqs: ["dns", "dns-ttl"]
related: ["certificate-authority", "dns-ttl", "load-balancer"]
---

**DNS records** are the entries in a zone that map a name to something: an address, another name, a mail server, a verification string. A handful of types cover nearly everything you'll ever configure:

- A / AAAA — the name's IPv4 / IPv6 address. The fundamental "this name lives here" record.
- CNAME — an alias: this name is *another name*, which is then resolved. `www` → `example.com`. (A **CNAME alias** can't coexist with other records on the same name, so it can't sit at the zone apex.)
- MX — where mail for the domain goes, with priorities.
- TXT — free-form text, used for verification and policy: SPF, DKIM selectors, domain-ownership proofs, ACME challenges.
- NS — which servers are authoritative for the zone (delegation).
- SOA — the zone's metadata: primary server, serial, refresh/retry timers.
- SRV — host and port for a specific service (`_https._tcp`).
- CAA — which certificate authorities may issue for the domain.
- PTR — reverse mapping, IP back to a name, used by mail servers and logging.

```text
example.com.      A      93.184.216.34
www.example.com.  CNAME  example.com.
example.com.      MX  10 mail.example.com.
example.com.      TXT    "v=spf1 …"
```

The classic mistakes:

- CNAME at the apex. The bare domain needs NS and SOA records, which can't coexist with a CNAME — so `example.com` itself can't be a CNAME. Providers offer alias/ANAME records that resolve this behind the scenes.
- Forgetting the trailing dot. In zone files, `mail.example.com` without a trailing dot is relative and becomes `mail.example.com.example.com`. A tiny typo with total effect.
- TXT quoting and length. Long TXT values (DKIM keys) must be split into quoted chunks; one unquoted string silently breaks verification.
- Wrong MX priority direction. Lower number means *higher* priority (tried first). Inverting it routes mail to the backup.
- No CAA record. Without one, any CA can issue for your domain; a CAA record restricts issuance and reduces mis-issuance risk.
- Ignoring TTL on changes. Records are cached for their TTL, so a migration planned without lowering TTLs first takes effect slowly (see [DNS TTL](/t/dns-ttl)).

**How to use them:** A/AAAA for addresses, CNAME for aliases, MX for mail, TXT for proofs and policy, CAA to constrain issuance. Small text entries, but nearly every outage involving "the site is down and nothing changed" starts here.
