import express from 'express';


import {
    getAllMenusHandler,
    getMenuByIdHandler,
    createMenuHandler,
    updateMenuHandler,
    deleteMenuHandler
} from '../controllers/menuController.js'

import {
    validateId
} from '../middleware/locationValidators.js'

import {
    validateMenuQuery,
    validateCreateMenu,
    validateUpdateMenu
} from '../middleware/menuValidators.js'

const router = express.Router();

router.get('/', validateMenuQuery, getAllMenusHandler);
router.get('/:id', validateId, getMenuByIdHandler);
router.post('/', validateCreateMenu, createMenuHandler);
router.put("/:id", validateId, validateUpdateMenu, updateMenuHandler);
router.delete("/:id", validateId, deleteMenuHandler);



export default router;