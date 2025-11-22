import {
    getAll,
    getMenu,
    create
} from '../repositories/menuRepo.js'

import prisma from '../config/db.js';


export async function getAllMenus(filter) {


    let loc = null;
    if (filter.location) {
        //Get dining location ID, using user inputted location name.
        loc = await prisma.diningLocation.findFirst({
        where: { 
            name: { contains: filter.location, mode: 'insensitive' } 
        }
    });

    }

    if (filter.location && !loc) {
        //No dining hall with that ID
        return [];
    }

    if (filter.location) {
        filter.diningLocationId = loc.id;
    }

    
    let result = await getAll(filter);

    return result;
}

export async function createMenu(data) { 

    //Get dining location ID, using user inputted location name.
    const loc = await prisma.diningLocation.findUnique({
        where: { 
            id: data.diningLocationId 
        }
    });

    //Change date format
    data.date = new Date(data.date);


    if (!loc) {
        //No dining hall with that ID
        const error = new Error('Invalid diningLocationId');
        error.status = 400;
        throw error;
    }

    let menu = await create(data);
    return menu;
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