import { deleteFavoritesHandler } from "../controllers/userController.js";
import { findAllUsers, getUser, update, removeUser, getFavorites, updateFavorites, removeFavorite } from "../repositories/userRepo.js";
export async function getAllUsers(params) {
    return await findAllUsers();
}

export async function getUserById(id) {
  let result = await getUser(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function getFavoritesById(id) {
  let result = await getFavorites(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find favorites for user of id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function updateUser(id, data) {
  const updatedUser = await update(id, data);
  if (updatedUser) return updatedUser;
  else {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function updateFavoritesById(userId, foodId) {
    const updatedUser = await updateFavorites(userId, foodId);
  if (updatedUser) return updatedUser;
  else {
    const error = new Error(`Cannot find food of id ${foodId}`);
    error.status = 404;
    throw error;
  }
}

export async function deleteUser(id) {
  const result = await removeUser(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function deleteFavoritesById(userId, foodId) {
    const updatedUser = await removeFavorite(userId, foodId);
  if (updatedUser) return updatedUser;
  else {
    const error = new Error(`Cannot find food of id ${foodId}`);
    error.status = 404;
    throw error;
  }
}