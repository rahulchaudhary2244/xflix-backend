require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error');
const httpStatus = require('http-status');
const v1Routes = require('./routes/v1/index');

const app = express();

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use('/v1', v1Routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorHandler);

module.exports.app = app;
