require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors({
  origin: [ 'https://mestoofallison.nomoredomains.work', 'http://mestoofallison.nomoredomains.work' ],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
