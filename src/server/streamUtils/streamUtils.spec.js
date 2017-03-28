const { expect } = require('chai');
const { Transform } = require('stream');
const sut = require('./streamUtils');

describe('(Library) Stream Utilities', () => {
  describe('(Function) map', () => {
    it('Should return a TransformStream', () => {
      const mapped = sut.map(() => null);
      expect(mapped instanceof Transform).to.be.true;
    });

    /* eslint-disable no-underscore-dangle */
    it('Should be an object mode to object mode transform', () => {
      const mapped = sut.map(() => null);
      expect(mapped._readableState.objectMode).to.be.true;
      expect(mapped._writableState.objectMode).to.be.true;
    });
    /* eslint-enable */

    it('Should emit the result of the provided function applied to input', () => {
      const plusOne = sut.map(num => num + 1);
      const plusOneSink = sut.statefullSink();

      plusOne.pipe(plusOneSink);

      plusOne.write(30);
      expect(plusOneSink.state).to.eql(31);

      const plusTaco = sut.map(string => `${string}taco`);
      const plusTacoSink = sut.statefullSink();

      plusTaco.pipe(plusTacoSink);

      plusTaco.write('carnitas ');

      expect(plusTacoSink.state).to.eql('carnitas taco');
    });
  });
});
