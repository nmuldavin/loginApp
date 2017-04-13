const { expect } = require('chai');
const auth = require('./auth');

describe('(Library) Auth', () => {
  describe('(Function) generateSalt', () => {
    const s1 = auth.generateSalt();
    const s2 = auth.generateSalt();
    const s3 = auth.generateSalt();

    it('Should generate strings of the same length', () => {
      expect(s1).to.be.a('string');
      expect(s1.length).to.be.above(1);
      expect(s1.length).to.eql(s2.length);
      expect(s2.length).to.eql(s3.length);
    });

    it('Should (almost) never generate the same string', () => {
      expect(s1).to.not.eql(s2);
      expect(s2).to.not.eql(s3);
      expect(s1).to.not.eql(s3);
    });
  });

  describe('(Function) hashPass', () => {
    const salt = auth.generateSalt();
    it('Should generate a string that does not equal original password', () => auth.hashPass('password', salt)
      .then((hashedPass) => {
        expect(hashedPass).to.be.a('string');
        expect(hashedPass).to.not.eql('password');
      })
    );
  });
});
