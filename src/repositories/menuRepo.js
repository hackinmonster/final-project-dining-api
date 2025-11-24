import prisma from '../config/db.js';

export async function getAll(filter) {
    
    const conditions = {};

    if (filter.search) {
        conditions.OR = [
            {name: {contains: filter.search, mode: 'insensitive'}},
            {mealType: {contains: filter.search, mode: 'insensitive'}},
            {date: {contains: filter.search, mode: 'insensitive'}},
            {diningLocationId: {contains: filter.search, mode: 'insensitive'}},
        ]
    }

    const menus = await prisma.menu.findMany({
        where: conditions,
        
        select: {
            id: true,
            name: true,
            mealType: true,
            date: true,
            diningLocationId: true            
        },
        orderBy: {[filter.sortBy]: filter.sortOrder},
        take: filter.limit, 
        skip: filter.offset,
    });
    return menus;
}

export async function getMenu(id) {

    const menu = await prisma.menu.findUnique({
        where: {id: id},
        select: {
            id: true,
            name: true,
            mealType: true,
            date: true
        }
    });

    return menu;
}

export async function create(menu) {

    const newMenu = prisma.menu.create({
        data: menu
    });

    return newMenu;
}

export async function update(id, data) {
    try {
        return await prisma.menu.update({
            where: { id },
            data
        });
    } catch (err) {
        if (err.code === "P2025") return null;
        throw err;
    }
}

export async function remove(id) {
    try {
        return await prisma.menu.delete({
            where: { id }
        });
    } catch (err) {
        if (err.code === "P2025") return null;
        throw err;
    }
}