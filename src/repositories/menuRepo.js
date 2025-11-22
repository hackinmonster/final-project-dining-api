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