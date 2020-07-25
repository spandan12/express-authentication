require("dotenv").config();

const config = {
  accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
  accessTokenDuration: process.env.ACCESS_TOKEN_DURATION,
  refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION,
  saltRounds: process.env.SALT_ROUNDS,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
};

module.exports = config;
