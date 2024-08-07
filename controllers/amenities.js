import {
    createAmenities,
    getAmenities,
    updateAmenities,
    deleteAmenities
  } from "../services/amenities.js";
  
  // Create amenities controller
  export async function createAmenitiesController(req, res) {
    try {
      const data = req.body;
      const newAmenities = await createAmenities(data);
      res.status(201).json({
        success: true,
        message: "Amenities created successfully",
        data: newAmenities
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Get amenities controller
  export async function getAmenitiesController(req, res) {
    try {
      const query = req.query;
      const amenities = await getAmenities(query);
      res.status(200).json({
        success: true,
        message: "Amenities fetched successfully",
        data: amenities
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Update amenities controller
  export async function updateAmenitiesController(req, res) {
    try {
      const query = req.query;
      const data = req.body;
      const amenities = await updateAmenities(query, data);
      res.status(200).json({
        success: true,
        message: "Amenities updated successfully",
        data: amenities
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Delete amenities controller
  export async function deleteAmenitiesController(req, res) {
    try {
      const query = req.query;
      const amenities = await deleteAmenities(query);
      res.status(200).json({
        success: true,
        message: "Amenities deleted successfully",
        data: amenities
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  