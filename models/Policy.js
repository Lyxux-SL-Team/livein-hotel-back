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
    unique:true,
    
  },
  property: {
    type: schema.Types.ObjectId,
    ref: "Property",
    unique:true,
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

  deposit: {
    isDeposit: {
      type: Boolean,
    },
    options: [
      {
        option: {
          type: String,
        },
        isAvailable: {
          type: Boolean,
        },
        amount: {
          type: Number,
        },
      },
    ],
  },

  installPayment: {
    isInstallPayment: {
      type: Boolean,
    },
    options: [
      {
        option: {
          type: String,
        },
        isAvailable: {
          type: Boolean,
        },
        percentage: {
          type: String,
        },
      },
    ],
  },

  cancellationPolicy: [
    {
      policy: {
        type: String,
      },
      option: {
        type: String,
      },
    },
  ],

  rental: {
    options: [
      {
        option: {
          type: String,
        },
        isAvailable: {
          type: Boolean,
        },
        percentage: {
          type: String,
        },
      },
    ],
  },
});

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
