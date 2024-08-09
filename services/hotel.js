import Hotel from "../models/Hotel.js"; // Ensure correct file name
import emailService from "./emailService.js";
import fetch from 'node-fetch';
import Token from "../models/token.js"
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
// Create a new hotel

const getLocationAutocomplete = async (locationData) => {
  const API_KEY = process.env.API_KEY;
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(locationData)}&key=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Create hotel
const createHotel = async (hotelData) => {
  try {
    const hotel = new Hotel(hotelData);
    await hotel.save();

    const token = new Token({
      hotel: hotel._id,
      token: crypto.randomBytes(32).toString('hex'),
    });
    await token.save();

    const message = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2>Hotel Verification</h2>
        <p>Please click the button below to verify your hotel listing:</p>
        <a href="${process.env.BASE_URL}/api/hotel/verify/${hotel._id}/${token.token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #28a745; text-align: center; text-decoration: none; border-radius: 5px;">
          Verify Hotel
        </a>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

    await emailService(hotelData.email, 'Verify Hotel', message);

    return hotel;
  } catch (error) {
    throw new Error(`Error creating hotel: ${error.message}`);
  }
};

// Verify hotel email
const verifyHotelEmail = async (hotelId, tokenId) => {
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) throw new Error('Invalid link');

    const token = await Token.findOne({
      hotel: hotel._id,
      token: tokenId,
    });
    if (!token) throw new Error('Invalid link');

    if (hotel.verify) {
      await Token.findByIdAndDelete(token._id);
      return 'Hotel already verified.';
    }

    await Hotel.findByIdAndUpdate(hotel._id, { verify: true });
    await Token.findByIdAndDelete(token._id);

    return 'Hotel verified successfully';
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
};


// Get a hotel by ID
const getHotelById = async (hotelId) => {
  try {
    const hotel = await Hotel.findById(hotelId).populate("admin");
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  } catch (error) {
    throw new Error(`Error retrieving hotel: ${error.message}`);
  }
};

// Get all hotels
const getAllHotel = async () => {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (error) {
    throw new Error(`Error retrieving hotels: ${error.message}`);
  }
};
// Update a hotel by ID
const updateHotel = async (hotelId, updateData) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(hotelId, updateData, {
      new: true,
    });
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  } catch (error) {
    throw new Error(`Error updating hotel: ${error.message}`);
  }
};

// Delete a hotel by ID
const deleteHotel = async (hotelId) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  } catch (error) {
    throw new Error(`Error deleting hotel: ${error.message}`);
  }
};

// Search hotels by name, ID, or location
const searchHotels = async (query) => {
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

    const hotels = await Hotel.find(searchCriteria);
    return hotels;
  } catch (error) {
    throw new Error(`Error searching hotels: ${error.message}`);
  }
};

//verify hotel
const verifyHotel = async (hotelId) => {
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  } catch (error) {
    throw new Error(`Error verifying Hotel: ${error.message}`);
  }
}


export { createHotel, getHotelById, updateHotel, deleteHotel, getAllHotel ,getLocationAutocomplete,searchHotels,verifyHotel,verifyHotelEmail};
