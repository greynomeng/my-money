import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      defualt: ""
    }
  },
  {
    // timestamps: true,
    collection: "categories"
  }
);

export const Category = mongoose.model("Category", CategorySchema);
