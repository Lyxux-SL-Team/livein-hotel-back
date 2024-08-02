import express from 'express';
import {
    createPropertyController,
    getPropertyByIdController,
    updatePropertyController,
    deletePropertyController,
    getAllPropertiesController,
    fetchLocationAutocomplete,
    searchPropertyController,
    verifyPropertyController
} from '../controllers/property.js';


const router = express.Router();

router.post('/properties', createPropertyController);
router.get('/properties/:id',getPropertyByIdController);
router.put('/properties/:id',updatePropertyController);
router.delete('/properties/:id', deletePropertyController);
router.get('/getAllProperty',getAllPropertiesController);
router.get('/locationAutocomplete', fetchLocationAutocomplete);
router.get('/search', searchPropertyController);
router.get('/verify/:propertyId', verifyPropertyController);
export {router as PropertyRouter}
