---
title: "HTTPS"
summary: "HTTP encrypted with TLS."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["HTTP over TLS", "HTTP Secure", "SSL", "TLS"]
prereqs: ["http"]
related: ["hsts", "http", "tcp-handshake", "cors", "same-origin-policy"]
core: [backend, frontend]
---

**HTTPS** is HTTP sent over an encrypted connection (TLS). The `s` is for secure. It
gives you three things:

- **Privacy**: people on the network (café Wi-Fi, an ISP) can't read what's sent.
- **Integrity**: the data can't be silently altered in transit.
- **Authentication**: you're talking to the real server for that domain, proven by a
  **certificate** issued by a trusted authority.

Without it, anyone between you and the server could read passwords and cookies or inject content.
Browsers mark plain HTTP sites as "Not secure", and many features (service workers, geolocation,
the clipboard API) are only available over HTTPS.

## How it works, briefly

1. The browser connects and starts a TLS handshake.
2. The server presents its certificate. The browser checks it's valid, not expired, and made for
   this domain, signed by a trusted authority.
3. Both sides agree on keys, and the rest of the traffic is encrypted.

## What developers do

- **Get a certificate** for your domain. Free ones are available (such as from Let's Encrypt),
  and many hosts and cloud load balancers manage it automatically.
- **Redirect HTTP to HTTPS** and consider [HSTS](/t/hsts) so browsers always use HTTPS.
- **Avoid mixed content**: an HTTPS page loading scripts or images over `http://` gets blocked or
  warned.
- **Renew certificates** before they expire. An expired certificate takes a site down.
- Locally, `http://localhost` is treated as a secure context by browsers, so you rarely need
  local certificates for basic development.

## What it doesn't do

HTTPS protects data **in transit**, not the site itself. A padlock doesn't mean a site is
trustworthy; phishing sites have certificates too. Network observers can still see which server you
connect to, even though they can't see the page or data. And it doesn't protect data once it
reaches your server, so you still need secure code and storage.
