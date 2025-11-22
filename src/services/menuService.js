import {
    getAll,
    getMenu
} from '../repositories/menuRepo.js'

export async function getAllMenus(filter) {


    let loc = null;
    if (filter.location) {
        //Get dining location ID, using user inputted location name.
        const loc = await prisma.diningLocation.findFirst({
        where: { 
            name: { contains: filter.location, mode: 'insensitive' } 
        }
    });

    }

    if (!loc) {
        //No dining hall with that ID
        return [];
    }

    filter.diningLocationId = loc.id;
    
    let result = await getAll(filter);

    return result;
}

export async function createMenu(data) { 
    let Menu = await create(data);
    return Menu;
}

export async function getMenuById(id) {
    let result = await getMenu(id);
    return result;
}

export async function updateMenu(id, data) {
    let updatedMenu = await update(id, data);
    return updatedMenu;
}

export async function deleteMenu(id) {
    let deletedMenu = await remove(id);
    return deletedMenu;
}