/* eslint-disable import/no-dynamic-require, global-require */
const glob = require('glob');
const path = require('path');

/**
 * grabs all server files, only for code coverage reporting
 */
glob('src/server/**/!(server|devRoutes).js', (er, files) => {
  files.forEach(file => require(path.resolve(file)));
});

glob('src/shared/**/*.js', (er, files) => {
  files.forEach(file => require(path.resolve(file)));
});
/* eslint-enable */
