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

export async function getUser(id) {
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

export async function getFavorites(id) {
    const foodItems = await prisma.user.findUnique({
    where: { id },
    select: {
      favoriteFoods: true
    },
  });
  return foodItems;
}

export async function update(id, updates) {
  try {
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

export async function updateFavorites(userId, foodId) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        favoriteFoods: {
          connect: [{id: foodId}],
        },
      },
      omit: {password: true},
    });

    const favorites = await getFavorites(userId);
    return favorites;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function removeUser(id) {
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

export async function removeFavorite(userId, foodId) {
    try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        favoriteFoods: {
          disconnect: [{id: foodId}],
        },
      },
      omit: {password: true},
    });

    const favorites = await getFavorites(userId);
    return favorites;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

