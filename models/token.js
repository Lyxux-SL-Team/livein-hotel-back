import mongoose from 'mongoose';
const schema = mongoose.Schema;

const tokenSchema = new schema({
  property: {
    type: schema.Types.ObjectId,
    ref: 'Property',
    unique: true,
  },
  hotel: {
    type: schema.Types.ObjectId,
    ref: 'Hotel',
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
