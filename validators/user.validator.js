const joi = require("joi");

const userValidator = joi.object({
  username: joi.string().label("Username").required(),
  password: joi.string().label("Password").required(),
});

const tokenValidator = joi.object({
  refreshToken: joi.string().label("RefreshToken").required(),
});

module.exports = { userValidator, tokenValidator };
