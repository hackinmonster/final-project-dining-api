import { 
    getAll,
    getById,
    create,
    update,
    remove
} from "../repositories/foodrepo.js";

export async function getAllFoodItems(query) {
    return await getAll(query);
}

export async function getFoodItemById(id) {
    let result = await getById(id);
    if(result) return result;
    else{
        const error = new Error(`Cannot find Food Item with id: ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function createFoodItem(data) {
    let foodItem = {
        name: data.name,
        description: data.description,
        portionSize: data.portionSize,
        nutrition: data.nutrition,
        ingredients: data.ingredients,
        allergens: data.allergens,
        isVegetarian: data.isVegetarian,
        isVegan: data.isVegan
    };

    return await create(foodItem)
}

export async function updateFoodItem(id, data) {
    const updatedFoodItem = await update(id, data);
    if(updatedFoodItem) return updatedFoodItem;
    else{
        const error = new Error(`Cannot find Food Item with id: ${id}`);
        error.status = 404;
        throw error;
    }
}

export async function deleteFoodItem(id) {
    const deletedFoodItem = await remove(id);
    if(deletedFoodItem) return;
    else{
        const error = new Error(`Cannot find Food Item with id: ${id}`);
        error.status = 404;
        throw error;
    }
}