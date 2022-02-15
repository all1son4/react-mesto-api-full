const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  console.log('2')
  const { token } = req.cookies;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'jwtsecret');
  } catch (err) {
    next(new UnauthorizedError('Пользователь не авторизован'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
