import { param, query, body, oneOf } from 'express-validator';
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

export const validateId = [
    param('id')
        .isInt({min:1})
        .withMessage('Location ID must be positive integer'),
     handleValidationErrors,
]

export const validateUpdateLocation = [

    oneOf(
        [
            body('name').exists({  values: 'falsy'}),
            body('description').exists({  values: 'falsy'}),
        ],
        {
            message: 'At least one field (name, description) must be provided'
        },
    ),

    body('name')
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Name required")
        .bail()
        .isLength({min:5})
        .withMessage("Name must be at least 5 characters")
        .bail(),

    body('description')
        .optional()
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