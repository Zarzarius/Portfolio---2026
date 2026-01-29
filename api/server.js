import { server } from '../dist/server/server.js';

export default async function handler(req, res) {
  // Simple bridge for SSR
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

  const body = await response.text();
  res.end(body);
}
