import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      index: true,
      default: null
    }
  },
  {
    // timestamps: true,
    collection: "categories"
  }
);

export const Category = mongoose.model("Category", CategorySchema);
