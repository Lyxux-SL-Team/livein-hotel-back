import mongoose from 'mongoose';

const schema = mongoose.Schema;

const hotelPropertySchema = new schema({
    hotel: {
        type: schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    description:{
        type: String,
        required: true
    },
    numberOfProperty:{
        type:Number,
        require:true,
    }
});

const HotelProperty = mongoose.model('HotelProperty', hotelPropertySchema);

export default HotelProperty;
