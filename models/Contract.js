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
        ref: 'Property'
    },
    hotel: {
        type: schema.Types.ObjectId,
        ref: 'Hotel'
    },
    contractVersion: {
        type: String,
        required: true,
    },
    signature: {
        type: Boolean,
        default: true,
    }
}, { 
    timestamps: true 
});

// Add pre-save validation to ensure only one of property or hotel is set
contractSchema.pre('save', function(next) {
    if (!this.property && !this.hotel) {
        return next(new Error('Either property or hotel field is required.'));
    }
    if (this.property && this.hotel) {
        return next(new Error('Only one of property or hotel can be set.'));
    }
    next();
});

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
