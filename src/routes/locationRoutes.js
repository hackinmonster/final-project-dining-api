import express from 'express';
import {
    getAllLocationsHandler,
    createLocationHandler,
    getLocationByIdHandler,
    updateLocationHandler,
    deleteLocationHandler
} from '../controllers/locationController.js';

import { 
    validateCreateLocation, 
    validateLocationQuery,
    validateId,
    validateUpdateLocation
} from '../middleware/locationValidators.js';


const router = express.Router();

router.get('/', validateLocationQuery, getAllLocationsHandler);

router.get('/:id', validateId, getLocationByIdHandler);

router.post('/', validateCreateLocation, createLocationHandler);

router.put('/:id', validateUpdateLocation, updateLocationHandler);

router.delete('/:id', validateId, deleteLocationHandler);

export default router;