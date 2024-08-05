import mongoose from "mongoose";

const schema = mongoose.Schema;

const contractSchema = new schema({
    admin: {
        type: schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    property: {
        type: schema.Types.ObjectId,
        ref: 'Property',
        unique:true,
    },
    hotel: {
        type: schema.Types.ObjectId,
        ref: 'Hotel',
        unique:true,
    },
    contractVersion: {
        type: String,
        required: true,
    },
    signature: {
        type: Boolean,
        default: false,
    },
}, { 
    timestamps: true 
});



const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
