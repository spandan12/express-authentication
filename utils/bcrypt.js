const bcrypt = require("bcrypt");
const config = require("../config");

function hash(value) {
  return bcrypt.hash(value, Number(config.saltRounds));
}

function compare(value, hashedValue) {
  return bcrypt.compare(value, hashedValue);
}

module.exports = {
  hash,
  compare,
};
