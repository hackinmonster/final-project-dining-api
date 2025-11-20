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

export async function getLocation(id) {

    const location = await prisma.diningLocation.findUnique({
        where: {id: id},

        select: {
            id: true,
            name: true,
            description: true,            
        },
    })
    
    return location;
}

export async function update(id, data) {

    try {
        const updatedLocation = await prisma.diningLocation.update({
            where: {id},
            data: data
        })
        return updatedLocation;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
        }
}

export async function remove(id) {

    try {
        const deletedLocation = await prisma.diningLocation.delete({
            where: {id}
        })
    return deletedLocation;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
        }
}