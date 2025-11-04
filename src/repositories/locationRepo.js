import prisma from '../config/db.js';

export async function getAll(filter) {
    const conditions = {};

    if (filter.categoryId) {
            conditions.locationId = { equals: parseInt(filter.locationId)};
        }

    if (filter.search) {
        conditions.OR = [
            {name: {contains: filter.search, mode: 'insensitive'}},
            {description: {contains: filter.search, mode: 'insensitive'}}
        ]
    }

    const locations = await prisma.diningLocation.findMany({
        where: conditions,
        
        select: {
            id: true,
            name: true,
            description: true,            
        },
        orderBy: {[filter.sortBy]: filter.sortOrder},
        take: filter.limit, 
        skip: filter.offset,
    });
    return locations;
}

export async function create(location) {
    const newLocation = await prisma.diningLocation.create({
        data: location
    });

    return newLocation;
}