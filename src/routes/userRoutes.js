import express from "express";
import { deleteFavoritesHandler, deleteUserHandler, getAllUsersHandler, getFavoritesByIdHander, getUserByIdHandler, updateFavoritesHandler, updateUserHandler } from "../controllers/userController.js";
import {authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { validateUpdateUser, validateFoodId } from "../middleware/userValidators.js";
const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/me', authenticate, getUserByIdHandler); 
router.put('/me', authenticate, validateUpdateUser, updateUserHandler);
router.delete('/me', authenticate, deleteUserHandler);

router.get('/me/favorites', authenticate, getFavoritesByIdHander);
router.put('/me/favorites/:id', authenticate, validateFoodId, updateFavoritesHandler)
router.delete('/me/favorites/:id', authenticate, validateFoodId, deleteFavoritesHandler);

export default router;