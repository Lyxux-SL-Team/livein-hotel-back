import express from 'express';
import {
  createAmenitiesController,
  getAmenitiesController,
  updateAmenitiesController,
  deleteAmenitiesController
} from '../controllers/amenities.js'; 

const router = express.Router();

// Route to create amenities
router.post('/create', createAmenitiesController);

// Route to get amenities
router.get('/get', getAmenitiesController);

// Route to update amenities
router.put('/update', updateAmenitiesController);

// Route to delete amenities
router.delete('/delete', deleteAmenitiesController);

export { router as amenitiesRouter };
