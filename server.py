import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    pass

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        webbrowser.open(f"http://localhost:{PORT}")
        httpd.serve_forever()
except OSError as e:
    print(f"Port {PORT} is occupied. Trying 8080...")
    with socketserver.TCPServer(("", 8080), Handler) as httpd:
        print(f"Serving at http://localhost:8080")
        webbrowser.open(f"http://localhost:8080")
        httpd.serve_forever()
