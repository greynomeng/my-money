import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export const Account = defineMongooseModel({
  name: "Account",
  schema: {
    accno: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    owner: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    opening_balance: {
      type: mongoose.Types.Decimal128,
      required: true
    },
    current_balance: {
      type: mongoose.Types.Decimal128,
      required: true
    }
  },
  options: {
    timestamps: true,
    collection: "accounts"
  }
});
