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

    // Check if a contract already exists for the given property
    if (propertyId) {
        const existingContractForProperty = await Contract.findOne({ property: propertyId });
        if (existingContractForProperty) {
            throw new Error('A contract already exists for this property.');
        }
    }

    // Check if a contract already exists for the given hotel
    if (hotelId) {
        const existingContractForHotel = await Contract.findOne({ hotel: hotelId });
        if (existingContractForHotel) {
            throw new Error('A contract already exists for this hotel.');
        }
    }

    // Prepare the contract data
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

    // Create and save the new contract
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
const verifySignature = async (hotelOrPropertyId) => {
    try {
        // Find the contract by property or hotel ID
        const contract = await Contract.findOne({
            $or: [
                { property: hotelOrPropertyId },
                { hotel: hotelOrPropertyId }
            ]
        });

        if (!contract) {
            throw new Error("Contract not found!");
        }

        return contract.signature;
    } catch (error) {
        throw new Error(`Error verifying signature: ${error.message}`);
    }
};


export {saveContract,getContractsByAdmin,verifySignature}
