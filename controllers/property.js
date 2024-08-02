
import {
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getLocationAutocomplete,
  searchProperty,
} from "../services/property.js";

// Controller to create a new property
export const createPropertyController = async (req, res) => {
  try {
    const property = await createProperty(req.body);
    res.status(201).json({ success: true, data:property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchLocationAutocomplete = async (req, res) => {
  try {
    const locationData = req.query.input; 
    const data = await getLocationAutocomplete(locationData);
    res.json(data);
  } catch (error) {
    console.error('Error fetching location data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller to get a property by ID
export const getPropertyByIdController = async (req, res) => {
  try {
    const property = await getPropertyById(req.params.id);
    res.status(200).json(property);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get all property
export const getAllPropertiesController = async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a property by ID
export const updatePropertyController = async (req, res) => {
  try {
    const property = await updateProperty(req.params.id, req.body);
    res.status(200).json(property);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to delete a property by ID
export const deletePropertyController = async (req, res) => {
  try {
    await deleteProperty(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//search hotel by id name or location
export const searchPropertyController = async (req, res) => {
  try {
    const query = req.query; 
    const property = await searchProperty(query);

    if (property.length === 0) {
      return res.status(404).json({ message: 'No property found' });
    }

    return res.status(200).json(property);
  } catch (error) {
    console.error(`Error in searchPropertyController: ${error.message}`);
    return res.status(500).json({ message: `Error searching property: ${error.message}` });
  }
};