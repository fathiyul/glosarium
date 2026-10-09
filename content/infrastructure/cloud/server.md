---
title: "Server"
summary: "A machine, or a program on one, that provides a service to clients."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["web server", "server machine", "backend server"]
prereqs: ["operating-system"]
related: ["compute-instance", "virtual-machine", "http-request", "localhost", "port", "cloud-computing"]
---

"Server" is used for two related things:

1. **A machine** (physical or [virtual](/t/virtual-machine)) that is always on and waiting to serve requests.
2. **A program** running on it that listens on a [port](/t/port) and answers requests from clients: a web server, a database server, a mail server.

A client is anything that sends the request: a browser, a mobile app, another service. The same machine can run many server programs at once, each on its own port.

```python
# A tiny server program: listens on port 8000 and answers every request
from http.server import BaseHTTPRequestHandler, HTTPServer

class Hello(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"hello")

HTTPServer(("0.0.0.0", 8000), Hello).serve_forever()
```

Visit `http://localhost:8000` and you are the client. See [localhost](/t/localhost).

## Why it matters

Your code usually runs as a server: it starts, waits for [requests](/t/http-request), and keeps going. That changes how you think about it. It must handle many clients at once, survive bad input, and restart cleanly.

## Common confusions

- **"Server" is relative.** Your API is a server to the browser and a client to the database.
- **Listening address.** `127.0.0.1` accepts only local connections; `0.0.0.0` accepts connections on all of the machine's addresses, which may expose it to the network.
- A server isn't special hardware. Your laptop can be a server. What differs in production is reliability: monitoring, backups, and redundancy.
- One server is a single point of failure. Real services run several and put a load balancer in front.
