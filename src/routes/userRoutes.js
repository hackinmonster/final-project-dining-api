import express from "express";
import { deleteUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler } from "../controllers/userController.js";
import {authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { validateUpdateUser } from "../middleware/userValidators.js";
const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/me', authenticate, getUserByIdHandler); 
router.put('/me', authenticate, validateUpdateUser, updateUserHandler);
router.delete('/me', authenticate, deleteUserHandler);
export default router;