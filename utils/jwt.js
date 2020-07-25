const jwbt = require("jsonwebtoken");
const config = require("../config");

function generateAccessToken(data) {
  return jwbt.sign({ data }, config.accessTokenSecretKey, {
    expiresIn: config.accessTokenDuration,
  });
}

function generateRefreshToken(data) {
  return jwbt.sign({ data }, config.refreshTokenSecretKey, {
    expiresIn: config.refreshTokenDuration,
  });
}

function verifyAccessToken(token) {
  return jwbt.verify(token, config.accessTokenSecretKey);
}

function verifyRefreshToken(token) {
  return jwbt.verify(token, config.refreshTokenSecretKey);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
