const http = require('node:http');
const { createReadStream, existsSync } = require('node:fs');
const { extname, join, normalize } = require('node:path');

const root = join(__dirname, '..');
const port = Number(process.env.PORT || 8888);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://localhost:${port}`);
  const requestedPath = normalize(url.pathname === '/' ? '/index.html' : url.pathname);
  const filePath = join(root, requestedPath);

  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, { 'content-type': contentTypes[extname(filePath)] || 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`MineBuildCity running at http://localhost:${port}`);
});
