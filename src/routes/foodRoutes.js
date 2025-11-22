import express from 'express';

import { 
    getAllFoodItemsHandler,
    createFoodItemHandler,
    getFoodItemByIdHandler,
    updateFoodItemHandler,
    deleteFoodItemHandler    
 } from '../controllers/foodController.js';

const router = express.Router();

router.get('/', getAllFoodItemsHandler);

router.post('/', createFoodItemHandler);

router.get('/:id', getFoodItemByIdHandler);

router.put('/:id', updateFoodItemHandler)

router.delete('/:id', deleteFoodItemHandler)

export default router;