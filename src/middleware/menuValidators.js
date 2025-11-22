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
    
