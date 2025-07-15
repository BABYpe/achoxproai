
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const compression = require('compression')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

// Initialize Next.js without explicit hostname and port for production compatibility.
const app = next({ dev })
const handle = app.getRequestHandler()

const compressionMiddleware = compression();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const host = req.headers.host;
    const proto = req.headers['x-forwarded-proto'];

    // Force HTTPS redirection in production.
    if (process.env.NODE_ENV === 'production' && proto === 'http') {
      res.writeHead(301, { Location: `https://${host}${req.url}` });
      res.end();
      return;
    }
    
    // Apply compression to all responses
    compressionMiddleware(req, res, () => {
      handle(req, res, parsedUrl)
    });

  }).listen(port, (err) => {
    if (err) throw err
    // In production, hostname will be determined by the environment.
    console.log(`> Ready on http://localhost:${port}`)
  })
})
