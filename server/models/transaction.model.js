import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      require: true
    },
    payeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payee",
      require: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true
    },
    toAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      require: true
    },
    amountCents: {
      type: Number,
      required: true
    },
    memo: {
      type: String
    }
  },
  {
    timestamps: true,
    collation: "transactions"
  }
);

// --- Virtuals for Dollar Representation ---

// A virtual property 'amount' that gets the dollar value from 'amountCents'
TransactionSchema.virtual("amount").get(function () {
  // Return a formatted dollar amount (e.g., "12.34")
  return (this.amountCents / 100).toFixed(2);
});

// A virtual property 'amount' that sets the 'amountCents' value from a dollar input
TransactionSchema.virtual("amount").set(function (dollarValue) {
  // Convert dollar input (can be string or number) to cents integer
  this.amountCents = Math.round(parseFloat(dollarValue) * 100);
});

// Enable virtuals in JSON and object outputs (crucial for API responses in Nuxt)
TransactionSchema.set("toJSON", { virtuals: true });
TransactionSchema.set("toObject", { virtuals: true });

// --- Static Method for Conversion (optional, for explicit use) ---
TransactionSchema.statics.centsToDollars = function (cents) {
  return parseFloat((cents / 100).toFixed(2));
};

// --- Static Method for Conversion (optional, for class-level use) ---
TransactionSchema.statics.dollarsToCents = function (dollars) {
  return Math.round(parseFloat(dollars) * 100);
};

export const Transaction = mongoose.model("Transaction", TransactionSchema);

// export const Transaction = defineMongooseModel({
//   name: "Transaction",
//   schema: {
//     date: {
//       type: Date,
//       required: true
//     },
//     payee_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Payee",
//       require: true
//     },
//     category_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       require: true
//     },
//     to_account_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Account",
//       require: true
//     },
//     amount: {
//       type: Number,
//       required: true
//     },
//     memo: {
//       type: String
//     }
//   },
//   options: {
//     timestamps: true,
//     collection: "transactions"
//   }
// });
