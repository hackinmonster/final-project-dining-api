import express from 'express';
import {
    getAllLocationsHandler,
    createLocationHandler,
} from '../controllers/locationController.js';

import { validateCreateLocation, validateLocationQuery } from '../middleware/locationValidators.js';


const router = express.Router();

router.get('/', validateLocationQuery, getAllLocationsHandler);

router.post('/', validateCreateLocation, createLocationHandler);

export default router;