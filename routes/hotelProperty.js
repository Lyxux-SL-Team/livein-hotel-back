import express from 'express';
import {
    createHotelPropertyController,
    getAllHotelPropertiesController,
    getHotelPropertyByIdController,
    updateHotelPropertyByIdController,
    deleteHotelPropertyByIdController
} from '../controllers/hotelProperty.js';

const router = express.Router();

router.post('/', createHotelPropertyController);
router.get('/', getAllHotelPropertiesController);
router.get('/:id', getHotelPropertyByIdController);
router.put('/:id', updateHotelPropertyByIdController);
router.delete('/:id', deleteHotelPropertyByIdController);

export {router as HotelPropertyRoute}
