import {
    getAllMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
} from "../services/menuService.js";

export async function getAllMenusHandler(req, res, next) {
    try {
        const {
            location,
            search,
            sortBy = "name",
            sortOrder = "asc",
            limit = 10,
            offset = 0
        } = req.query;

        const filter = {
            location,
            search,
            sortBy,
            sortOrder,
            limit: parseInt(limit),
            offset: parseInt(offset)
        };

        const result = await getAllMenus(filter);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export async function getMenuByIdHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const menu = await getMenuById(id);

        if (!menu) return res.status(404).json({ error: "Menu not found" });

        res.status(200).json(menu);
    } catch (err) {
        next(err);
    }
}

export async function createMenuHandler(req, res, next) {
    try {
        const data = {
            diningLocationId: req.body.diningLocationId,
            name: req.body.name,
            mealType: req.body.mealType,
            date: req.body.date
        };

        const newMenu = await createMenu(data);
        res.status(201).json(newMenu);
    } catch (err) {
        next(err);
    }
}

export async function updateMenuHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        const updatedMenu = await updateMenu(id, req.body);

        if (!updatedMenu)
            return res.status(404).json({ error: "Menu not found" });

        res.status(200).json(updatedMenu);
    } catch (err) {
        next(err);
    }
}

export async function deleteMenuHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        const deleted = await deleteMenu(id);

        if (!deleted)
            return res.status(404).json({ error: "Menu not found" });

        res.status(200).json({ message: "Menu deleted" });
    } catch (err) {
        next(err);
    }
}