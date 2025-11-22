import e from "cors";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../services/userService.js";

export async function getAllUsersHandler(req, res){
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getUserByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let user = await getUserById(id);
  res.status(200).json(user);
}

export async function updateUserHandler(req, res) {
  let id = parseInt(req.params.id);
  const updates = {};

  if (req.body.email) updates.email = req.body.email;
  if (req.body.password) updates.password = req.body.password;
  if (req.body.notificationEnabled !== "undefined") updates.notificationEnabled = JSON.parse(req.body.notificationEnabled);

  const updatedUser = await updateUser(id, updates);
  res.status(200).json(updatedUser);
}

export async function deleteUserHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteUser(id);
  res.status(204).send();
}