import { createPolicy, getPolicy, updatePolicy, deletePolicy } from '../services/policy.js';

// Controller to create a policy
export const createPolicyController = async (req, res) => {
  try {
    const policyData = req.body;
    const newPolicy = await createPolicy(policyData);
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a policy by adminId and either hotelId or propertyId
export const getPolicyController = async (req, res) => {
  try {
    const { adminId, hotelId, propertyId } = req.query;
    const policy = await getPolicy(adminId, hotelId, propertyId);
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a policy
export const updatePolicyController = async (req, res) => {
  try {
    const { policyId } = req.params;
    const updatedData = req.body;
    const updatedPolicy = await updatePolicy(policyId, updatedData);
    if (!updatedPolicy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.status(200).json(updatedPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a policy
export const deletePolicyController = async (req, res) => {
  try {
    const { policyId } = req.params;
    const deletedPolicy = await deletePolicy(policyId);
    if (!deletedPolicy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.status(200).json({ message: 'Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
