import express from 'express';

import {
    getAllMenusHandler,
    getMenuByIdHandler,
    createMenuHandler
} from '../controllers/menuController.js'

import {
    validateId
} from '../middleware/locationValidators.js'

import {
    validateMenuQuery,
    validateCreateMenu
} from '../middleware/menuValidators.js'

const router = express.Router();

router.get('/', validateMenuQuery, getAllMenusHandler);

router.get('/:id', validateId, getMenuByIdHandler);

router.post('/', validateCreateMenu, createMenuHandler);



export default router;