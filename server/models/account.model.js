import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    accNo: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    owner: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    openingBalanceCents: {
      type: Number,
      required: true
    },
    currentBalanceCents: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "accounts"
  }
);

// --- Virtuals for Dollar Representation ---
AccountSchema.virtual("openingBalance").get(function () {
  // Return a formatted dollar amount (e.g., "12.34")
  return parseFloat((this.openingBalanceCents / 100).toFixed(2));
});

// A virtual property 'amount' that sets the 'amountCents' value from a dollar input
AccountSchema.virtual("openingBalance").set(function (dollarValue) {
  // Convert dollar input (can be string or number) to cents integer
  this.openingBalanceCents = Math.round(parseFloat(dollarValue) * 100);
});

AccountSchema.virtual("currentBalance").get(function () {
  // Return a formatted dollar amount (e.g., "12.34")
  return parseFloat((this.currentBalanceCents / 100).toFixed(2));
});

// A virtual property 'amount' that sets the 'amountCents' value from a dollar input
AccountSchema.virtual("currentBalance").set(function (dollarValue) {
  // Convert dollar input (can be string or number) to cents integer
  this.currentBalanceCents = Math.round(parseFloat(dollarValue) * 100);
});

// Enable virtuals in JSON and object outputs (crucial for API responses in Nuxt)
AccountSchema.set("toJSON", { virtuals: true });
AccountSchema.set("toObject", { virtuals: true });

// --- Static Method for Conversion (optional, for explicit use) ---
AccountSchema.statics.centsToDollars = function (cents) {
  return parseFloat((cents / 100).toFixed(2));
};

// --- Static Method for Conversion (optional, for class-level use) ---
AccountSchema.statics.dollarsToCents = function (dollars) {
  return Math.round(parseFloat(dollars) * 100);
};

export const Account = mongoose.model("Account", AccountSchema);
