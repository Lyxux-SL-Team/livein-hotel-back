import express from 'express';
import {
    createHotelController,
    getHotelByIdController,
    updateHotelController,
    deleteHotelController,
    getAllHotelController,
    fetchLocationAutocomplete,
    searchHotelsController
} from '../controllers/hotel.js'; 

const router = express.Router();

router.post('/hotel', createHotelController);
router.get('/hotel/:id', getHotelByIdController);
router.put('/hotel/:id', updateHotelController);
router.delete('/hotel/:id', deleteHotelController);
router.get('/hotels', getAllHotelController); 
router.get('/locationAutocomplete', fetchLocationAutocomplete);
router.get('/search', searchHotelsController);

export { router as HotelRouter };
