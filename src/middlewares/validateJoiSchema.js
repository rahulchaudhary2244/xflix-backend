const httpStatus = require("http-status");
const Joi = require("joi");
const ApiError = require("../utils/ApiError");

const validateJoiSchema_body = (schema) => (req, res, next) => {
  const joiSchema = Joi.object().keys(schema);
  const { error } = joiSchema.validate(req.body);
  if (error) {
    console.log(error);
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  next();
};

const validateJoiSchema_params = (schema) => (req, res, next) => {
  const joiSchema = Joi.object().keys(schema);
  const { error } = joiSchema.validate(req.params);
  if (error) {
    console.log(error);
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  next();
};

const validateJoiSchema_query = (schema) => (req, res, next) => {
  const joiSchema = Joi.object().keys(schema);
  const { error } = joiSchema.validate(req.query);
  if (error) {
    console.log(error);
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  next();
};

module.exports = {
  validateJoiSchema_body,
  validateJoiSchema_params,
  validateJoiSchema_query,
};
