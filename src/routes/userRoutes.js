import express from "express";
import { deleteUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler } from "../controllers/userController.js";
import {authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { validateUpdateUser } from "../middleware/userValidators.js";
const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/:id', authenticate, getUserByIdHandler); 
router.put('/:id', authenticate, validateUpdateUser, updateUserHandler);
router.delete('/:id', authenticate, deleteUserHandler);
export default router;