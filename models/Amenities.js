import mongoose from "mongoose";

const { Schema } = mongoose;

// Define a schema for Internet options and their restrictions
const restrictionSchema = new Schema({
  option: String,
  limitedTime: Number,
  duration: String,
  minimumSpeed: String,
}, { _id: false });

const internetOptionSchema = new Schema({
  option: String,
  type: String,
  minimumSpeed: String,
  restrictions: {
    isAvailable: Boolean,
    options: [restrictionSchema],
  },
}, { _id: false });

// Define a schema for fontDesk details
const deskScheduleSchema = new Schema({
  schedule: String,
  startDay: String,
  endDay: String,
  deskOpens: String,
  deskCloses: String,
}, { _id: false });

const guestCheckInSchema = new Schema({
  from: String,
  to: String,
  noCheckingEndTime: Boolean,
  isLateCheckingAvailable: Boolean,
}, { _id: false });

const fontDeskSchema = new Schema({
  isAvailable: Boolean,
  virtualFrontDesk: String,
  deskSchedule: deskScheduleSchema,
  guestCheckIn: guestCheckInSchema,
  guestCheckOut: String,
  minimumCheckingAge: Number,
}, { _id: false });

// Define the main amenities schema
const amenitiesSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    unique: true,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
  },
  options: {
    type: String,
  },
  fontDesk: fontDeskSchema,
  Internet: [internetOptionSchema],
});

const Amenities = mongoose.model("Amenities", amenitiesSchema);

export default Amenities;
