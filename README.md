# proxy_chatwoot-rodolfo

Proxy server for Chatwoot with Traefik reverse proxy support.

## 📋 Requirements

- Docker
- Docker Compose

## 🚀 Quick Start

1. Clone this repository:
```bash
git clone https://github.com/gusgusz/proxy_chatwoot-rodolfo.git
cd proxy_chatwoot-rodolfo
```

2. Update the `docker-compose.yml` file with your configuration:
   - Replace `your-email@example.com` with your email address (for Let's Encrypt)
   - Replace `your-domain.com` with your actual domain name

3. Start the services:
```bash
docker-compose up -d
```

4. Check the status:
```bash
docker-compose ps
```

## 📁 Project Structure

- `index.js` - Proxy server code (Node.js/Express)
- `package.json` - Node.js dependencies
- `Dockerfile` - Docker build instructions
- `docker-compose.yml` - Traefik and service orchestration

## ⚙️ Configuration

### Environment Variables

The proxy service supports the following environment variables:

- `PORT` - Port to run the proxy server (default: 3000)
- `CHATWOOT_URL` - URL of the Chatwoot instance (default: http://chatwoot:3000)

### Traefik Configuration

The Traefik service is configured with:
- Automatic SSL certificate generation via Let's Encrypt
- HTTP to HTTPS redirect
- Docker provider for automatic service discovery
- Dashboard available at `http://localhost:8080` (insecure mode for development)

## 🔧 Development

To run the proxy server locally for development:

```bash
npm install
npm run dev
```

## 📝 Notes

- Make sure to configure your domain's DNS to point to your server's IP address
- The Traefik dashboard is exposed on port 8080 (insecure mode - for production, disable this)
- SSL certificates are stored in `./letsencrypt` directory
- The proxy supports WebSocket connections for real-time features

## 🛠️ Troubleshooting

Check logs:
```bash
docker-compose logs -f proxy-chatwoot
docker-compose logs -f traefik
```

Restart services:
```bash
docker-compose restart
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.