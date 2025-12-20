import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export const Payee = defineMongooseModel({
  name: "Payee",
  schema: {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  options: {
    timestamps: true,
    collection: "payees"
  }
});
