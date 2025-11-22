import { 
    getAll,
    getById,
    create,
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