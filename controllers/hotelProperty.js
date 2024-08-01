import {
    createHotelProperty,
    getAllHotelProperties,
    getHotelPropertyById,
    updateHotelPropertyById,
    deleteHotelPropertyById
} from '../services/hotelProperty.js';

// Controller for creating a new hotel property
export const createHotelPropertyController = async (req, res) => {
    try {
        const hotelProperty = await createHotelProperty(req.body);
        res.status(201).json(hotelProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error creating hotel property: ' + error.message });
    }
};

// Controller for getting all hotel properties
export const getAllHotelPropertiesController = async (req, res) => {
    try {
        const hotelProperties = await getAllHotelProperties();
        res.status(200).json(hotelProperties);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving hotel properties: ' + error.message });
    }
};

// Controller for getting a hotel property by ID
export const getHotelPropertyByIdController = async (req, res) => {
    try {
        const hotelProperty = await getHotelPropertyById(req.params.id);
        res.status(200).json(hotelProperty);
    } catch (error) {
        res.status(404).json({ message: 'Error retrieving hotel property: ' + error.message });
    }
};

// Controller for updating a hotel property by ID
export const updateHotelPropertyByIdController = async (req, res) => {
    try {
        const hotelProperty = await updateHotelPropertyById(req.params.id, req.body);
        res.status(200).json(hotelProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error updating hotel property: ' + error.message });
    }
};

// Controller for deleting a hotel property by ID
export const deleteHotelPropertyByIdController = async (req, res) => {
    try {
        const hotelProperty = await deleteHotelPropertyById(req.params.id);
        res.status(200).json(hotelProperty);
    } catch (error) {
        res.status(404).json({ message: 'Error deleting hotel property: ' + error.message });
    }
};
