const crypto = require('crypto');
const db = require('../db');

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

const checkPassword = (password, user, callback) => hashPass(password, user.salt)
  .then((hashedPass) => {
    if (hashedPass === user.hashedPass) {
      return callback(null, user);
    }

    return callback(null, false);
  });

const verify = (username, password, callback) => {
  db.get(username)
    .then((user) => {
      if (!user) {
        return callback(null, false);
      }

      return checkPassword(password, user, callback);
    })
    .catch(err => callback(err));
};

module.exports = {
  generateSalt,
  hashPass,
  verify,
};
