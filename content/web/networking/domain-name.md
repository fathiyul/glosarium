---
title: "Domain Name"
summary: "A human-readable address like example.com."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["domain", "hostname", "DNS name", "FQDN"]
prereqs: ["url"]
related: ["dns", "dns-record-types", "url", "ip-address", "ssl-certificate"]
---

A domain name is a human-readable address on the internet, like `example.com`. People remember names far more easily than numbers, and the [DNS](/t/dns) system translates a name into the IP address a computer needs.

```
https://shop.example.com/products
        └─┬─┘ └───┬───┘ └┬┘
     subdomain  second-level  top-level domain (TLD)
                domain
```

Read right to left:

- **Top-level domain (TLD)**: `.com`, `.org`, `.id`, `.dev`, country codes like `.uk`.
- **Second-level domain**: the part you register: `example`.
- **Subdomain**: anything you add in front: `shop`, `api`, `www`.

A full name including all parts is a **fully qualified domain name (FQDN)**.

## Owning one

You register a domain through a registrar for a period (usually yearly), and then control its **DNS records**, which say where the name points ([DNS record types](/t/dns-record-types)). You can create as many subdomains as you like under a domain you own.

```
example.com        → A record → 93.184.216.34
api.example.com    → CNAME   → my-service.cloud-provider.com
```

## Things to know

- **A domain is not a website.** You still need a server, and DNS records pointing at it.
- **Changes take time to spread**, because of caching ([DNS TTL](/t/dns-ttl)).
- **HTTPS certificates are issued for specific names** (and wildcards), and expire ([SSL certificates](/t/ssl-certificate)).
- **Subdomains and the browser's security**: cookies and the same-origin policy treat different subdomains differently ([same-origin policy](/t/same-origin-policy)).
- **Domains expire.** Letting one lapse can lose your site and email, and let someone else take it over.
- **Names are case-insensitive**, and international names use an encoded form.
- **Look-alike domains** are used in phishing, so be careful with user-supplied URLs.

`localhost` is a special name for your own machine ([localhost](/t/localhost)).
