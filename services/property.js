import Property from '../models/Property.js';
import emailService from "./emailService.js";
import crypto from "crypto"
import Token from "../models/Token.js";
import dotenv from 'dotenv'
dotenv.config();
// Create a new property
const createProperty = async (propertyData) => {
  try {
    const property = new Property(propertyData);
    await property.save();

    const token = new Token({
      property: property._id,
      token: crypto.randomBytes(32).toString('hex'),
    });
    await token.save();

    const message = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2>Property Verification</h2>
        <p>Please click the button below to verify your property listing:</p>
        <a href="${process.env.BASE_URL}/api/property/verify/${property._id}/${token.token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #28a745; text-align: center; text-decoration: none; border-radius: 5px;">
          Verify Property
        </a>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

    await emailService(propertyData.email, 'Verify Property', message);

    return property;
  } catch (error) {
    console.error(`Error creating property: ${error.message}`); // Added logging
    throw new Error(`Error creating property: ${error.message}`);
  }
};

// Verify property
const verifyPropertyEmail = async (propertyId, tokenValue) => {
  try {
    const property = await Property.findById(propertyId);
    if (!property) throw new Error('Invalid link');

    const token = await Token.findOne({
      property: property._id,
      token: tokenValue,
    });
    if (!token) throw new Error('Invalid link');

    if (property.verify) {
      await Token.findByIdAndDelete(token._id);
      return 'Property already verified.';
    }

    await Property.findByIdAndUpdate(property._id, { verify: true });
    await Token.findByIdAndDelete(token._id);

    return 'Property verified successfully';
  } catch (error) {
    console.error(`Error verifying property: ${error.message}`); // Added logging
    throw new Error(`An error occurred: ${error.message}`);
  }
};


const getLocationAutocomplete = async (locationData) => {
    const API_KEY = process.env.API_KEY;
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(locationData)}&key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };
  

// Get a property by ID
const getPropertyById = async (propertyId) => {
    try {
        const property = await Property.findById(propertyId).populate('admin');
        if (!property) {
            throw new Error('Property not found');
        }
        return property;
    } catch (error) {
        throw new Error(`Error retrieving property: ${error.message}`);
    }
};

// Get all properties
const getAllProperties = async () => {
    try {
        const properties = await Property.find();
        return properties;
    } catch (error) {
        throw new Error(`Error retrieving properties: ${error.message}`);
    }
};


// Update a property by ID
const updateProperty = async (propertyId, updateData) => {
    try {
        const property = await Property.findByIdAndUpdate(propertyId, updateData, { new: true });
        if (!property) {
            throw new Error('Property not found');
        }
        return property;
    } catch (error) {
        throw new Error(`Error updating property: ${error.message}`);
    }
};

// Delete a property by ID
const deleteProperty = async (propertyId) => {
    try {
        const property = await Property.findByIdAndDelete(propertyId);
        if (!property) {
            throw new Error('Property not found');
        }
        return property;
    } catch (error) {
        throw new Error(`Error deleting property: ${error.message}`);
    }
};
// Search property by name, ID, or location
const searchProperty = async (query) => {
    try {
      const { name, id, location } = query;
  
      let searchCriteria = {};
  
      if (id) {
        // Search by ID
        searchCriteria._id = mongoose.Types.ObjectId(id);
      }
  
      if (name) {
        // Search by name (assuming 'name' is a field in your hotel schema)
        searchCriteria.legalName = new RegExp(name, 'i'); // Case-insensitive search
      }
  
      if (location) {
        // Search by location (you can search by city, streetAddress, or any other field)
        searchCriteria.$or = [
          { city: new RegExp(location, 'i') },
          { streetAddress: new RegExp(location, 'i') },
          { area: new RegExp(location, 'i') },
        ];
      }
  
      const property = await Property.find(searchCriteria);
      return property;
    } catch (error) {
      throw new Error(`Error searching property: ${error.message}`);
    }
  };
  
  //verify property
  const verifyProperty = async (propertyId) => {
    try {
      const property = await Property.findById(propertyId);
      if (!property) {
        throw new Error("Property not found");
      }
      return property;
    } catch (error) {
      throw new Error(`Error verifying Property: ${error.message}`);
    }
  }

export {
    createProperty,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getAllProperties,
    getLocationAutocomplete,
    searchProperty,
    verifyProperty,
    verifyPropertyEmail,
};
