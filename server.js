const http = require('http');

// Set the port and host for local development
const PORT = 5000;
const HOST = process.env.HOST || 'localhost';

const server = http.createServer((req, res) => {
    // Your server logic here (for example, serving a simple message)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running');
});

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } else if (err.code === 'ENOTSUP') {
        console.error('Operation not supported on this socket.');
    }
    process.exit(1); // Exit process on critical error
});
