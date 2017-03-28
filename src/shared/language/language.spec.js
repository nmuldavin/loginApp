const { expect } = require('chai');
const l = require('./language');

describe('(Library) Language Utilities', () => {
  const obj = {
    a: 'taco',
    b: 'burrito',
  };

  describe('(Function) mapEntries', () => {
    const map = (key, val) => [key.toUpperCase(), `${val}stan`];

    const mappedObj = {
      A: 'tacostan',
      B: 'burritostan',
    };

    it('Should map both key and values through a provided function', () => {
      expect(l.mapEntries(obj, map)).to.eql(mappedObj);
    });
  });

  describe('(Function) mapKeys', () => {
    const map = key => `MEGA${key}`;

    const mappedObj = {
      MEGAa: 'taco',
      MEGAb: 'burrito',
    };

    it('Should map both keys through a provided function', () => {
      expect(l.mapKeys(obj, map)).to.eql(mappedObj);
    });
  });

  describe('(Function) mapValues', () => {
    const map = value => `super${value}`;

    const mappedObj = {
      a: 'supertaco',
      b: 'superburrito',
    };

    it('Should map values through a provided function', () => {
      expect(l.mapValues(obj, map)).to.eql(mappedObj);
    });
  });
});
