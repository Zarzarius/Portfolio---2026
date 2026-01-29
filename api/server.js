export default async function handler(req, res) {
  try {
    // Correctly import the default export from the built server
    const { default: server } = await import('../dist/server/server.js');
    
    const url = new URL(req.url, `http://${req.headers.host}`);
    const response = await server.fetch(new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
    }));

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = await response.arrayBuffer();
    res.end(Buffer.from(body));
  } catch (err) {
    console.error('SSR Bridge Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Internal Server Error: ${err.message}\n\nStack: ${err.stack}`);
  }
}
