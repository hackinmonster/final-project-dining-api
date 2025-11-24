import {
    getAllFoodItems,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,

} from '../services/foodService.js'

import { matchedData } from 'express-validator';

export async function getAllFoodItemsHandler(req, res) {
    let query = matchedData(req);
    let result = await getAllFoodItems(query);
    res.status(200).json(result);
}

export async function createFoodItemHandler(req,res) {
    let data = matchedData(req);
    let foodItem = await createFoodItem(data);
    res.status(201).json(foodItem);
}

export async function getFoodItemByIdHandler(req,res) {
    let id = parseInt(req.params.id);
    let foodItem = await getFoodItemById(id);
    res.status(200).json(foodItem)
}

export async function updateFoodItemHandler(req, res) {
    let id = parseInt(req.params.id);
    const updates = {};
    if(req.body.name) updates.name = req.body.name;
    if(req.body.description) updates.description = req.body.description;
    if(req.body.portionSize) updates.portionSize = req.body.portionSize;
    if(req.body.nutrition) updates.nutrition = req.body.nutrition;
    if(req.body.ingredients) updates.ingredients = req.body.ingredients;
    if(req.body.allergens) updates.allergens = req.body.allergens;
    if(req.body.isVegetarian) updates.isVegetarian = req.body.isVegetarian;
    if(req.body.isVegan) updates.isVegan = req.body.isVegan;
    const updatedFoodItem = await updateFoodItem(id, updates)
    res.status(200).json(updatedFoodItem);
}

export async function deleteFoodItemHandler(req, res) {
    let id = parseInt(req.params.id);
    await deleteFoodItem(id);
    res.status(204).send()
}