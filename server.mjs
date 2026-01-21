import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import handler from './dist/server/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const CLIENT_DIR = join(__dirname, 'dist', 'client');

// MIME types for static files
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

function getMimeType(path) {
  const ext = extname(path);
  return mimeTypes[ext] || 'application/octet-stream';
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    // Serve static files from dist/client
    if (pathname.startsWith('/assets/') || pathname === '/favicon.ico') {
      const filePath = join(CLIENT_DIR, pathname);
      try {
        const file = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
        res.end(file);
        return;
      } catch (err) {
        // File not found, continue to handler
      }
    }

    // Convert Node.js request to Fetch API Request
    const body = req.method !== 'GET' && req.method !== 'HEAD' 
      ? await new Promise((resolve) => {
          let data = '';
          req.on('data', chunk => data += chunk);
          req.on('end', () => resolve(data));
        })
      : null;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      }
    }

    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers,
      body,
    });

    // Use TanStack Start handler
    const response = await handler.fetch(request);

    // Convert Fetch API Response to Node.js response
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    res.writeHead(response.status, responseHeaders);
    
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    
    res.end();
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  } else if (err.code === 'EPERM') {
    console.error(`Permission denied to bind to port ${PORT}. Try a different port or run with appropriate permissions.`);
    console.error(`You can set a different port with: PORT=3001 pnpm start`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
