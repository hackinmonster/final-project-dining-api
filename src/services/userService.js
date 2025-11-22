import { findAllUsers, getById, update, remove } from "../repositories/userRepo.js";
export async function getAllUsers(params) {
    return await findAllUsers();
}

export async function getUserById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function updateUser(id, data) {
  console.log()
  const updatedUser = await update(id, data);
  if (updatedUser) return updatedUser;
  else {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function deleteUser(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find user with id ${id}`);
    error.status = 404;
    throw error;
  }
}
