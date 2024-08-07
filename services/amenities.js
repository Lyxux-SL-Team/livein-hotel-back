import Amenities from "../models/Amenities.js";

// Create amenities for a hotel or property
export async function createAmenities(data) {
  try {
    // Ensure only one of hotel or property is provided
    if (data.hotel && data.property) {
      throw new Error('Only one of hotel or property should be provided.');
    }

    // Check if amenities already exist for the given hotel or property
    const existingAmenities = await Amenities.findOne({
      $or: [{ hotel: data.hotel }, { property: data.property }],
    });

    if (existingAmenities) {
      throw new Error('Amenities for the given hotel or property already exist.');
    }

    // Create and save the new amenities document
    const newAmenities = new Amenities(data);
    await newAmenities.save();

    return newAmenities;
  } catch (error) {
    throw error;
  }
}

// Get amenities by hotel or property
export async function getAmenities(query) {
  try {
    const { hotel, property } = query;
    if (!hotel && !property) {
      throw new Error('Either hotel or property must be provided.');
    }

    const amenities = await Amenities.findOne({
      $or: [{ hotel }, { property }],
    }).populate('admin hotel property');

    if (!amenities) {
      throw new Error('Amenities not found for the provided hotel or property.');
    }

    return amenities;
  } catch (error) {
    throw error;
  }
}

// Update amenities by hotel or property
export async function updateAmenities(query, data) {
  try {
    const { hotel, property } = query;
    if (!hotel && !property) {
      throw new Error('Either hotel or property must be provided.');
    }

    const amenities = await Amenities.findOneAndUpdate(
      { $or: [{ hotel }, { property }] },
      data,
      { new: true, runValidators: true }
    );

    if (!amenities) {
      throw new Error('Amenities not found for the provided hotel or property.');
    }

    return amenities;
  } catch (error) {
    throw error;
  }
}

// Delete amenities by hotel or property
export async function deleteAmenities(query) {
  try {
    const { hotel, property } = query;
    if (!hotel && !property) {
      throw new Error('Either hotel or property must be provided.');
    }

    const amenities = await Amenities.findOneAndDelete({
      $or: [{ hotel }, { property }],
    });

    if (!amenities) {
      throw new Error('Amenities not found for the provided hotel or property.');
    }

    return amenities;
  } catch (error) {
    throw error;
  }
}
