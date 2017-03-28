const { Transform, Writable } = require('stream');

/**
 * Returns a new object mode transform stream that applies the provided function to incoming data
 * @param  {Function} fn transformation function
 * @return {TransformStream} ObjectMode transform stream
 */
const map = fn => new class extends Transform {
  constructor() {
    super({
      writableObjectMode: true,
      readableObjectMode: true,
    });
  }

  _transform(data, encoding, callback) {
    this.push(fn(data));
    callback();
  }
}();

/**
 * Sink stream to provide an endpoint for pipelines
 * Mainly useful for testing
 * @return {WritableStream} Object mode WritableStream
 */
/* eslint-disable class-methods-use-this */
const sink = () => new class extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  _write(data, encoding, callback) {
    callback();
  }
}();
/* eslint-enable */

/**
 * Sink stream to provide an endpoint for pipelines that also notes the most recent data it received
 * Mainly useful for testing
 * @return {WritableStream} Object mode WritableStream
 */
const statefullSink = () => new class extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  _write(data, encoding, callback) {
    this.state = data;
    callback();
  }
}();

/**
 * Transform stream that logs data then returns
 * Mainly useful for debugging
 * @return {TransformStream} Object mode TransformStream
 */
/* eslint-disable no-console */
const throughConsole = () => map((data) => {
  console.log(data);
  return data;
});
/* eslint-enable */

module.exports = {
  map,
  sink,
  statefullSink,
  throughConsole,
};
