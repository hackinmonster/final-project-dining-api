import e from "cors";
import bcrypt from 'bcrypt';
import { getAllUsers, updateUser, deleteUser, getFavoritesById, getUserById, updateFavoritesById, deleteFavoritesById } from "../services/userService.js";

export async function getAllUsersHandler(req, res){
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getUserByIdHandler(req, res) {
  let id = parseInt(req.user.id);
  let user = await getUserById(id);
  res.status(200).json(user);
}

export async function getFavoritesByIdHander(req, res) {
  let id = parseInt(req.user.id);
  let foodItems = await getFavoritesById(id);
  res.status(200).json(foodItems);
}

export async function updateUserHandler(req, res) {
  let id = parseInt(req.user.id);
  const updates = {};

  if (req.body.email) updates.email = req.body.email;
  if (req.body.password) updates.password = await bcrypt.hash(req.body.password, 10);
  if (typeof req.body.notificationEnabled !== "undefined") updates.notificationEnabled = JSON.parse(req.body.notificationEnabled);

  const updatedUser = await updateUser(id, updates);
  res.status(200).json(updatedUser);
}

export async function updateFavoritesHandler(req, res) {
  let userId = parseInt(req.user.id);
  let foodId = parseInt(req.params.id);

  const updatedFavorites = await updateFavoritesById(userId, foodId);

  res.status(200).json(updatedFavorites);
}

export async function deleteUserHandler(req, res) {
  let id = parseInt(req.user.id);
  await deleteUser(id);
  res.status(204).send();
}

export async function deleteFavoritesHandler(req, res) {
  let userId = parseInt(req.user.id);
  let foodId = parseInt(req.params.id);

  const updatedFavorites = await deleteFavoritesById(userId, foodId);

  res.status(200).json(updatedFavorites);
}