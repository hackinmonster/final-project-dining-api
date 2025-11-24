import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateFoodItemId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Food Item id must be a positive integer'),
        handleValidationErrors,
];

export const validateFoodQuery = [
    query('search')
        .optional()
        .trim()
        .escape(),
    
    query('isVegetarian')
        .optional()
        .isBoolean()
        .withMessage('isVegetarian must be a boolean (true/false)'),

    query('isVegan')
        .optional()
        .isBoolean()
        .withMessage('isVegan must be a boolean (true/false)'),

    query('sortBy')
        .optional()
        .trim()
        .escape()
        .isIn(['name', 'portionSize', 'id']) // Add any other allowed sort fields
        .withMessage('Invalid sort field'),

    query('sortOrder')
        .optional()
        .trim()
        .escape()
        .isIn(['asc', 'desc'])
        .withMessage('Sort order must be asc or desc'),

    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer'),

    query('offset')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Offset must be a non-negative integer'),
];

export const validateCreateFoodItem = [
    body('name')
        .exists({ values: 'falsy' })
        .withMessage('Name is required')
        .bail()
        .trim()
        .escape()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    
    body('description')
        .exists({ values: 'falsy' })
        .withMessage('description is required')
        .bail()
        .trim()
        .escape()
        .isString()
        .withMessage('description must be a string')
        .bail()
        .isLength({ min: 5 })
        .withMessage('description must be at least  5characters'),

    body('portionSize')
        .exists({ values: 'falsy' })
        .withMessage('Portion size is required')
        .bail()
        .trim()
        .escape()
        .isString()
        .withMessage('Portion size must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Portion size must be at least 3 characters'),

    body('ingredients')
        .isArray({ min: 1 })
        .withMessage('Ingredients must not be empty'),
    
    body('ingredients.*')
        .isString()
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Ingredient items cannot be empty strings'),
    
    body('allergens')
        .isArray({ min: 1 })
        .withMessage('allergens must not be empty'),

    body('allergens.*')
        .isString()
        .trim()
        .escape()
        .notEmpty()
        .withMessage('allergens items cannot be empty strings'),

    body('nutrition')
        .isObject()
        .withMessage('Nutrition must be a JSON object'),

    body('nutrition.calories')
        .isInt({ min: 0 })
        .withMessage('Calories must be a number'),

    body('nutrition.fat')
        .isString()
        .trim()
        .isLength({ min: 3})
        .withMessage('Must be 3 characters')
        .escape(),

    body('nutrition.protein')
        .isString()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Must be 3 characters')
        .escape(),

    body('nutrition.carbs')
        .isString()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Must be 3 characters')
        .escape(),

    body('isVegetarian')
        .isBoolean()
        .withMessage('Must be true or fasle.'),

    body('isVegan')
        .isBoolean()
        .withMessage('Must be true or fasle.'),

    handleValidationErrors
];

export const validateUpdateFoodItem = [
    oneOf([
        body('name').exists({ values: 'falsy' }),
        body('description').exists({ values: 'falsy' }),
        body('portionSize').exists({ values: 'falsy' }),
        body('ingredients').exists({ values: 'falsy' }),
        body('nutrition').exists({ values: 'falsy' }),
        body('isVegetarian').exists({ values: 'falsy' }),
        body('isVegan').exists({ values: 'falsy' }),
        ],
    {
        message: 'At least one field must be provided'
    }
    ),

    body('name')
        .optional()
        .trim()
        .escape()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    
    body('description')
        .optional()
        .trim()
        .escape()
        .isString()
        .withMessage('description must be a string')
        .bail()
        .isLength({ min: 5 })
        .withMessage('description must be at least  5characters'),

    body('portionSize')
        .optional()
        .trim()
        .escape()
        .isString()
        .withMessage('Portion size must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Portion size must be at least 3 characters'),

    body('ingredients')
        .optional()
        .isArray(),

    body('ingredients.*')
        .isString()
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Ingredient items cannot be empty strings'),

    body('nutrition')
        .optional()
        .isObject()
        .withMessage('Nutrition must be a JSON object'),

    body('nutrition.calories')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Calories must be a number'),

    body('nutrition.fat')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 3})
        .withMessage('Must be 3 characters')
        .escape(),

    body('nutrition.protein')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Must be 3 characters')
        .escape(),

    body('nutrition.carbs')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Must be 3 characters')
        .escape(),

    body('isVegetarian')
        .optional()
        .isBoolean()
        .withMessage('Must be true or fasle.'),

    body('isVegan')
        .optional()
        .isBoolean()
        .withMessage('Must be true or fasle.'),

    handleValidationErrors
]