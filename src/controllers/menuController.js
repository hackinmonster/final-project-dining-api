import {
    getAllMenus,
    getMenuById,
} from '../services/menuService.js'

export async function getAllMenusHandler(req, res) {
    const {
            menuId,
            search,
            sortBy = 'name',
            sortOrder = 'asc',
            limit=10,
            offset=0
        } = req.query;
    
        const filter = {};
        if (menuId) filter.menuId = menuId;
        if (search) filter.search = search;
        filter.sortBy = sortBy;
        filter.sortOrder = sortOrder;
        filter.limit = parseInt(limit);
        filter.offset = parseInt(offset);
    
        let result = await getAllMenus(filter);
        res.status(200).json(result);

}

export async function getMenuByIdHandler(req, res) {

    const id = parseInt(req.params.id);

    const menu = await getMenuById(id);
    res.status(200).json(menu);

}