const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Пользователь не авторизован'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
