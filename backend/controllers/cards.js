const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  return Card
    .create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardId;

  return Card
    .findById(id)
    .orFail(new NotFoundError(`Карточка с id ${id} не найдена`))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Не трогайте чужие карточки'));
      }

      return card.remove();
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
  .orFail(new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`))
  .then((card) => res.status(200).send(card.likes))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id'));
    } else {
      next(err);
    }
  });

const unlikeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
  .orFail(new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`))
  .then((card) => res.status(200).send(card.likes))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id'));
    } else {
      next(err);
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
