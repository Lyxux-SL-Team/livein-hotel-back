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

// Define a schema for front desk details
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

const frontDeskSchema = new Schema({
  isAvailable: Boolean,
  virtualFrontDesk: String,
  deskSchedule: deskScheduleSchema,
  guestCheckIn: guestCheckInSchema,
  guestCheckOut: String,
  minimumCheckingAge: Number,
}, { _id: false });

// Define a schema for parking options
const parkingOptionSchema = new Schema({
  option: String,
  isAvailable: Boolean,
  type: String,
  inOutPrivileges: Boolean,
  coveredParking: Boolean,
  uncoveredParking: Boolean,
  securedParking: Boolean,
  parkingFee: String,
  duration: String,
}, { _id: false });

const parkingSchema = new Schema({
  isAvailable: Boolean,
  options: [parkingOptionSchema],
}, { _id: false });

// Define a schema for breakfast options
const breakfastOptionSchema = new Schema({
  option: String,
}, { _id: false });

const breakfastSchema = new Schema({
  isAvailable: Boolean,
  options: [breakfastOptionSchema],
}, { _id: false });

// Define a schema for pool access options
const poolAccessOptionSchema = new Schema({
  option: String,
  howMany: String,
  startTime: String,
  endTime: String,
  from: String,
  to: String,
  type: String,
  isAvailable: Boolean,
}, { _id: false });

const poolAccessSchema = new Schema({
  isAvailable: Boolean,
  options: [poolAccessOptionSchema],
}, { _id: false });

// Define a schema for dining venue options
const diningOptionSchema = new Schema({
  option: String,
  isAvailable: Boolean,
}, { _id: false });

// Define a schema for dining venue fees
const diningFeeSchema = new Schema({
  name: String,
  childAmount: Number,
  feeAmount: Number,
  isAvailable: Boolean,
  minChildAge: String,
  maxChildAge: String,
  type: String,
}, { _id: false });

// Define a schema for dining venues
const diningVenueSchema = new Schema({
  coffeShopOrCafe: {
    type: String,
    enum: ["June"],
  },
  isAvailable: Boolean,
  options: [diningOptionSchema],
  galaDinners: [diningFeeSchema],
}, { _id: false });

// Define a schema for spa options
const spaOptionSchema = new Schema({
  name: String,
  isAvailable: Boolean,
}, { _id: false });

// Define a schema for spa amenities
const spaSchema = new Schema({
  isAvailable: Boolean,
  openType: String,
  option: String,
  spaName: String,
  type: String,
  options: [spaOptionSchema],
}, { _id: false });

//define a schema for pet amenities
const surchargeSchema = new Schema({
  MaximumFeePerStay: Boolean,
  duration: String,
  feePerStay: Number,
  feeVary: Boolean,
  isAvailable: String, // or Boolean, depending on your requirement
  petFeeAmount: Number,
  type: String,
}, { _id: false });

const petOptionSchema = new Schema({
  isAvailable: Boolean,
  option: String,
}, { _id: false });

const petCleaningFeeSchema = new Schema({
  isAvailable: Boolean,
  petDepositAmount: Number,
}, { _id: false });

const petDepositSchema = new Schema({
  duration: String,
  isAvailable: Boolean,
  petDepositAmount: Number,
}, { _id: false });

const petRestrictionsSchema = new Schema({
  features: [petOptionSchema],
}, { _id: false });

const petSchema = new Schema({
  isAvailable: Boolean,
  options: [petOptionSchema],
  petCleaningFee: petCleaningFeeSchema,
  petDeposit: petDepositSchema,
  restrictions: petRestrictionsSchema,
  maxPerRoom: String,
  maxWeightLimitPerPet: {
    amount: Number,
    unit: String,
  },
  smallPetOnly: Boolean,
  surcharge: surchargeSchema, 
  typeRestrictions: String,
}, { _id: false });

// Define a schema for accessibility features
const accessibilityOptionSchema = new Schema({
  option: String,
  isAvailable: Boolean,
  registrationDeskHeightCentimeters: Number,
  registrationDeskHeightInches: Number,
  hallwayHandrailHeightCentimeters: Number,
  hallwayHandrailHeightInches: Number,
  noOfOnSiteParkingSpots: String,
}, { _id: false });

const accessibilitySchema = new Schema({
  elevators: {
    isAvailable: Boolean,
    wheelchairAccessiblePathToElevator: Boolean,
  },
  otherPropertyAccessibilityFeatures: [accessibilityOptionSchema],
  propertyEntranceList: [accessibilityOptionSchema],
  wheelchairAccessible: {
    accessibleList: [accessibilityOptionSchema],
  },
  isAvailable: Boolean,
}, { _id: false });

// Define a schema for guest services options
const guestServiceOptionSchema = new Schema({
  option: String,
  isAvailable: Boolean,
  type: String, // Example: "surcharge"
  coinOperatedLaundryOnSite: Boolean,
  sharedMicrowave: Boolean,
  sharedRefrigerator: Boolean,
  shoppingOnSite: Boolean,
}, { _id: false });

const guestServicesSchema = new Schema({
  isAvailable: Boolean,
  options: [guestServiceOptionSchema],
  smokingAreas: Boolean,
  smokingPreferences: String,
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
  frontDesk: frontDeskSchema,
  Internet: [internetOptionSchema],
  parking: parkingSchema,
  breakfast: breakfastSchema,
  poolAccess: poolAccessSchema,
  dining: diningVenueSchema,
  spa: spaSchema,
  pet: petSchema,
  accessibility: accessibilitySchema,
  guestServices: guestServicesSchema,
});

const Amenities = mongoose.model("Amenities", amenitiesSchema);

export default Amenities;
