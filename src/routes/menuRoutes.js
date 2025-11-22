import express from 'express';

import {
    getAllMenusHandler,
    getMenuByIdHandler
} from '../controllers/menuController.js'

import {
    validateId
} from '../middleware/locationValidators.js'

import {
    validateMenuQuery
} from '../middleware/menuValidators.js'

const router = express.Router();

router.get('/', validateMenuQuery, getAllMenusHandler);
router.get('/:id', validateId, getMenuByIdHandler);





export default router;