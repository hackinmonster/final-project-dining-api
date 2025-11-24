import express from 'express';

import { 
    getAllFoodItemsHandler,
    createFoodItemHandler,
    getFoodItemByIdHandler,
    updateFoodItemHandler,
    deleteFoodItemHandler    
} from '../controllers/foodController.js';

import {
    validateFoodItemId,
    validateFoodQuery,
    validateCreateFoodItem,
    validateUpdateFoodItem,
} from '../middleware/foodValidators.js'

const router = express.Router();

router.get('/', validateFoodQuery, getAllFoodItemsHandler);

router.post('/', validateCreateFoodItem,createFoodItemHandler);

router.get('/:id', validateFoodItemId, getFoodItemByIdHandler);

router.put('/:id', validateFoodItemId, validateUpdateFoodItem, updateFoodItemHandler)

router.delete('/:id', validateFoodItemId, deleteFoodItemHandler)

export default router;