import { param, query, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateLocationQuery = [
    query('name')
        .optional()
        .trim()
        .escape()
        .toLowerCase(),

    handleValidationErrors
];

export const validateCreateLocation = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Name required")
        .bail()
        .isLength({min:5})
        .withMessage("Name must be at least 5 characters")
        .bail(),

    body('description')
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Description required")
        .bail()
        .isLength({min:5})
        .withMessage("Description must be at least 5 characters")
        .bail(),

    handleValidationErrors
]