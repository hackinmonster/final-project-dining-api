import {
    getAll,
    create,
    getLocation,
    update,
    remove,
} from '../repositories/locationRepo.js'

export async function getAllLocations(filter) {
    let result = await getAll(filter);
    return result;
}

export async function createLocation(data) { 
    let location = await create(data);
    return location;
}

export async function getLocationById(id) {
    let result = await getLocation(id);
    return result;
}

export async function updateLocation(id, data) {
    let updatedLocation = await update(id, data);
    return updatedLocation;
}

export async function deleteLocation(id) {
    let deletedLocation = await remove(id);
    return deletedLocation;
}