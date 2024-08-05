import Policy from "../models/Policy.js";

// Create a policy
export const createPolicy = async (policyData) => {
  try {
    // Check if a policy already exists for the given hotel or property
    if (policyData.hotel) {
      const existingPolicy = await Policy.findOne({ hotel: policyData.hotel });
      if (existingPolicy) {
        throw new Error('A policy already exists for this hotel.');
      }
    }

    if (policyData.property) {
      const existingPolicy = await Policy.findOne({ property: policyData.property });
      if (existingPolicy) {
        throw new Error('A policy already exists for this property.');
      }
    }

    // If no existing policy is found, create the new policy
    const newPolicy = new Policy(policyData);
    await newPolicy.save();
    return newPolicy;
  } catch (error) {
    throw new Error(`Error creating policy: ${error.message}`);
  }
};

// Get a policy by adminId and either hotelId or propertyId
export const getPolicy = async (adminId, hotelId, propertyId) => {
  try {
    const query = { admin: adminId };
    if (hotelId) query.hotel = hotelId;
    if (propertyId) query.property = propertyId;
    
    const policy = await Policy.findOne(query).populate('admin hotel property');
    return policy;
  } catch (error) {
    throw new Error(`Error fetching policy: ${error.message}`);
  }
};

// Update a policy
export const updatePolicy = async (policyId, updatedData) => {
  try {
    const updatedPolicy = await Policy.findByIdAndUpdate(policyId, updatedData, { new: true });
    return updatedPolicy;
  } catch (error) {
    throw new Error(`Error updating policy: ${error.message}`);
  }
};

// Delete a policy
export const deletePolicy = async (policyId) => {
  try {
    const deletedPolicy = await Policy.findByIdAndDelete(policyId);
    return deletedPolicy;
  } catch (error) {
    throw new Error(`Error deleting policy: ${error.message}`);
  }
};
