import prisma from "../config/db.js";

export async function getAll(filter){
const conditions = {};
    if (filter.isVegetarian !== undefined) {
        conditions.isVegetarian = filter.isVegetarian;
    }
    if (filter.isVegan !== undefined) {
        conditions.isVegan = filter.isVegan;
    }

    if (filter.search) {
        conditions.OR = [
            { name: { contains: filter.search, mode: 'insensitive' } },
            { description: { contains: filter.search, mode: 'insensitive' } }
        ]
    }

    const result = await prisma.FoodItem.findMany({
        where: conditions,
        orderBy: { [filter.sortBy]: filter.sortOrder },
        take: filter.limit,
        skip: filter.offset
    });

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

export async function update(id, updates) {
    try {
        const updatedFoodItem = await prisma.FoodItem.update({
            where: { id },
            data: updates,
        });

        return updatedFoodItem;
    }catch(error) { 
        if((error.code === 'P2025')) return null;
        throw error;
    }
}

export async function remove(id) {
    try{
        const result = await prisma.FoodItem.delete({
            where: { id }
        });
        return result;
    }catch(error) {
        if(error.code === 'P2025') return null;
        throw error;
    }
}