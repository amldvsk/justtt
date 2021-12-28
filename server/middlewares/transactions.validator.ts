import * as express from 'express';
const Joi = require('joi');

const response = (res: express.Response, status: number, success: boolean, data: any, msg = '') => {
  return res.status(status).json({
    success,
    data,
    msg,
  });
};

export const validateGetTransaction = async (req: express.Request, res: express.Response, next: any) => {
  const schema = Joi.object({
    transaction_id: Joi.number().required(),
  });

  try {
    await schema.validateAsync(req.params);
    return next();
  } catch (err: any) {
    return response(res, 500, false, {}, err.details);
  }
};

export const validateCreateTransaction = async (req: express.Request, res: express.Response, next: any) => {
  const schema = Joi.object({
    customer_uuid: Joi.string().required(),
    total_price: Joi.number().required(),
    currency: Joi.string().required(),
    credit_card_type: Joi.string().required(),
    credit_card_number: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err: any) {
    return response(res, 500, false, {}, err.details);
  }
};

export const validateUpdateTransaction = async (req: express.Request, res: express.Response, next: any) => {
  const schema = Joi.object({
    customer_uuid: Joi.string().required(),
    total_price: Joi.number().required(),
    currency: Joi.string().required(),
    credit_card_type: Joi.string().required(),
    credit_card_number: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().required(),
    transaction_id: Joi.number().required(),
  });

  try {
    await schema.validateAsync({ ...req.params, ...req.body });
    return next();
  } catch (err: any) {
    return response(res, 500, false, {}, err.details);
  }
};

export const validateDeleteTransaction = async (req: express.Request, res: express.Response, next: any) => {
  const schema = Joi.object({
    transaction_id: Joi.number().required(),
  });

  try {
    await schema.validateAsync(req.params);
    return next();
  } catch (err: any) {
    return response(res, 500, false, {}, err.details);
  }
};
