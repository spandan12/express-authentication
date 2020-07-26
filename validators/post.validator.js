const joi = require("joi");

const postValidator = joi.object({
  title: joi.string().label("Title").required(),
  description: joi.string().label("Description").required(),
});

module.exports = postValidator;
