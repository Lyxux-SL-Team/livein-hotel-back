import mongoose from 'mongoose';
const schema = mongoose.Schema;
const propertySchema = new schema({
    city: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    unitNumber: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    numberOfUnits: {
        type: Number,
        required: true
    },
    legalName: {
        type: String,
        required: true
    },
    propertyName:{
        type:String,
        required:true
    },
    legalNumber: {
        type: String,
        required: true
    },
    location:{
        type:String,
        required:true,
    },
    image: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    admin: {
        type: schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    partOfChina:{
        type:Boolean,
        required:true,
        default:false,
    },
    verify:{
        type:Boolean,
        default:true
    }

});

const Property = mongoose.model('Property', propertySchema);

export default Property;
