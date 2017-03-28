/* eslint global-require: 0 */
const express = require('express');
const compress = require('compression');
const config = require('app/config/config.js');
const api = require('./api/api');

const server = express();
const paths = config.utilsPaths;

server.use(api);

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
server.use(require('connect-history-api-fallback')());

// serverly gzip compression
server.use(compress());

// ------------------------------------
// serverly Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  server.use(require('./devRoutes'));
} else {
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the server server, but this helps to demo the
  // server in production.
  server.use(express.static(paths.dist()));
}

const debug = require('debug')('server:bin:server');

const port = config.serverPort;

server.listen(port);
debug(`Server is now running at http://localhost:${port}.`);
