import express from 'express';
import {
    createHotelController,
    getHotelByIdController,
    updateHotelController,
    deleteHotelController,
    getAllHotelController,
    fetchLocationAutocomplete,
    searchHotelsController,
    verifyHotelController,
    verifyHotelEmailController
} from '../controllers/hotel.js'; 

const router = express.Router();

router.post('/hotel', createHotelController);
router.get('/hotel/:id', getHotelByIdController);
router.put('/hotel/:id', updateHotelController);
router.delete('/hotel/:id', deleteHotelController);
router.get('/hotels', getAllHotelController); 
router.get('/locationAutocomplete', fetchLocationAutocomplete);
router.get('/search', searchHotelsController);
router.get('/verify/:hotelId',verifyHotelController);
router.get('/verify/:hotelId/:token', verifyHotelEmailController);

export { router as HotelRouter };
