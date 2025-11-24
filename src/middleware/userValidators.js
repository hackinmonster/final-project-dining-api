import {param, query, body, oneOf} from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateUser = [
    body('email')
    .exists({values: 'false'})
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

    body('password')
    .exists({values: 'false'})
    .withMessage('password is required')
    .bail()
    .isLength({min:8, max:64})
    .withMessage('password must contain at least 8 characters and at most 64 characters'),

    handleValidationErrors
];

export const validateUpdateUser = [
  oneOf(
    [
      body('email').exists({ values: 'falsy' }),
      body('password').exists({ values: 'falsy' }),
      body('notificationEnabled').exists({values: 'falsy'})
    ],
    {
      message:
        'At least one field (email, password, notificationEnabled) must be provided',
    },
  ),

  body('email')
    .optional()
    .trim()
    .escape()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

  body('password')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('password must be a string')
    .bail()
    .isLength({min:8, max:64})
    .withMessage('password must contain at least 8 characters and at most 64 characters'),

  body('notificationEnabled')
    .optional()
    .trim()
    .escape()
    .isBoolean()
    .withMessage('notificationEnabled must be either true or false'),

  handleValidationErrors,
];

export const validateFoodId = [
  param('id')
  .exists({ values: 'falsy' })
  .withMessage('food id is requred.')
  .bail()
  .isInt({min: 1})
  .withMessage('food id must be a positive int greater than 0.'),

  handleValidationErrors,
];