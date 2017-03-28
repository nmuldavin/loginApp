import 'babel-polyfill';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
// import glob from 'glob';
// import path from 'path';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

// glob('../src/client/*.spec.js', (er, files) =>
//     files.forEach(require)
// );
// require all `.spec.js` anywhere in the client src code
const clientTestsContext = require.context('../src/client/', true, /\.spec\.js$/);

clientTestsContext.keys().forEach(clientTestsContext);

const sharedTestsContext = require.context('../src/shared/', true, /\.spec\.js$/);

sharedTestsContext.keys().forEach(sharedTestsContext);

// require all `src/client/**/*.js` except for top level files
if (REPORT_COVERAGE) {
  const componentsContext = require.context(
    '../src/client/',
    true,
    /^((?!main|hotReload|index|createStore|\.spec).)*\.js$/
  );

  componentsContext.keys().forEach(componentsContext);

  const sharedComponentsContext = require.context(
    '../src/shared/',
    true,
    /^((?!\.spec).)\.js$/
  );

  sharedComponentsContext.keys().forEach(sharedComponentsContext);
}
