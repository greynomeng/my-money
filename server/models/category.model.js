import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";
import { tr } from "zod/locales";

export const Category = defineMongooseModel({
  name: "Category",
  schema: {
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true
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
