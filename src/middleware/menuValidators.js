import { handleValidationErrors } from './handleValidationErrors.js';
import { param, query, body, oneOf } from 'express-validator';

export const validateMenuQuery = [
    query('name')
        .optional()
        .trim()
        .escape()
        .toLowerCase(),

    query('mealType')
        .optional()
        .trim()
        .escape()
        .toLowerCase(),

    query('date')
        .optional()
        .trim()
        .escape()
        .isDate()
        .withMessage('Invalid date format')
        .toDate(),

    query('diningLocationId')
        .optional()
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('diningLocationId must be a positive integer')
        .toInt(),

    query('location')
        .optional()
        .trim()
        .escape()
        .toLowerCase(),

    
    handleValidationErrors
];
    
export const validateCreateMenu = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Name required")
        .bail(),

    body('mealType')
        .trim()
        .escape()
        .notEmpty()
        .withMessage("mealType required")
        .bail(),

    query('date')
        .trim()
        .escape()
        .isDate()
        .withMessage('Invalid date format')
        .toDate(),

    body('diningLocationId')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('diningLocationId must be a positive integer')
        .toInt(),
    
]

export const validateUpdateMenu = [
    body('name')
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .withMessage("name cannot be empty"),

    body('mealType')
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .withMessage("mealType cannot be empty"),

    body('date')
        .optional()
        .trim()
        .escape()
        .isDate()
        .withMessage('Invalid date format')
        .toDate(),

    body('diningLocationId')
        .optional()
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('diningLocationId must be a positive integer')
        .toInt(),

    handleValidationErrors
];