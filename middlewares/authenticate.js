const jwt = require("../utils/jwt");

async function authenticate(req, res, next) {
  try {
    res.locals.accessToken = String(req.headers.authorization).replace(
      "Bearer ",
      ""
    );
    if (!req.headers.authorization || !res.locals.accessToken) {
      res.status(401).send({ message: "No token in header" });
    }

    const response = jwt.verifyAccessToken(res.locals.accessToken);

    res.locals.loggedInPayload = response.data;

    next();
  } catch (err) {
    const JWT_ERRORS = ["TokenExpiredError", "JsonWebTokenError"];
    if (JWT_ERRORS.includes(err.name)) {
      res.status(401).send({ message: err.name });
    } else {
      next(err);
    }
  }
}

module.exports = authenticate;
