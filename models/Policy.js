import mongoose from "mongoose";

const schema = mongoose.Schema;

const policySchema = new schema({
  admin: {
    type: schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  hotel: {
    type: schema.Types.ObjectId,
    ref: "Hotel",
  },
  property: {
    type: schema.Types.ObjectId,
    ref: "Property",
  },
  languages: [
    {
      type: String,
      required: true,
    },
  ],
  paymentMethods: [
    {
      type: String,
      required: true,
    },
  ],
  paymentDeposit: {
    type: Boolean,
    required: true,
  },
  paymentInstall: {
    type: Boolean,
    required: true,
  },

  deposit: [
    {
      name: {
        type: String,
      },
      availability: {
        type: Boolean,
      },
      amount: {
        type: Number,
      },
    },
  ],

  installPayment: [
    {
      name: {
        type: String,
      },
      availability: {
        type: Boolean,
      },
      percentage: {
        type: Number,
      },
    },
  ],
  cancellationPolicy: [
    {
      name: {
        type: String,
      },
      cancellationFee: {
        type: Number,
      },
    },
  ],

  taxAndFees: [
    {
      name: {
        type: String,
      },
      availability: {
        type: Boolean,
      },
      percentage: {
        type: Number,
      },
    },
  ],
  rentalDiscount: [
    {
      name: {
        type: String,
      },
      availability: {
        type: Boolean,
      },
      percentage: {
        type: Number,
      },
    },
  ],
  regulator:[{
    name:{
        type:String,
    },
    availability:{
        type:Boolean,
    }
  }]
  
});

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
