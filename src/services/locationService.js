import {
    getAll,
    create
} from '../repositories/locationRepo.js'

export async function getAllLocations(filter) {
    let result = await getAll(filter);
    return result;
}

export async function createLocation(data) { 
    let location = await create(data);
    return location;
}