import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export const Transaction = defineMongooseModel({
  name: "Transaction",
  schema: {
    date: {
      type: Date,
      required: true
    },
    payee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payee",
      require: true
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true
    },
    to_account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      require: true
    },
    amount: {
      type: String,
      required: true
    },
    memo: {
      type: String
    }
  },
  options: {
    timestamps: true,
    collection: "transactions"
  }
});
