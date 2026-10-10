---
title: "FTP and SFTP"
summary: "Older file transfer protocols, and the SSH-based secure version."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["ftp", "sftp", "file transfer protocol"]
prereqs: ["tcp", "tls"]
related: ["firewall", "presigned-url", "object-storage"]
---

**FTP** (File Transfer Protocol) is one of the oldest ways to move files: a client connects to a server, authenticates, and uploads or downloads. It has two famous problems: credentials and data travel in **plaintext**, and it opens *separate* data connections on dynamic ports, which makes it painful through firewalls and NAT.

**SFTP** (SSH File Transfer Protocol) shares only the name's initial. It runs file transfer *over SSH*: one encrypted connection, one port, authenticated and private. Despite the confusing name, SFTP is not "FTP with TLS" — that's FTPS, a different and rarer beast.

```text
FTP:   plaintext control + dynamic data ports   → avoid
SFTP:  file transfer inside an SSH session      → encrypted, one port
```

In practice: never use FTP for anything that matters. SFTP is the acceptable legacy option (partners, banks, appliances that only speak file transfer). For your own systems, prefer HTTPS uploads/downloads or object storage with signed URLs.

The classic mistakes:

- Using FTP at all in 2026. Credentials and files in cleartext, visible to anyone on the path. There is no justification on an untrusted network.
- Confusing SFTP with FTPS. They are different protocols with different ports, clients and firewall behaviour. Saying "secure FTP" without specifying which causes integration confusion.
- Opening FTP's data-port range through the firewall. The "fix" for FTP behind a firewall is punching wide holes — exactly what the firewall is there to prevent. Another reason to use SFTP's single port.
- Storing credentials for automated FTP. Scripts with embedded FTP passwords are a leak waiting to happen; SFTP at least supports key-based auth, but prefer short-lived credentials generally.
- Building new flows on file transfer. Polling a directory for files is a fragile integration pattern. An API, a webhook, or managed file delivery usually serves better.
- No integrity checking. Either protocol moves bytes; neither proves the file is complete and untampered. Verify checksums on receipt for anything important.

**The short version:** FTP is a legacy plaintext protocol to avoid; SFTP is file transfer over SSH and acceptable where file-based exchange is unavoidable; for new work, HTTPS and object storage are usually the better answer.
