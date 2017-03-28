const express = require('express');
const debug = require('debug')('app:server');
const webpack = require('webpack');
const webpackConfig = require('app/config/webpack.config');
const config = require('app/config/config.js');

const devRoutes = express.Router();
const compiler = webpack(webpackConfig);
const paths = config.utilsPaths;

debug('Enable webpack dev and HMR middleware');
devRoutes.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: paths.client(),
  hot: true,
  quiet: config.compilerQuiet,
  noInfo: config.compilerQuiet,
  lazy: false,
  stats: config.compilerStats,
}));
devRoutes.use(require('webpack-hot-middleware')(compiler));

// Serve static assets from ~/client/static since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into ~/dist
// when the application is compiled.
devRoutes.use(express.static(paths.client('static')));

module.exports = devRoutes;
