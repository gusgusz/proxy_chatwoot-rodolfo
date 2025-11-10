const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const CHATWOOT_URL = process.env.CHATWOOT_URL || 'http://chatwoot:3000';

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'proxy-chatwoot' });
});

// Proxy all requests to Chatwoot
app.use('/', createProxyMiddleware({
  target: CHATWOOT_URL,
  changeOrigin: true,
  ws: true, // Enable WebSocket support
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Proxy error', message: err.message });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
  console.log(`Forwarding to: ${CHATWOOT_URL}`);
});
