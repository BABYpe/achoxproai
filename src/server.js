const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const compression = require('compression')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const compressionMiddleware = compression();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)

    // Force HTTPS redirection in production.
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
      const { host } = req.headers;
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
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
