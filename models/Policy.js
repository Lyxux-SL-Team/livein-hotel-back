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
          type: Number,
        },
      },
    ],
  },

  cancellationPolicy: [
    {
      option: {
        type: String,
      },
      cancellationFee: {
        type: Number,
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
          type: Number,
        },
      },
    ],
  },
});

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
