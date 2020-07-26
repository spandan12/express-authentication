const joi = require("joi");

function validate(schema) {
  return async (req, res, next) => {
    try {
      const { error } = await schema.validate(req.body);

      if (error) {
        res.status(400).send(error.details);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = validate;
