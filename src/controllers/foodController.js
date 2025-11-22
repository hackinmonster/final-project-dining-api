import {
    getAllFoodItems,
    getFoodItemById,
    createFoodItem,
} from '../services/foodService.js'

import { matchedData } from 'express-validator';

export async function getAllFoodItemsHandler(req, res) {
    let query = matchedData(req);
    let result = await getAllFoodItems(query);
    res.status(200).json(result);
}

export async function createFoodItemHandler(req,res) {
    let data = req.body;
    let foodItem = await createFoodItem(data);
    res.status(201).json(foodItem);
}

export async function getFoodItemByIdHandler(req,res) {
    res.status(200).json()
}

export async function updateFoodItemHandler(req, res) {
    res.status(200).json()
}

export async function deleteFoodItemHandler(req, res) {
    res.status(204).json()
}