const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => User
  .find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    next(err);
  });

const getUser = (req, res, next) => {
  const id = req.params.userId;

  return User
    .findById(id)
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User
    .findById(id)
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => User
  .findOneAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
    },
  )
  .orFail(new NotFoundError(`Пользователь с id ${req.user.userId} не найден`))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  });

const updateAvatar = (req, res, next) => User
  .findOneAndUpdate(
    { _id: req.user._id },
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
  .orFail(new NotFoundError(`Пользователь с id ${req.user.userId} не найден`))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  });

const login = (req, res, next) => {
  console.log('1');
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'jwtsecret');

      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: false, secure: true,
      })
        .send(user.toJSON());
    })
    .catch(next);
};

const logout = (req, res, next) => {
  res.cookieClear('token', { sameSite: false, secure: true,}).status(200).send({message: 'Токен удален'})
  .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
  logout,
};
