import HotelProperty from "../models/HotelProperty.js";

// Create a new hotel property
export const createHotelProperty = async (data) => {
    try {
        const hotelProperty = new HotelProperty(data);
        await hotelProperty.save();
        return hotelProperty;
    } catch (error) {
        throw new Error('Error creating hotel property: ' + error.message);
    }
};

// Get all hotel properties
export const getAllHotelProperties = async () => {
    try {
        const hotelProperties = await HotelProperty.find().populate('hotel');
        return hotelProperties;
    } catch (error) {
        throw new Error('Error retrieving hotel properties: ' + error.message);
    }
};

// Get a hotel property by ID
export const getHotelPropertyById = async (id) => {
    try {
        const hotelProperty = await HotelProperty.findById(id).populate('hotel');
        if (!hotelProperty) {
            throw new Error('Hotel property not found');
        }
        return hotelProperty;
    } catch (error) {
        throw new Error('Error retrieving hotel property: ' + error.message);
    }
};

// Update a hotel property by ID
export const updateHotelPropertyById = async (id, data) => {
    try {
        const hotelProperty = await HotelProperty.findByIdAndUpdate(id, data, { new: true }).populate('hotel');
        if (!hotelProperty) {
            throw new Error('Hotel property not found');
        }
        return hotelProperty;
    } catch (error) {
        throw new Error('Error updating hotel property: ' + error.message);
    }
};

// Delete a hotel property by ID
export const deleteHotelPropertyById = async (id) => {
    try {
        const hotelProperty = await HotelProperty.findByIdAndDelete(id).populate('hotel');
        if (!hotelProperty) {
            throw new Error('Hotel property not found');
        }
        return hotelProperty;
    } catch (error) {
        throw new Error('Error deleting hotel property: ' + error.message);
    }
};
