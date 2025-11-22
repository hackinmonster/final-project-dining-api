import prisma from "../config/db.js";

export async function createUser(data) {
    return await prisma.user.create({data: data, omit: {password: true}});
}

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({where: {email}});
}

export async function findAllUsers(){
    return await prisma.user.findMany({
        omit: {password: true},
    });
}

export async function getById(id) {
  console.log('got here')
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true
    },
  });
  return user;
}

export async function update(id, updates) {
  try {
    console.log(id);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updates,
      omit: {password: true},
    });
    return updatedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}