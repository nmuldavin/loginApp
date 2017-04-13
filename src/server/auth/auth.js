const crypto = require('crypto');

/**
 * Security Options
 * @NOTE Changing anything here will invalidate existing user passwords
 */
const saltLength = 32;
const iterations = 10000;
const keyLength = 256;
const digestFunction = 'sha256';

const generateSalt = () => crypto.randomBytes(saltLength).toString('hex');

const hashPass = (password, salt) => new Promise((resolve, reject) => {
  crypto.pbkdf2(password, salt, iterations, keyLength, digestFunction, (err, key) => {
    if (err) {
      reject(err);
    }

    resolve(key.toString('hex'));
  });
});

module.exports = {
  generateSalt,
  hashPass,
};
