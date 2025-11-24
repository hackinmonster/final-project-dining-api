import { 
    getAllLocations,
    createLocation,
    getLocationById,
    updateLocation,
    deleteLocation
 } from '../services/locationService.js'

export async function getAllLocationsHandler(req, res) {
    const {
        locationId,
        search,
        sortBy = 'name',
        sortOrder = 'asc',
        limit=10,
        offset=0
    } = req.query;

    const filter = {};
    if (locationId) filter.locationId = locationId;
    if (search) filter.search = search;
    filter.sortBy = sortBy;
    filter.sortOrder = sortOrder;
    filter.limit = parseInt(limit);
    filter.offset = parseInt(offset);

    let result = await getAllLocations(filter);
    res.status(200).json(result);

}

export async function createLocationHandler(req, res) {
    const data = {
        name: req.body.name,
        description: req.body.description,
    }

    let newLocation = await createLocation(data)
    res.status(201).json(newLocation);
}

export async function getLocationByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    let result = await getLocationById(id);
    res.status(200).json(result)
}

export async function updateLocationHandler(req, res) {

    const id = parseInt(req.params.id);

    const data = {
        name: req.body.name,
        description: req.body.description,
    }

    let updatedLocation = await updateLocation(id, data)
    res.status(200).json(updatedLocation);
}

export async function deleteLocationHandler(req, res) {
    const id = parseInt(req.params.id);

    let deletedLocation = await deleteLocation(id);
    res.status(200).json(deletedLocation);
}