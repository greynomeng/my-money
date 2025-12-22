import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export const Category = defineMongooseModel({
  name: "Category",
  schema: {
    name: {
      type: String,
      required: true,
      unique: true
    },
    parent: {
      type: mongoose.Types.ObjectId
    }
  },
  options: {
    // timestamps: true,
    collection: "categories"
  }
});
