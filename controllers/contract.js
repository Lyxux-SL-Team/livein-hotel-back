import { saveContract, getContractsByAdmin } from '../services/contract.js'; 
// Controller to handle saving a new contract
export const saveContractController = async (req, res) => {
    const { adminId, contractVersion, propertyId, hotelId, signature } = req.body;

    try {
        const contract = await saveContract(adminId, contractVersion, { propertyId, hotelId, signature });
        res.status(201).json(contract);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to handle fetching contracts by adminId
export const getContractsByAdminController = async (req, res) => {
    const { adminId } = req.params;

    try {
        const contracts = await getContractsByAdmin(adminId);
        res.status(200).json(contracts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
