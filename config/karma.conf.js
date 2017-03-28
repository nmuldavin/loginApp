const argv = require('yargs').argv;
const config = require('./config');
const webpackConfig = require('./webpack.config');
const debug = require('debug')('app:karma');

debug('Creating configuration.');
const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    {
      pattern: `./${config.devScriptsDir}/clientTestBundler.js`,
      watched: false,
      served: true,
      included: true,
    },
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  client: {
    captureConsole: true,
  },
  preprocessors: {
    [`${config.devScriptsDir}/clientTestBundler.js`]: ['webpack'],
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-module-source-map',
    resolve: Object.assign({}, webpackConfig.resolve, {
      alias: Object.assign({}, webpackConfig.resolve.alias, {
        sinon: 'sinon/pkg/sinon.js',
      }),
    }),
    plugins: webpackConfig.plugins,
    performance: { hints: false },
    module: {
      noParse: [
        /\/sinon\.js/,
      ],
      rules: webpackConfig.module.rules.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          use: 'imports-loader?define=>false,require=>false',
        },
      ]),
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: Object.assign({}, webpackConfig.externals, {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
    }),
  },
  webpackMiddleware: {
    noInfo: true,
  },
  coverageReporter: {
    reporters: config.coverageReporters,
  },
  customLaunchers: {
    PhantomJS_custom: {
      base: 'PhantomJS',
      debug: true,
    },
  },
};

if (config.globals.REPORT_COVERAGE) {
  karmaConfig.reporters.push('coverage');
  karmaConfig.webpack.module.rules.push({
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    include: new RegExp(`${config.clientDir}|${config.sharedDir}`),
    exclude: /(node_modules|\.spec\.js$)/,
    loader: 'babel-loader',
    options: Object.assign({}, config.babelConfig, {
      plugins: (config.babelConfig.plugins || []).concat('istanbul'),
    }),
  });
}

module.exports = cfg => cfg.set(karmaConfig);
