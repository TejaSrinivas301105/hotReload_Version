const http = require('http');
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from test server - Version 910.0\n');
});

server.listen(PORT, () => {
    console.log(`[test-api] Server running at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('[test-api] Shutting down gracefully...');
    server.close(() => {
        console.log('[test-api] Server closed');
        process.exit(0);
    });
});