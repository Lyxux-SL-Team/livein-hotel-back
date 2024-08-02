import Contract from '../models/Contract.js';

// Function to save a new contract
async function saveContract(adminId, contractVersion, options = {}) {
    const { propertyId = null, hotelId = null, signature = true } = options;

    // Validate input to ensure either propertyId or hotelId is provided, but not both
    if (!propertyId && !hotelId) {
        throw new Error('Either propertyId or hotelId must be provided.');
    }
    if (propertyId && hotelId) {
        throw new Error('Only one of propertyId or hotelId can be provided.');
    }

    const contractData = {
        admin: adminId,
        contractVersion,
        signature,
    };

    if (propertyId) {
        contractData.property = propertyId;
    }

    if (hotelId) {
        contractData.hotel = hotelId;
    }

    const contract = new Contract(contractData);

    try {
        await contract.save();
        return contract;
    } catch (error) {
        throw new Error(`Error saving contract: ${error.message}`);
    }
}


// Function to get contracts by adminId
async function getContractsByAdmin(adminId) {
    try {
        const contracts = await Contract.find({ admin: adminId })
            .populate('admin', 'name') // Adjust fields as necessary
            .populate('property', 'name') // Adjust fields as necessary
            .populate('hotel', 'name'); // Adjust fields as necessary

        return contracts;
    } catch (error) {
        throw new Error(`Error fetching contracts: ${error.message}`);
    }
}

//pass signature 
const verifySignature = async (contractId) => {
    try {
        const contract = await Contract.findById(contractId);
        if (!contract) {
            throw new Error("Contract not found!");
        }
        return contract;
    } catch (error) {
        throw new Error(`Error verifying signature: ${error.message}`);
    }
};


export {saveContract,getContractsByAdmin,verifySignature}
