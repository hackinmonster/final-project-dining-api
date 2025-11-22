import prisma from "../config/db.js";

export async function getAll(query){
    const result = await prisma.FoodItem.findMany();

    return result;
}

export async function getById(id) {
    const foodItem = await prisma.FoodItem.findUnique({
        where: { id }
    });
    return foodItem;
}

export async function create(foodItem) {
    const newfoodItem = await prisma.FoodItem.create({
        data: foodItem
    })
    return newfoodItem;
}